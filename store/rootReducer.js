import { combineReducers } from "../src/core/combineReducers.js";

import { transactionReducer } from "./transaction/transaction.reducer.js";

export const rootReducer = combineReducers({
  transaction: transactionReducer,
});
