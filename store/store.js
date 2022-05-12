import { createStore } from "../src/core/createStore.js";

import { rootReducer } from "./rootReducer.js";

const persistConfig = {
  key: "root",
  whitelist: ["transaction"],
}

export const store = createStore(rootReducer, persistConfig);
