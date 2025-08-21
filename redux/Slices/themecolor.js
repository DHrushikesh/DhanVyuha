import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // "light" or "dark"
  colors: { 
    light: {
      primary: "linear-gradient(45deg, #4caf50, #81c784)",   // green gradient
      secondary: "linear-gradient(45deg, #ff9800, #ffb74d)", // orange gradient
      background: "#f9f9f9",
      surface: "#ffffff",
      textPrimary: "#212121",
      textSecondary: "#616161",
      border: "#e0e0e0",
    },
    dark: {
      primary: "linear-gradient(45deg, #388e3c, #66bb6a)",   // darker green gradient
      secondary: "linear-gradient(45deg, #f57c00, #ffb74d)", // darker orange gradient
      background: "#121212",
      surface: "#1e1e1e",
      textPrimary: "#e0e0e0",
      textSecondary: "#bdbdbd",
      border: "#333333",
    },
  },
};

const themeSlice = createSlice({
  name: "ThemeStore",
  initialState,
  reducers: {
    //this to toggle the modes through buttons
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //this to take from the local storage 
    setMode(state, action) {
      state.mode = action.payload; 
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
