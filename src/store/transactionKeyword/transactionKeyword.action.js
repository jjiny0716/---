import { TRANSACTION_KEYWORD_ACTION_TYPES } from "./transactionKeyword.types.js";
import { createAction } from "../../core/utils/createAction.js";

export function setTransactionKeywordList(keywordList) {
  return createAction(TRANSACTION_KEYWORD_ACTION_TYPES.SET_TRANSACTION_KEYWORD_LIST, keywordList);
}
