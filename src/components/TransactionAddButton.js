import Component from '../core/Component.js';

export default class TransactionAddButton extends Component {
  template() {
    return `<i class="fa-solid fa-plus"></i>`;
  }

  setEvents() {
    this.addEventListener("click", ".transaction-add-button", (e) => {
      const { openTransactionAddModal } = this.props;
      openTransactionAddModal();
    });
  }
}