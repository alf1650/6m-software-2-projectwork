import "./App.css";
// App.js
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  // const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  // const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* {token ? <Main.js /> : <Login token={token} setToken={setToken} />} */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}>

          </Route>
          <Route path="Main" element={<Main />}>
      
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
