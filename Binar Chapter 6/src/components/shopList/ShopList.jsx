import React from "react";

function ShopList({ shops, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop, index) => (
        <div key={index} className="p-4 border rounded-md bg-white shadow-md">
          <img
            src={shop.products[0].images[0]}
            alt={shop.products[0].name}
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="font-semibold">{shop.products[0].name}</h3>
          <p className="text-green-500 font-bold">
            Rp{shop.products[0].price} / hari
          </p>
          <p className="text-gray-600 mt-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex items-center justify-around text-gray-500 text-sm mt-4">
            <span>4 orang</span>
            <span>Manual</span>
            <span>Tahun 2020</span>
          </div>
          <button className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">
            Pilih Mobil
          </button>
        </div>
      ))}
    </section>
  );
}

export default ShopList;
