import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlider";
import { brandsReducer } from "./brandsSlice";

export let store = configureStore({
    reducer:{
        counter :CounterReducer,
        brand :brandsReducer
    }
})