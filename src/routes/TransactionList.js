import Component from '../core/Component.js';

import { store } from '../store/store.js';

export default class TransactionList extends Component {
  template() {
    const { transactionData } = store.getState().transaction;

    return `
    <form>
      <label for="date">시작 날짜</label>
      <input type="date" class="date" name="date" id="date" required />
      <label for="date">끝 날짜</label>
      <input type="date" class="date" name="date" id="date" required />
    </form>
    `;
  }

  afterMount() {

  }
}