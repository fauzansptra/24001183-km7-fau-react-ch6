import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./components/hero/Hero";
import ShopList from "./components/shopList/ShopList";

function App() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Hero />
      <main className="text-center">
        <ShopList shops={shops} loading={loading} error={error} />
      </main>
    </>
  );
}

export default App;
