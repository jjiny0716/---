import Component from "../core/Component.js";

import { store } from '../store/store.js';

export default class Calendar extends Component {
  setup() {
    this.state = {
      year: -1,
      month: -1,
      dateList: [],
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    this.setDateInfo(currentYear, currentMonth);
  }

  template() {
    const { year, month, dateList } = this.state;

    return `
    <div class="header">
      <div class="month-controls">
        <button class="prev"><i class="fa-solid fa-chevron-left"></i></button>
        <span class="current-date">  
          ${year}년 ${month}월
        </span>
        <button class="next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="month-labels">
        ${MONTH_LIST_SHORT_KOREAN.map((month, i) => `<div class=${i === 0 ? "holyday" : ""}>${month}</div>`).join("")}
      </div>
    </div>
    <div class="date-grid">
      ${dateList
        .map(
          ({ isCurrentMonth, date }, i) => `<div class="date-cell ${isCurrentMonth ? "" : "blur"}">
        <span class="date-label ${i % 7 === 0 ? "holyday" : ""}">${date}</span>
        <div class="amount-labels">${this.createTransactionLabelsOfDate(isCurrentMonth, date)}</div>
        ${this.createDot(isCurrentMonth, date)}
      </div>`
        )
        .join("")}
    </div>
    `;
  }

  setEvents() {
    this.addEventListener("click", "button", (e) => {
      const target = e.target.closest("button");
      if (target.classList.contains("prev")) this.prevMonth();
      else if (target.classList.contains("next")) this.nextMonth();
    });
  }

  setDateInfo(year, month) {
    const prevMonthLastDay = new Date(year, month - 1, 0);
    const prevLastDate = prevMonthLastDay.getDate();
    const prevLastDay = prevMonthLastDay.getDay();

    const currentMonthLastDay = new Date(year, month, 0);
    const currentLastDate = currentMonthLastDay.getDate();

    // 달력에 표시할 date 생성(42개)
    const dateList = [];
    if (prevLastDay !== 6) {
      for (let i = prevLastDate - prevLastDay; i <= prevLastDate; i++) {
        dateList.push({
          isCurrentMonth: false,
          date: i,
        });
      }
    }

    for (let i = 1; i <= currentLastDate; i++) {
      dateList.push({
        isCurrentMonth: true,
        date: i,
      });
    }

    const remainDayCount = 42 - dateList.length;
    for (let i = 1; i <= remainDayCount; i++) {
      dateList.push({
        isCurrentMonth: false,
        date: i,
      });
    }

    this.setState({
      year,
      month: month,
      dateList,
    });
  }

  createTransactionLabelsOfDate(isCurrentMonth, date) {
    const { year, month } = this.state;
    const { transactionData } = store.getState().transaction;

    if (!isCurrentMonth || !transactionData[year] || !transactionData[year][month] || !transactionData[year][month][date]) return "";

    const transactionListOfDate = transactionData[year][month][date]
    const total = {
      income: 0,
      expenditure: 0,
    }

    for (let { type, amount } of transactionListOfDate) {
      total[type] += Number(amount);
    }

    return `
    ${total.income ? `<span class="income-label">+${total.income}</span>` : ""}
    ${total.expenditure ? `<span class="expenditure-label">-${total.expenditure}</span>` : ""}
    ${total.income && total.expenditure ? `<span class="total-label">${total.income - total.expenditure < 0 ? '-' : '+'}${total.income - total.expenditure}</span>` : ""}
    `
  }

  createDot(isCurrentMonth, date) {
    const { year, month } = this.state;
    const { transactionData } = store.getState().transaction;

    if (!isCurrentMonth || !transactionData[year] || !transactionData[year][month] || !transactionData[year][month][date]) return "";

    const transactionListOfDate = transactionData[year][month][date]
    let total = 0;

    for (let { type, amount } of transactionListOfDate) {
      total += Number(amount) * (type === "income" ? 1 : -1);
    }
  
    return total !== 0 ? `<div class="dot ${total < 0 ? "red" : "blue"}"></div>` : "";
  }

  prevMonth() {
    let { year, month } = this.state;
    month -= 1;
    if (month === 0) {
      year--;
      month = 12;
    }

    this.setDateInfo(year, month);
  }

  nextMonth() {
    let { year, month } = this.state;
    month += 1;
    if (month === 13) {
      year++;
      month = 1;
    }

    this.setDateInfo(year, month);
  }
}

// const MONTH_LIST_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_LIST_SHORT_KOREAN = ["일", "월", "화", "수", "목", "금", "토"];
