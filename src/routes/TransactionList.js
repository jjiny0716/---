import Component from '../core/Component.js';

import TransactionListOfDay from '../components/TransactionListOfDay.js';

import { store } from '../store/store.js';

export default class TransactionList extends Component {
  setup() {
    const today = new Date();

    this.state = {
      startDate: today.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    }

    this.state.dateList = this.getDateList();
  }

  template() {
    const { startDate, endDate } = this.state;
    const dateList = this.getDateList();

    return `
    <form>
      <input type="date" class="date" name="date" id="date" value="${startDate}" data-type="startDate"/>
      <span>~</span>
      <input type="date" class="date" name="date" id="date" value="${endDate}" data-type="endDate"/>
    </form>
    ${dateList.map((date) => `<div class="TransactionListOfDay" data-component="TransactionListOfDay" data-key=${date}></div>`).join('')}
    `;
  }

  generateChildComponent(target, name, key) {
    switch(name) {
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

  setEvents() {
    this.addEventListener('input', '.date', (e) => {
      const { value: dateValue } = e.target;
      const { type } = e.target.dataset;
      this.setState({ [type]: dateValue });
    });
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