import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStateProvider } from "./store/userStateContext";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
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
              <Route index element={<Login />} /> {/*Login is the default view for Home*/}
              <Route element={<ProtectedRoutes />}> {/*Protected routes within, redirects to Home if not logged in*/}
                <Route path="search" element={<Search />} />
                <Route path="results" element={<Results />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} /> 
              </Route>{/*Protected routes within, redirects to Home if not logged in*/}
            </Route>
          </Routes>
        </BrowserRouter>
      </UserStateProvider>
    </>
  );
}
export default App;
