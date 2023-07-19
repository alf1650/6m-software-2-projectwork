import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Search from "./components/Search";
import Results from "./components/Results";
import NotFound from "./components/NotFound";
import Favorites from "./components/Favorites";
import Footer from "./components/Footer";

function App() {
  const [isLoggedin, setIsloggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [currency, setCurrency] = useState("SGD");
  const [favs, setFavs] = useState("");

  const updateUsername = (value) => {
    setUsername(value);
  };

  const updateCurrency = (value) => {
    setCurrency(value);
  };

  const updateFavs = (newlist) => {
    setFavs((prev) => [...prev, newlist]);
  };

  const updateFavNotes = (id, input) => {
    setFavs(
      favs.map((fav) => (fav.id === id ? { ...fav, notes: input } : fav))
    );
    console.log(input);
  };

  const deleteFav = (newlist) => {
    setFavs(newlist);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isLoggedin={isLoggedin}
                setIsloggedin={setIsloggedin}
                username={username}
                updateUsername={updateUsername}
                currency={currency}
                updateCurrency={updateCurrency}
                favs={favs}
              />
            }
          >
            <Route
              index
              element={
                <Login
                  setIsloggedin={setIsloggedin}
                  updateUsername={updateUsername}
                  currency={currency}
                  updateCurrency={updateCurrency}
                />
              }
            />
            <Route path="search" element={<Search username={username} />} />
            <Route
              path="results"
              element={<Results currency={currency} updateFavs={updateFavs} />}
            />
            <Route
              path="favorites"
              element={
                <Favorites
                  favs={favs}
                  updateFavNotes={updateFavNotes}
                  deleteFav={deleteFav}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;