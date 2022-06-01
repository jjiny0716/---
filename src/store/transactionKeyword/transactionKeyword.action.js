import { TRANSACTION_KEYWORD_ACTION_TYPES } from "./transactionKeyword.types.js";
import { createAction } from "../../core/utils/createAction.js";

export function setIncomeTransactionKeywordList(keywordList) {
  return createAction(TRANSACTION_KEYWORD_ACTION_TYPES.SET_INCOME_TRANSACTION_KEYWORD_LIST, keywordList);
}

export function setExpenditureTransactionKeywordList(keywordList) {
  return createAction(TRANSACTION_KEYWORD_ACTION_TYPES.SET_EXPENDITURE_TRANSACTION_KEYWORD_LIST, keywordList);
}
