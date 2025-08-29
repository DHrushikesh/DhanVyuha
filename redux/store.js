import {configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './Slices/themecolor.js'
import TransactionReducer from './Slices/transactions.js'

const store = configureStore(
{
    reducer : {
        theme : ThemeReducer,
        transaction :  TransactionReducer
    },
}
)

export default store;
