import {configureStore } from '@reduxjs/toolkit'
import ThemeReducer from './Slices/themecolor.js'

const store = configureStore(
{
    reducer : {
        theme : ThemeReducer },
}
)

export default store;
