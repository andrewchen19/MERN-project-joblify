import { createSlice } from "@reduxjs/toolkit";

// theme
const themes = {
  myLight: "myLight",
  myDark: "myDark",
};

// 儲存到 localStorage，確保 page reload 時，theme 仍存在
const getThemeFromLocalStorage = () => {
  const theme = JSON.parse(localStorage.getItem("theme")) || themes.myLight;
  // 使用 document 的 documentElement 屬性，就可以拿到 <html> element
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

// 儲存到 localStorage，確保 page reload 時，user 仍存在
const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const defaultState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
  isSidebarOpen: false,
  isBarChart: true,
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      state.isBarChart = true;
      localStorage.removeItem("user");
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    toggleTheme: (state) => {
      const { myLight, myDark } = themes;
      const newTheme = state.theme === myLight ? myDark : myLight;
      state.theme = newTheme;
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", JSON.stringify(newTheme));
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleChart: (state) => {
      state.isBarChart = !state.isBarChart;
    },
  },
});

// 輸出 slice.reducer
export default userSlice.reducer;
// 輸出個別的 reducer
export const {
  setUser,
  removeUser,
  updateUser,
  toggleTheme,
  toggleSidebar,
  toggleChart,
} = userSlice.actions;
