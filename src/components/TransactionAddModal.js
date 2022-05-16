import Component from "../core/Component.js";

import { store } from "../store/store.js";
import { addTransaction } from "../store/transaction/transaction.action.js";

export default class TransactionAddModal extends Component {
  setup() {
    this.state = {
      shaking: false,
      type: "expenditure",
      date: "",
      amount: "",
      title: "",
    };
  }

  template() {
    const { shaking, type } = this.state;

    return `
    <div class="modal-overlay">
      <div class="modal-content transaction-add-modal ${shaking ? "shaking" : ""}">
        <div class="type-buttons">
          <button class="income ${type === "income" ? "active" : ""}">수입</button>
          <button class="expenditure ${type === "expenditure" ? "active" : ""}">지출</button>
        </div>
        <form class="transaction-form">
          <div class="form-input">
            <label for="date">날짜</label>
            <input type="date" class="date" name="date" id="date" required />
          </div>
          <div class="form-input">
            <label for="amount">금액</label>
            <input type="text" class="amount" name="amount" id="amount" maxlength="12" autocomplete="off" required />
          </div>
          <div class="form-input">
            <label for="title">내용</label>
            <input type="text" class="title" name="title" id="title" maxlength="15" required />
          </div>
          <button type="submit" class="save-button">저장하기</button>
        </form>
        <button class="close-modal-button"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    `;
  }

  setEvents() {
    const { closeTransactionAddModal } = this.props;
    // 오버레이 클릭시 흔들림
    this.addEventListener("click", ".modal-overlay", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        this.shaking();
      }
    });

    // x 버튼 클릭시 종료
    this.addEventListener("click", ".close-modal-button", (e) => {
      const target = e.target.closest(".close-modal-button");
      if (target.classList.contains("close-modal-button")) {
        closeTransactionAddModal();
      }
    });

    // type 변경 업데이트
    this.addEventListener("click", ".type-buttons", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      const type = target.classList[0];

      this.setState({ type });
    });

    // form input value 변경 업데이트
    this.addEventListener("input", ".transaction-form", ({ target }) => {
      const { name, value } = target;

      this.setState({ [name]: value });
    });

    // 저장하기
    this.addEventListener("submit", ".transaction-form", (e) => {
      e.preventDefault();
      const { type, date: fulldate, amount, title } = this.state;
      const [year, month, date] = fulldate.split("-");
      const { transactionData } = store.getState().transaction;

      store.dispatch(
        addTransaction({
          transactionData,
          year,
          month,
          date,
          type,
          amount,
          title,
        })
      );

      closeTransactionAddModal();
    });
  }

  shaking() {
    this.setState({ shaking: true });
    setTimeout(() => {
      this.setState({ shaking: false });
    }, 500);
  }
}
