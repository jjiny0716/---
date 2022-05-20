import { store } from "../store.js";

export function selectTotalAmountByCategoryMap(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const { transactionData } = store.getState().transaction;

  const totalAmountByCategoryMap = {};
  for (let date = endDate; date >= startDate; date.setDate(date.getDate() - 1)) {
    const [month, day, year] = date.toLocaleDateString("en-US").split("/");
    if (transactionData[year]?.[month]?.[day]) {
      for (let { type, category, amount } of transactionData[year]?.[month]?.[day]) {
        if (type === "income" || !amount) continue;
        if (!category) category = "기타";

        totalAmountByCategoryMap[category] = (totalAmountByCategoryMap[category] || 0) + amount;
      }
    }
  }

  return totalAmountByCategoryMap;
}
