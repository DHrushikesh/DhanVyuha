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
    primary: "linear-gradient(45deg, #d97706, #fbbf24)",  
    secondary: "linear-gradient(45deg, #f59e0b, #fde68a)",  
    balanceGradient: "linear-gradient(135deg, rgba(217,119,6,0.85) 0%, rgba(251,191,36,0.9) 50%, rgba(254,240,138,0.95) 100%)",  
    background: "#14100b",   
    surface: "#1e1a14",      
    textPrimary: "#fff7d6",  
    textSecondary: "#fde68a",
    border: "#b45309",       
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
