export const initialState = {
  isLoggedIn: false,
  username: "",
  userCurrency: "SGD",
  countriesList: [],
  selectedCountry: {}, // { name: "", code: "", currency: "" }
  selectedYear: "2023",
  favs: [], // [{id: "", country: "", start: "", end: "", notes: ""}, {...}]
};

function userStateReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "LOG_IN":
      console.log("LOG_IN", "isLoggedIn = true");
      return { ...state, isLoggedIn: true };

    case "LOG_OUT":
      console.log("LOG_OUT", "returned initialState");
      return initialState; //return to initial state on logout

    case "UPDATE_USERNAME":
      console.log("UPDATE_USERNAME", payload);
      return { ...state, username: payload };

    case "UPDATE_USER_CURRENCY":
      console.log("UPDATE_USER_CURRENCY", payload);
      return { ...state, userCurrency: payload };

    case "UPDATE_COUNTRY_LIST":
      console.log("UPDATE_COUNTRY_LIST", payload);
      return { ...state, countriesList: payload };

    case "UPDATE_COUNTRY":
      console.log("UPDATE_COUNTRY", payload);
      return { ...state, selectedCountry: payload };

    case "UPDATE_YEAR":
      console.log("UPDATE_YEAR", payload);
      return { ...state, selectedYear: payload };

    case "ADD_FAV":
      console.log("ADD_FAV", payload);
      return { ...state, favs: payload };

    case "UPDATE_FAVNOTES":
      console.log("UPDATE_FAVNOTES", payload);
      return { ...state, favs: payload };

    case "DELETE_FAV":
      console.log("DELETE_FAV", payload);
      return { ...state, favs: payload };

    default: //alert error if dispatched typo
      throw new Error(`No case for type ${type} found in userStateReducer.`);
  }
}

export default userStateReducer;
