import Router from "../core/Router.js";

export const router = new Router("/", {
  "/": "TransactionList",
  "transactionList": "TransactionList",
  "calendar": "Calendar",
});