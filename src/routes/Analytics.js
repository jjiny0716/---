import Component from "../core/Component.js";

import DateRangeSelector from "../components/DateRangeSelector.js";
import DonutChart from "../components/DonutChart.js";
import DonutChartLegend from "../components/DonutChartLegend.js";
import CategoryTransactionModal from '../components/CategoryTransactionModal.js';

import { selectTotalAmountByCategoryMap } from "../store/transaction/transaction.selector.js";

export default class Analytics extends Component {
  setup() {
    const today = new Date();

    this.state = {
      startDate: today.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      totalAmountByCategoryMap: {},
      isCategoryTransactionModalOpen: false,
      selectedCategory: undefined,
    };
  }

  template() {
    const { isCategoryTransactionModalOpen } = this.state;

    return `
    <form class="DateRangeSelector" data-component="DateRangeSelector"></form>
    <div class="DonutChart" data-component="DonutChart"></div>
    <div class="DonutChartLegend" data-component="DonutChartLegend"></div>
    ${isCategoryTransactionModalOpen ? `<div data-component="CategoryTransactionModal"></div>`: ""}
    `;
  }

  generateChildComponent(target, name) {
    switch (name) {
      case "DateRangeSelector":
        return new DateRangeSelector(target, () => {
          const { setDateAndAdditionalData } = this;
          const { startDate, endDate } = this.state;
          return {
            dateChangeListener: setDateAndAdditionalData.bind(this),
            startDate,
            endDate,
          };
        });
      case "DonutChart":
        return new DonutChart(target, () => {
          const { totalAmountByCategoryMap } = this.state;
          return {
            listData: Object.values(totalAmountByCategoryMap),
          };
        });
      case "DonutChartLegend":
        return new DonutChartLegend(target, () => {
          const { openCategoryTransactionModal } = this;
          const { totalAmountByCategoryMap } = this.state;
          return {
            clickListener: openCategoryTransactionModal.bind(this),
            labelValueMap: totalAmountByCategoryMap,
          };
        });
      case "CategoryTransactionModal":
        return new CategoryTransactionModal(target, () => {
          const { closeCategoryTransactionModal } = this;
          const { startDate, endDate, selectedCategory } = this.state;
          return {
            closeModal: closeCategoryTransactionModal.bind(this),
            startDate,
            endDate,
            category: selectedCategory,
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

  openCategoryTransactionModal([category]) {
    this.setState({
      isCategoryTransactionModalOpen: true,
      selectedCategory: category,
    })
  }

  closeCategoryTransactionModal() {
    this.setState({
      isCategoryTransactionModalOpen: false,
    })
  }
}
