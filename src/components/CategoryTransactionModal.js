import Component from "../core/Component.js";

import TransactionBox from './TransactionBox.js';

import { selectTransactionList } from '../store/transaction/transaction.selector.js';

export default class CategoryTransactionModal extends Component {
  setup() {
    const { startDate, endDate, category } = this.props;

    this.state = {
      transactionList: selectTransactionList(startDate, endDate, category),
    };
  }

  template() {
    const { shaking, transactionList } = this.state;

    return `
    <div class="modal-overlay">
      <div class="modal-content transaction-add-modal ${shaking ? "shaking" : ""}">
        ${transactionList.map((_, i) => `<div class="TransactionBox" data-component="TransactionBox" data-key=${i}></div>`).join('')}
        <button class="close-modal-button"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    `;
  }

  generateChildComponent(target, name, key) {
    switch(name) {
      case "TransactionBox":
        return new TransactionBox(target, () => {
          const { transactionList } = this.state;
          return {
            transaction: transactionList[key],
          }
        })
    }
  }

  setEvents() {
    const { closeModal } = this.props;

    this.addEventListener("click", ".modal-overlay", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        closeModal();
      }
    });

    this.addEventListener("click", ".close-modal-button", (e) => {
      const target = e.target.closest(".close-modal-button");
      if (target.classList.contains("close-modal-button")) {
        closeModal();
      }
    });
  }
}
