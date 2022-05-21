import Component from '../core/Component.js';

import DonutChartLegendBlock from './DonutChartLegendBlock.js';

import { donutChartColor } from '../constants/donutChartColor.js';

export default class DonutChartLegend extends Component {
  template() {
    const { labelValueMap } = this.props;
    if (!labelValueMap) return ``;

    return `
    ${Object.keys(labelValueMap).map((_, i) => `<div class="DonutChartLegendBlock" data-component="DonutChartLegendBlock" data-key=${i}></div>`).join('')}
    `;
  }

  generateChildComponent(target, name, key) {
    const { labelValueMap } = this.props;
    const entry = Object.entries(labelValueMap).sort((a, b) => b[1] - a[1]);
    const total = entry.reduce((total, [label, value]) => total += value, 0);
    
    switch(name) {
      case "DonutChartLegendBlock":
        return new DonutChartLegendBlock(target, () => {
          const [label, value] = entry[key];
          return {
            label,
            percentage: (value / total * 100).toFixed(2),
            amount: value,
            color: donutChartColor[key],
          }
        })
    }
  }
}