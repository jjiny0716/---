import Component from "../core/Component.js";

import { KEYWORD_BOX_MODE } from '../constants/keywordBox.js';

export default class KeywordBox extends Component {
  setup() {
    const { keywordList } = this.props;
    
    this.state = {
      keywordList,
      selectedIndex: -1,
      mode: KEYWORD_BOX_MODE.SELECT,
    };
  }

  template() {
    const { keywordList, selectedIndex, mode } = this.state;
    
    return `
    ${keywordList.map((keyword, i) => `<div class="round-box ${i === selectedIndex ? "active" : ""}" data-keyword=${keyword}>
      ${keyword}
      ${mode === KEYWORD_BOX_MODE.DELETE ? `<i class="delete-icon fa-solid fa-minus"></i>` : ""}
    </div>`).join('')}
    ${mode === KEYWORD_BOX_MODE.ADD ? `
    <form class="keyword-input-form">
      <input class="keyword-input" type="text" maxlength="6" autocomplete="off" />
    </form>` : ""}
    <button class="edit-button add ${mode === KEYWORD_BOX_MODE.ADD ? 'active' : ''}">
      <i class="fa-solid fa-plus"></i>
    </button>
    <button class="edit-button delete ${mode === KEYWORD_BOX_MODE.DELETE ? 'active' : ''}">
      <i class="fa-solid fa-minus"></i>
    </button>
    `;
  }

  setEvents() {
    // preventDefault
    this.addEventListener("submit", ".keyword-input-form", (e) => {
      e.preventDefault();
    })

    // keyword 선택 (제거모드시 제거)
    this.addEventListener("click", ".round-box", (e) => {
      const target = e.target.closest(".round-box");
      const { mode } = this.state;
      const { keyword: selectedKeyword } = target.dataset;

      switch(mode) {
        case KEYWORD_BOX_MODE.SELECT:
          this.selectKeyword(selectedKeyword);
        case KEYWORD_BOX_MODE.DELETE:
          this.deleteKeyword(selectedKeyword);
      }
    });

    // mode 변경
    this.addEventListener("click", ".edit-button", (e) => {
      e.preventDefault();
      const target = e.target.closest(".edit-button");
      
      if (target.classList.contains("add")) {
        const { mode } = this.state;
        this.setState({ 
          mode: mode === KEYWORD_BOX_MODE.SELECT ? KEYWORD_BOX_MODE.ADD : KEYWORD_BOX_MODE.SELECT,
        })
      }
      else if (target.classList.contains("delete")) {
        const { mode } = this.state;
        this.setState({ 
          mode: mode === KEYWORD_BOX_MODE.SELECT ? KEYWORD_BOX_MODE.DELETE : KEYWORD_BOX_MODE.SELECT,
        })
      }
    });

    // keyword 추가
    this.addEventListener("focusout", ".keyword-input", (e) => {
      this.addKeyword(e.target.value);
    });

    this.addEventListener("keydown", ".keyword-input", (e) => {
      if (e.key !== "Enter") return;

      this.addKeyword(e.target.value);
    });
  }

  afterUpdate() {
    const { mode } = this.state;

    if (mode === KEYWORD_BOX_MODE.ADD) {
      this.target.querySelector(".keyword-input").focus();
    }
  }

  selectKeyword(selectedKeyword) {
    const { keywordSelectListener } = this.props || {};
    const { keywordList } = this.state;

    this.setState({ selectedIndex: keywordList.findIndex((keyword) => keyword === selectedKeyword) });

    if (keywordSelectListener) keywordSelectListener(selectedKeyword);
  }

  addKeyword(newKeyword) {
    if (this.state.mode !== KEYWORD_BOX_MODE.ADD) return;
    this.setState({ mode: KEYWORD_BOX_MODE.SELECT });

    const { keywordList, keywordListChangeListener } = this.props;
    if (!newKeyword || keywordList.find((keyword) => keyword === newKeyword) !== undefined) return;
    const newKeywordList = [...keywordList, newKeyword];
    if (keywordListChangeListener) keywordListChangeListener(newKeywordList);

    this.setState({ keywordList: newKeywordList });
  }

  deleteKeyword(keywordToDelete) {
    if (this.state.mode !== KEYWORD_BOX_MODE.DELETE) return;
    const { keywordList, keywordListChangeListener } = this.props;

    const keywordIndex = keywordList.findIndex((keyword) => keyword === keywordToDelete);
    if (keywordIndex === -1) return;
    const newKeywordList = [...keywordList];
    newKeywordList.splice(keywordIndex, 1);

    if (keywordListChangeListener) keywordListChangeListener(newKeywordList);
    this.setState({ keywordList: newKeywordList });
  }
}
