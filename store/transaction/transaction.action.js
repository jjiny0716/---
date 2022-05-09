import { TRANSACTION_ACTION_TYPES } from "./transaction.types.js";
import { createAction } from "../../src/core/utils/createAction.js";

export function addTransaction({ transactionData, year, month, date, type, amount, title }) {
  return createAction(TRANSACTION_ACTION_TYPES.SET_TRANSACTION_DATA, addTransactionHelper({ transactionData, year, month, date, type, amount, title }));
}

function addTransactionHelper({ transactionData, year, month, date, type, amount, title }) {
  // leading zero 제거
  month = parseInt(month, 10).toString();
  date = parseInt(date, 10).toString();
  amount = parseInt(amount, 10).toString();

  if (!transactionData[year]) transactionData[year] = {};
  if (!transactionData[year][month]) transactionData[year][month] = {};
  if (!transactionData[year][month][date]) transactionData[year][month][date] = [];

  transactionData[year][month][date].push({ type, amount: Number(amount), title });

  return { ...transactionData };
}
