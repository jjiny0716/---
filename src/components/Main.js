import Component from '../core/Component.js';

import TransactionList from "../routes/TransactionList.js";
import Calendar from "../routes/Calendar.js";

import { router } from '../routes/router.js';

export default class Main extends Component {
  template() {
    const route = router.route;

    return `
    <div class=${route} data-component=${route}></div>
    `;
  }

  generateChildComponent(target, name) {
    switch(name) {
      case "TransactionList":
        return new TransactionList(target);
      case "Calendar":
        return new Calendar(target);
    }
  }
}