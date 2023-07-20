import { createContext, useContext, useReducer } from "react";
import userStateReducer, { initialState } from "../reducer/userStateReducer";

const UserStateContext = createContext(initialState); //creating a context variable with initial state

export function UserStateProvider({ children }) {
  //returns a provider of global state: value, containing update functions
  const [state, dispatch] = useReducer(userStateReducer, initialState);

  const updateLogIn = () => {
    if (!state.isLoggedIn) {
      dispatch({ type: "LOG_IN" });
    } else {
      dispatch({ type: "LOG_OUT" });
    }
  };

  const updateUsername = (username) => {
    dispatch({ type: "UPDATE_USERNAME", payload: username });
  };

  const updateUserCurrency = (currency) => {
    dispatch({ type: "UPDATE_USER_CURRENCY", payload: currency });
  };

  const updateCountriesList = (countriesList) => {
    dispatch({ type: "UPDATE_COUNTRY_LIST", payload: countriesList });
  };

  const updateCountry = (country) => {
    dispatch({ type: "UPDATE_COUNTRY", payload: country });
  };

  const addFav = (fav) => {
    const newFavArr = [...state.favs, fav];
    dispatch({ type: "ADD_FAV", payload: newFavArr });
  };

  const updateFavNotes = (id, input) => {
    const favs = state.favs;
    const newFavArr = favs.map((fav) =>
      fav.id === id ? { ...fav, notes: input } : fav
    );
    dispatch({ type: "UPDATE_FAVNOTES", payload: newFavArr });
  };

  const deleteFav = (id) => {
    const favs = state.favs;
    const newFavArr = favs.filter((fav) => fav.id !== id);
    dispatch({ type: "DELETE_FAV", payload: newFavArr });
  };

  const value = {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    userCurrency: state.userCurrency,
    countriesList: state.countriesList,
    selectedCountry: state.selectedCountry,
    favs: state.favs,
    updateLogIn,
    updateUsername,
    updateUserCurrency,
    updateCountriesList,
    updateCountry,
    addFav,
    updateFavNotes,
    deleteFav,
  };

  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
}

const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within UserStateContext");
  }
  return context;
};
//custom hook to check & error if context is used outside it's provider,
//instead of allowing 'useContext' calls directly in components

export default useUserState;
