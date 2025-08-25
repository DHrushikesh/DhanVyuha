import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // "light" or "dark"
  colors: {
    light: {
      primary: "linear-gradient(45deg, #fb923c, #fdba74)",  
secondary: "linear-gradient(45deg, #facc15, #fde68a)",  
balanceGradient: "linear-gradient(135deg, rgba(251,146,60,0.95) 0%, rgba(253,186,116,0.9) 50%, rgba(254,215,170,0.95) 100%)",  
background: "#fff7ed",  
surface: "#ffffff",  
textPrimary: "#7c2d12",  
textSecondary: "#9a3412",  
border: "#fed7aa",


    },
    dark: {
      primary: "linear-gradient(45deg, #c2410c, #ea580c)",  
  secondary: "linear-gradient(45deg, #d97706, #f59e0b)",  
  balanceGradient: "linear-gradient(135deg, rgba(194,65,12,0.75) 0%, rgba(234,88,12,0.9) 50%, rgba(217,119,6,0.95) 100%)",  
  background: "#1a130f",  
  surface: "#26201b",  
  textPrimary: "#fef3c7",  
  textSecondary: "#fcd34d",  
  border: "#78350f",

    },
  },
};

const themeSlice = createSlice({
  name: "ThemeStore",
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode(state, action) {
      state.mode = action.payload; 
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
