import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./components/hero/Hero";
import ShopList from "./components/shopList/ShopList";
import SearchFilter from "./components/searchFilter/SearchFilter";

function App() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch shops with optional search and filter parameters
  const fetchShops = async (searchTerm = "", filter = "") => {
    setLoading(true);
    try {
      // Build query string based on search and filter
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("productName", searchTerm);
      if (filter) queryParams.append("maxPrice", filter);

      const response = await axios.get(
        `http://localhost:3000/api/v1/shops?${queryParams.toString()}`
      );

      const data = response.data;
      if (data.isSuccess) {
        setShops(data.data.shops);
      } else {
        setError("Error fetching shops");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch shops on initial render and whenever search/filter changes
  useEffect(() => {
    fetchShops(searchTerm, filter);
  }, [searchTerm, filter]);

  return (
    <>
      <Hero />
      <main className="text-center max-w-6xl mx-auto p-6">
        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilter}
        />

        {/* Shop List */}
        <ShopList shops={shops} loading={loading} error={error} />
      </main>
    </>
  );
}

export default App;
