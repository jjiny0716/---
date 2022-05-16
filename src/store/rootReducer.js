import { combineReducers } from "../core/combineReducers.js";

import { transactionReducer } from "./transaction/transaction.reducer.js";

export const rootReducer = combineReducers({
  transaction: transactionReducer,
});
