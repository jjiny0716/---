import Component from '../core/Component.js';

import DateRangeSelector from '../components/DateRangeSelector.js';
import DonutChart from "../components/DonutChart.js";

import { selectTotalAmountByCategoryMap } from '../store/transaction/transaction.selector.js';

export default class Analytics extends Component {
  setup() {
    const today = new Date();

    this.state = {
      startDate: today.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      totalAmountByCategoryMap: {},
    }
  }

  template() {
    return `
    <form class="DateRangeSelector" data-component="DateRangeSelector"></form>
    <div class="DonutChart" data-component="DonutChart"></div>
    `;
  }

  generateChildComponent(target, name) {
    switch(name) {
      case "DateRangeSelector":
        return new DateRangeSelector(target, () => {
          const { setDateAndAdditionalData } = this;
          const { startDate, endDate } = this.state;
          return {
            dateChangeListener: setDateAndAdditionalData.bind(this),
            startDate,
            endDate,
          }
        });
      case "DonutChart":
        return new DonutChart(target, () => {
          const { totalAmountByCategoryMap } = this.state;
          return {
            listData: Object.values(totalAmountByCategoryMap),
          }
        });
    }
  }

  setDateAndAdditionalData(type, value) {
    const state = { ...this.state };
    state[type] = value;
    const { startDate, endDate } = state;

    this.setState({
      [type]: value,
      totalAmountByCategoryMap: selectTotalAmountByCategoryMap(startDate, endDate),
    });
  }
}