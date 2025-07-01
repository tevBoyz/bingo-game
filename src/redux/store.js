import { configureStore } from "@reduxjs/toolkit";
import bingoReducer from "./bingoSlice";

export const store = configureStore({
  reducer: {
    bingo: bingoReducer,
  },
});
