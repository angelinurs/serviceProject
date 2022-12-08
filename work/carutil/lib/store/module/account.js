import { createSlice } from "@reduxjs/toolkit";

// Account 초기상태 정의
const initialState = { user: {}, chk : false };

// createSlice 를 통해
// reducer 와 action 한번에 정의
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        checkin(state, action ) {            
            state.user = action.payload;
            state.chk = true;
         },
        checkout( state ) { 
            state.user = {};
            state.chk = false;
        }
    }
})


export const { checkin, checkout } = accountSlice.actions

const reducer = accountSlice.reducer
export default reducer