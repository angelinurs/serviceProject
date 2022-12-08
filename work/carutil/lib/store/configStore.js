import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import accountReducer from './module';
import logger from "redux-logger";

const isProduction = process.env.NODE_ENV === "production";

// create store
const makeStore = () => configureStore({
    reducer: accountReducer,
    middleware: 
        ( getDefaultMiddleware ) => getDefaultMiddleware().concat( logger ),
    devTools: !isProduction,
});

// produce wrapper
export const wrapper = createWrapper( makeStore, { debug: isProduction }, );