import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import accountReducer from './module';
import logger from "redux-logger";

const isProduction = process.env.NODE_ENV == "production";

// create store
const makeStore = () => configureStore({
    reducer : accountReducer,
    middleware: 
        (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: !isProduction,
});

// produce wrapper
const wrapper = createWrapper( makeStore, { debug: !isProduction } );
export default wrapper