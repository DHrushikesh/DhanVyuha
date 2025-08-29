import { createSlice } from "@reduxjs/toolkit";

const transactions = createSlice({

    name:"Tranasctions",
    initialState : [ ],
    reducers:{
        addTransaction(state,action){
            return action.payload;
        }
    }
})

export const  { addTransaction } = transactions.actions ;
export default transactions.reducer;