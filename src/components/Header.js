import Component from "../core/Component.js";

import RouterLink from "../routes/RouterLink.js";

import { router } from "../routes/router.js";

export default class Header extends Component {
  template() {
    const route = router.route;

    return `
    <a href="transactionList" data-component="RouterLink" data-key="TransactionList" ${route === "TransactionList" ? `class="active"` : ""}>
      <i class="fa-solid fa-list"></i>입출금 리스트
    </a>
    <a href="calendar" data-component="RouterLink" data-key="Calendar" ${route === "Calendar" ? `class="active"` : ""}>
      <i class="fa-solid fa-calendar"></i>
      달력
    </a>
    `;
  }

  generateChildComponent(target, name) {
    switch (name) {
      case "RouterLink":
        return new RouterLink(target);
    }
  }
}
