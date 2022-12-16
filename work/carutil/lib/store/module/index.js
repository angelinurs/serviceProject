import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
// import { REHYDRATE } from "redux-persist";

import accountSlice from "./account";

const rootReducer = ( state, action ) => {
    // NextJS 는 SSR 환경이므로 
    // server 와 client 의 store 를 합쳐준다.
    if( action.type === HYDRATE ) {
        return {
            ...state,
            ...action.paylod
        };
    } else {
        // 정의한 reducer module 을 합쳐주는 역활
        return combineReducers({
            account: accountSlice,
            // add more something module of reducer( slice )
        })( state, action );
    }
}

export default rootReducer;