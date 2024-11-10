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

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/v1/shops");
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

    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.products[0].name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter = filter ? shop.category === filter : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Hero />
      <main className="text-center max-w-6xl mx-auto p-6">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilter}
        />

        <ShopList shops={filteredShops} loading={loading} error={error} />
      </main>
    </>
  );
}

export default App;
