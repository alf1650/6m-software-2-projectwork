import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Search from "./components/Search";
import Results from "./components/Results";
import NotFound from "./components/NotFound";
import Favorites from "./components/Favorites";

function App() {
  const [username, setUsername] = useState("guest");

  const updateUsername = (value) => {
    setUsername(value);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login updateUsername={updateUsername} />} />
            <Route path="search" element={<Search username={username} />} />
            <Route path="favorites" element={<Favorites/>} />
            <Route path=":id" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
