import Component from '../core/Component.js';

import TransactionListOfDay from '../components/TransactionListOfDay.js';
import DateRangeSelector from '../components/DateRangeSelector.js';

import { ONE_DAY_VALUE } from '../constants/dateValue.js';

import { store } from '../store/store.js';

export default class TransactionList extends Component {
  setup() {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - (ONE_DAY_VALUE * 7));

    this.state = {
      startDate: lastWeek.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    }

    this.state.dateList = this.getDateList();
  }

  template() {
    const dateList = this.getDateList();

    return `
    <form class="DateRangeSelector" data-component="DateRangeSelector"></form>
    ${dateList.map((date) => `<div class="TransactionListOfDay" data-component="TransactionListOfDay" data-key=${date}></div>`).join('')}
    `;
  }

  generateChildComponent(target, name, key) {
    switch(name) {
      case "DateRangeSelector":
        return new DateRangeSelector(target, () => {
          const { setDate } = this;
          const { startDate, endDate } = this.state;
          return {
            dateChangeListener: setDate.bind(this),
            startDate,
            endDate,
          }
        });
      case "TransactionListOfDay":
        return new TransactionListOfDay(target, () => {
          const [year, month, date] = key.split('-');
          return {
            year,
            month,
            date,
          }
        })
    }
  }

  setDate(type, value) {
    this.setState({ [type]: value });
  }

  getDateList() {
    const { startDate: startDateStr, endDate: endDateStr } = this.state;
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const { transactionData } = store.getState().transaction;

    const dateList = [];
    for (let date = endDate ; date >= startDate ; date.setDate(date.getDate() - 1)) {
      const [month, day, year] = date.toLocaleDateString('en-US').split('/');
      if (transactionData[year]?.[month]?.[day]) dateList.push(`${year}-${month}-${day}`);
    } 

    return dateList;
  }
}