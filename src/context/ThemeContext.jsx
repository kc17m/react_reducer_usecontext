import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload }; //spread syntax to keep all "state" properties if more than one after the state change
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  ///children: in our case: App component, see index.js

  //custom logic
  const [state, dispatch] = useReducer(themeReducer, {
    //analog zu useState: state und dispatch function
    //dispatch: takes action object as argument: action.type, action.payload
    color: "#58249c",
  });

  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color }); //action.type + action.payload
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
