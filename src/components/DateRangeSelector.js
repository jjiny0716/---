import Component from '../core/Component.js';

export default class DateRangeSelector extends Component {
  template() {
    const { startDate, endDate } = this.props;

    return `
    <input type="date" class="date" name="date" id="date" value="${startDate}" data-type="startDate"/>
    <span>~</span>
    <input type="date" class="date" name="date" id="date" value="${endDate}" data-type="endDate"/>
    `;
  }

  setEvents() {
    const { dateChangeListener } = this.props;
    
    this.addEventListener("input", ".date", (e) => {
      const { value } = e.target;
      const { type } = e.target.dataset;
      if (dateChangeListener) dateChangeListener(type, value);
    })
  }

  afterMount() {
    this.initInputValue();
  }

  initInputValue() {
    const { startDate, endDate } = this.props;
    this.target.querySelector('[data-type="startDate"]').value = startDate;
    this.target.querySelector('[data-type="endDate"]').value = endDate;
  }
}