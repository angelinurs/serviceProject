import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import logger from "redux-logger";

// use local storage
import storage from 'redux-persist/lib/storage'
// use session storage
// import {storageSession as storage} from 'redux-persist/lib/storage/session'
import accountReducer from '../../store/module'


// ref : 
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

// declare root reducer
const rootReducer = combineReducers({
    account: accountReducer,
})

// declare persistConfig
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [ 'account' ],
}

// create persistReducer
const persistedReducer = persistReducer( persistConfig, rootReducer )

// find mode which is development or production
const isProduction = process.env.NODE_ENV !== "production";

export const makeStore = () => {
    const store = configureStore({
        reducer: persistedReducer,
        middleware: 
            ( getDefaultMiddleware ) => getDefaultMiddleware().concat( logger ),
        // middleware: ( getDefaultMiddleware ) => 
        //     getDefaultMiddleware({
        //         serializableCheck: {
        //             // ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        //             ignoreActions: [FLUSH, PAUSE, PERSIST, REGISTER],
        //         },
        //     }),
    })
    return store;
}

export const wrapper = createWrapper( makeStore, {
    debug: isProduction,
} )

