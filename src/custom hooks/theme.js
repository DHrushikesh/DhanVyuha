import { useSelector } from "react-redux";

function useTheme() {
  return useSelector((state) => {
    const currTheme = state.theme.mode;
    return state.theme.colors[currTheme];
  });
}

export default useTheme;
