/**
 * Design inspired by Adjustable Pie Chart by Eric Sadowski
 * https://codepen.io/ejsado/pen/yLNMPG
 */
import Component from "../core/Component.js";

export default class DonutChart extends Component {
  template() {
    return `
    <div class="pie">${this.createPie()}</div>
    `;
  }

  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  addSlice(sliceSize, offset, color, resultSlices) {
    offset -= 1;
    const sizeRotation = -179 + sliceSize;
    
    const sliceHTMLString = `
    <div class="slice" style="transform: rotate(${offset}deg)">
      <span style="transform: rotate(${sizeRotation}deg); background-color: ${color}"></span>
    </div>
    `

    resultSlices.push(sliceHTMLString);
  }

  iterateSlices(sliceSize, offset, dataCount, sliceCount, color, resultSlices) {
    const maxSize = 179;
    if (sliceSize <= maxSize) {
      this.addSlice(sliceSize, offset, color, resultSlices);
    } else {
      this.addSlice(maxSize, offset, color, resultSlices);
      this.iterateSlices(sliceSize - maxSize, offset + maxSize, dataCount, sliceCount + 1, color, resultSlices);
    }
  }

  createPie() {
    const { listData } = this.props; 
    if (listData.some((data) => typeof data !== "number" || isNaN(data))) {
      throw new Error("'DonutChart' 컴포넌트는의 listData는 number형 원소만을 갖는 배열이어야 합니다");
    }

    const listTotal = listData.reduce((total, data) => total += data, 0);
    let offset = 0;
    const color = ["cornflowerblue", "olivedrab", "orange", "tomato", "crimson", "purple", "turquoise", "forestgreen", "navy", "gray"];

    const resultSlices = [];
    for (let i = 0; i < listData.length; i++) {
      const size = this.sliceSize(listData[i], listTotal);

      this.iterateSlices(size, offset, i, 0, color[i], resultSlices);

      offset += size;
    }

    return resultSlices.join('');
  }
}
