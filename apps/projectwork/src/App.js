import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStateProvider } from "./store/userStateContext";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <UserStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="search" element={<Search />} />
              <Route path="results" element={<Results />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserStateProvider>
    </>
  );
}
export default App;
