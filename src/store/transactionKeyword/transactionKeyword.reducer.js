import { TRANSACTION_KEYWORD_ACTION_TYPES } from "./transactionKeyword.types.js";

const TRANSACTION_KEYWORD_INITIAL_STATE = {
  transactionKeywordList: ["식비", "교통/차량", "문화생활", "패션/미용", "생활용품", "교육", "경조사/회비"],
};

export function transactionKeywordReducer(state = TRANSACTION_KEYWORD_INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case TRANSACTION_KEYWORD_ACTION_TYPES.SET_TRANSACTION_KEYWORD_LIST:
      return { ...state, transactionKeywordList: payload };
    default: 
      return state;
  }
}