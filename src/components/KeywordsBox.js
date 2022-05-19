import Component from "../core/Component.js";

export default class KeywordBox extends Component {
  setup() {
    const { keywordList } = this.props;
    
    this.state = {
      keywordList,
      selectedIndex: -1,
    };
  }

  template() {
    const { keywordList, selectedIndex } = this.state;

    return `
    ${keywordList.map((keyword, i) => `<div class="round-box ${i === selectedIndex ? "active" : ""}">${keyword}</div>`).join('')}
    `;
  }

  setEvents() {
    const { keywordSelectListener } = this.props || {};
    const { keywordList } = this.state;

    this.addEventListener("click", ".round-box", (e) => {
      const { textContent: selectedKeyword } = e.target;

      this.setState({ selectedIndex: keywordList.findIndex((keyword) => keyword === selectedKeyword) });

      if (keywordSelectListener) keywordSelectListener(selectedKeyword);
    });
  }
}
