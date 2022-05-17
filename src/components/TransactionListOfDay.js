import Component from '../core/Component.js';

import TransactionBox from './TransactionBox.js';

import { store } from '../store/store.js';

export default class TransactionListOfDay extends Component {
  template() {
    const { year, month, date } = this.props;
    const { transactionData } = store.getState().transaction;
    const transactionListOfDay = transactionData[year][month][date];

    return `
    <p class="date">${year}년 ${month}월 ${date}일</p>
    ${transactionListOfDay.map((_, i) => `<div class="TransactionBox" data-component="TransactionBox" data-key=${i}></div>`).join('')}
    `;
  }

  generateChildComponent(target, name, key) {    
    switch(name) {
      case "TransactionBox":
        return new TransactionBox(target, () => {
          const { year, month, date } = this.props;
          const { transactionData } = store.getState().transaction;
          const transaction = transactionData[year][month][date][key];
          return {
            transaction,
          }
        });
    }
  }
}