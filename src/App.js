import Component from "./core/Component.js";

import Header from "./components/Header.js";
import Main from "./components/Main.js";
import TransactionAddButton from "./components/TransactionAddButton.js";
import TransactionAddModal from "./components/TransactionAddModal.js";

export default class App extends Component {
  setup() {
    this.state = {
      isTransactionAddModalOpen: false,
    };
  }

  template() {
    const { isTransactionAddModalOpen } = this.state;

    return `
    <div class="wrap">
      <header class="Header" data-component="Header"></header>
      <main class="Main" data-component="Main"></main>
      <button class="transaction-add-button" data-component="TransactionAddButton"></button>
      ${isTransactionAddModalOpen ? `<div data-component="TransactionAddModal"></div>` : ""}
    </div>
    `;
  }

  generateChildComponent(target, name) {
    switch (name) {
      case "Header":
        return new Header(target);
      case "Main":
        return new Main(target);
      case "TransactionAddButton":
        return new TransactionAddButton(target, () => {
          const { openTransactionAddModal } = this;
          return {
            openTransactionAddModal: openTransactionAddModal.bind(this),
          };
        });
      case "TransactionAddModal":
        return new TransactionAddModal(target, () => {
          const { closeTransactionAddModal } = this;
          return {
            closeTransactionAddModal: closeTransactionAddModal.bind(this),
          };
        });
    }
  }

  openTransactionAddModal() {
    this.setState({ isTransactionAddModalOpen: true });
  }

  closeTransactionAddModal() {
    this.setState({ isTransactionAddModalOpen: false });
  }
}
