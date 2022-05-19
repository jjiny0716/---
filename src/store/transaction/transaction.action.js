import { TRANSACTION_ACTION_TYPES } from "./transaction.types.js";
import { createAction } from "../../core/utils/createAction.js";

export function addTransaction(transaction) {
  return createAction(TRANSACTION_ACTION_TYPES.SET_TRANSACTION_DATA, addTransactionHelper(transaction));
}

function addTransactionHelper({ transactionData, year, month, date, type, category, amount, title }) {
  // leading zero 제거
  month = parseInt(month, 10).toString();
  date = parseInt(date, 10).toString();
  amount = parseInt(amount, 10).toString();

  if (!transactionData[year]) transactionData[year] = {};
  if (!transactionData[year][month]) transactionData[year][month] = {};
  if (!transactionData[year][month][date]) transactionData[year][month][date] = [];

  transactionData[year][month][date].push({ type, category, amount: Number(amount), title });

  return { ...transactionData };
}
