import Component from '../core/Component.js';

export default class TransactionBox extends Component {
  template() {
    const { transaction, deleteButtonClickListener } = this.props;
    const { type, amount, title } = transaction;

    return `
    <span class="title">${title}</span>
    <span class="amount ${type === "income" ? "income" : "expenditure"}"> 
      ${type === "income" ? "+" : "-"}${amount}
    </span>
    ${deleteButtonClickListener ? `<button class="delete-transaction-button"><i class="fa-solid fa-xmark"></i></button>` : ""}
    `;
  }

  setEvents() {
    this.addEventListener("click", ".delete-transaction-button", () => {
      const { deleteButtonClickListener, transactionIndex } = this.props;
      if (deleteButtonClickListener) deleteButtonClickListener(transactionIndex);
    })
  }
}