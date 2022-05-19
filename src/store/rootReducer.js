import { combineReducers } from "../core/combineReducers.js";

import { transactionReducer } from "./transaction/transaction.reducer.js";
import { transactionKeywordReducer } from './transactionKeyword/transactionKeyword.reducer.js';

export const rootReducer = combineReducers({
  transaction: transactionReducer,
  transactionKeyword: transactionKeywordReducer,
});
