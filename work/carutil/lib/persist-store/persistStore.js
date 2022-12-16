import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import thunk from "redux-thunk";

// use local storage
import storage from 'redux-persist/lib/storage'
// use session storage
// import {storageSession as storage} from 'redux-persist/lib/storage/session'
// import accountSlice from '../store/module/account'
import accountReducer from '../store/module'
import { persistStore } from "redux-persist";



// ref : 
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

// declare root reducer
// const rootReducer = combineReducers({
//     account: accountReducer,
//     // add more something module of reducer( slice )
// })

// declare persistConfig
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // whitelist: [ 'account' ],
}

// create persistReducer
// const persistedReducer = persistReducer( persistConfig, rootReducer )
const persistedReducer = persistReducer( persistConfig, accountReducer )

// find mode which is development or production
const isProduction = process.env.NODE_ENV === "production";
const isServer = typeof window === 'undefined';

export const makeStore = () => {
    if( isServer ) {
        return configureStore({
            reducer: accountReducer,
        })
    } else {
        
        const store = configureStore({
            reducer: persistedReducer,
            // middleware: 
            //     ( getDefaultMiddleware ) => getDefaultMiddleware().concat( thunk ),
            middleware: ( getDefaultMiddleware ) => 
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        // ignoreActions: [FLUSH, PAUSE, PERSIST, REGISTER],
                    },
                }),
        });

        let persistor = persistStore( store );
    
        return {persistor, ...store};
    }

}

const wrapper = createWrapper( makeStore, 
    { debug: !isProduction, }
    )

export default wrapper