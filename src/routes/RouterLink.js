import Component from '../core/Component.js';

import { router } from './router.js';

export default class RouterLink extends Component {
  template() {
    return this.target.innerHTML;
  }

  setEvents() {
    this.addEventListener("click", "a", (e) => {
      e.preventDefault();
      router.push(this.target.getAttribute("href"));
    })
  }
}