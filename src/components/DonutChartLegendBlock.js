import Component from '../core/Component.js';

export default class DonutChartLegendBlock extends Component {
  template() {
    const { label, percentage, amount, color } = this.props;

    return `
    <div class="label">${label}</div>
    <div class="percentage">${percentage}%</div>
    <div class="progress-bar-background">
      <div class="progress-bar" style="background-color: ${color}"></div>
    </div>
    <div class="amount">${amount.toLocaleString()}</div>
    `;
  }

  afterMount() {
    this.setProgressBarWidth();
  }

  afterUpdate() {
    this.setProgressBarWidth();
  }

  setProgressBarWidth() {
    const { percentage } = this.props;
    const progressBar = this.target.querySelector(".progress-bar");
    progressBar.style.width = `${percentage < 3 ? 3 : percentage}%`;
  }
}
