import { TRANSACTION_KEYWORD_ACTION_TYPES } from "./transactionKeyword.types.js";

const TRANSACTION_KEYWORD_INITIAL_STATE = {
  incomeTransactionKeywordList: ["월급", "용돈", "부수입", "금융소득"],
  expenditureTransactionKeywordList: ["식비", "교통/차량", "문화생활", "패션/미용", "생활용품", "교육", "경조사/회비"],
};

export function transactionKeywordReducer(state = TRANSACTION_KEYWORD_INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case TRANSACTION_KEYWORD_ACTION_TYPES.SET_INCOME_TRANSACTION_KEYWORD_LIST:
      return { ...state, incomeTransactionKeywordList: payload };
    case TRANSACTION_KEYWORD_ACTION_TYPES.SET_EXPENDITURE_TRANSACTION_KEYWORD_LIST:
      return { ...state, expenditureTransactionKeywordList: payload };
    default: 
      return state;
  }
}