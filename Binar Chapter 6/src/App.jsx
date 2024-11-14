import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./components/hero/Hero";
import ShopList from "./components/shopList/ShopList";
import SearchFilter from "./components/searchFilter/SearchFilter";
import Login from "./pages/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavbarTailwind from "./components/navbarTailwind/NavbarTailwind";
import NotFound from "./pages/NotFound";
import Notification from "./components/Notifictaion";

function App() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // check usernya udah login atau belum
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const fetchShops = async (searchTerm = "", filter = "", page = 1) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("productName", searchTerm);
      if (filter) queryParams.append("maxPrice", filter);
      queryParams.append("page", page);
      queryParams.append("limit", itemsPerPage);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/api/v1/shops?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (data.isSuccess) {
        setShops(data.data.shops);
        setTotalPages(data.data.totalPages);
      } else {
        setError("Error fetching shops");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops(searchTerm, filter, page);
  }, [searchTerm, filter, page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };
  return (
    <>
      {/* Baru */}
      <Router>
        {isAuthenticated && <NavbarTailwind onLogout={handleLogin} />}

        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Hero /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>

      {/* lama */}
      {/* <Hero /> */}
      <main className="text-center max-w-6xl mx-auto p-6">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={(term) => {
            setSearchTerm(term);
            setPage(1);
          }}
          onFilterChange={(newFilter) => {
            setFilter(newFilter);
            setPage(1);
          }}
        />
        <ShopList shops={shops} loading={loading} error={error} />
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2text-white bg-green-500 rounded"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
