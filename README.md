# 💸 가계부 프로젝트

간단하고 직관적으로 사용할 수 있는 가계부입니다.

## ✅ 기능

- 거래 내역을 추가, 제거할 수 있습니다.
- 설정한 기간 사이의 입출금 리스트를 볼 수 있습니다.
- 달력 형태로 입출금 내역을 볼 수 있습니다.
- 지출 통계를 카테고리별로 분류된 차트 형태로 볼 수 있습니다.

## 📂 프로젝트 구조

```
├─ 📜index.html
├─ 📜style.css
└─ 📂src
   ├─ 📜index.js
   ├─ 📜App.js
   ├─ 📂components
   │  ├─ 📜CategoryTransactionModal.js
   │  ├─ 📜DateRangeSelector.js
   │  ├─ 📜DonutChart.js
   │  ├─ 📜DonutChartLegend.js
   │  ├─ 📜DonutChartLegendBlock.js
   │  ├─ 📜Header.js
   │  ├─ 📜KeywordsBox.js
   │  ├─ 📜Main.js
   │  ├─ 📜TransactionAddButton.js
   │  ├─ 📜TransactionAddModal.js
   │  ├─ 📜TransactionBox.js
   │  └─ 📜TransactionListOfDay.js
   ├─ 📂constants
   │  ├─ 📜dateValue.js
   │  ├─ 📜donutChartColor.js
   │  └─ 📜keywordBox.js
   ├─ 📂core
   │  ├─ 📂utils
   │  │  └─ 📜createAction.js
   │  ├─ 📜adjustChildComponents.js
   │  ├─ 📜combineReducers.js
   │  ├─ 📜Component.js
   │  ├─ 📜ComponentError.js
   │  ├─ 📜createStore.js
   │  ├─ 📜observer.js
   │  ├─ 📜Router.js
   │  └─ 📜updateElement.js
   ├─ 📂routes
   │  ├─ 📜Analytics.js
   │  ├─ 📜Calendar.js
   │  ├─ 📜router.js
   │  ├─ 📜RouterLink.js
   │  └─ 📜TransactionList.js
   └─ 📂store
      ├─ 📂transaction
      │  ├─ 📜transaction.action.js
      │  ├─ 📜transaction.reducer.js
      │  ├─ 📜transaction.selector.js
      │  └─ 📜transaction.types.js
      ├─ 📂transactionKeyword
      │  ├─ 📜transactionKeyword.action.js
      │  ├─ 📜transactionKeyword.reducer.js
      │  └─ 📜transactionKeyword.types.js
      ├─ 📜rootReducer.js
      └─ 📜store.js
```
