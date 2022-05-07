import Component from "./core/Component.js";

import Calendar from './components/Calendar.js';

export default class App extends Component {
  setup() {
    
  }

  template() {
    return `
    <div class="calendar" data-component="Calendar"></div>
    `;
  }

  generateChildComponent(target, name) {
    switch(name) {
      case "Calendar":
        return new Calendar(target);
    }
  }

  afterMount() {

  }
}