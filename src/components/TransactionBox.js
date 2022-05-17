import Component from '../core/Component.js';

export default class TransactionBox extends Component {
  template() {
    const { transaction } = this.props;
    const { type, amount, title } = transaction;

    return `
    <span class="title">${title}</span>
    <span class="amount ${type === "income" ? "income" : "expenditure"}"> 
      ${type === "income" ? "" : "-"}${amount}
    </span>
    `;
  }
}