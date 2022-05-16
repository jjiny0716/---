import { TRANSACTION_ACTION_TYPES } from "./transaction.types.js";

const TRANSACTION_INITIAL_STATE = {
  transactionData: {},
};

export function transactionReducer(state = TRANSACTION_INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case TRANSACTION_ACTION_TYPES.SET_TRANSACTION_DATA:
      return { ...state, transactionData: payload };
    default: 
      return state;
  }
}