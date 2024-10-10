// MetalPrices.jsx
import React, { useEffect, useState } from "react";

const MetalPrices = () => {
  const [prices, setPrices] = useState({
    gold: null,
    silver: null,
    platinum: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "goldapi-9xgmsm20gknv4-io";

  // URLs for background images
  const imageUrls = {
    gold: "https://images.unsplash.com/photo-1516462919870-8bcf749b0135?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    silver:
      "https://images.unsplash.com/photo-1707783764111-502472d31ace?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    platinum:
      "https://images.unsplash.com/photo-1671058560386-7786dd2e5f65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const fetchMetalPrices = async () => {
    try {
      const responses = await Promise.all([
        fetch("https://www.goldapi.io/api/XAU/INR", {
          method: "GET",
          headers: {
            "x-access-token": API_KEY,
          },
        }),
        fetch("https://www.goldapi.io/api/XAG/INR", {
          method: "GET",
          headers: {
            "x-access-token": API_KEY,
          },
        }),
        fetch("https://www.goldapi.io/api/XPT/INR", {
          method: "GET",
          headers: {
            "x-access-token": API_KEY,
          },
        }),
      ]);

      const data = await Promise.all(responses.map((res) => res.json()));

      setPrices({
        gold: data[0],
        silver: data[1],
        platinum: data[2],
      });
    } catch (error) {
      setError("Failed to fetch metal prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetalPrices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getChangeClassName = (change) => {
    return change < 0 ? "text-red-500" : "text-green-500"; // Use red for negative and green for positive changes
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-raleway">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 relative overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrls.gold})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-70"></div>{" "}
          {/* Black gradient overlay */}
          <h2 className="text-2xl font-semibold mb-4 relative z-10">
            Gold (XAU)
          </h2>
          <p className="text-lg relative z-10">
            Current Price:{" "}
            <span className="font-bold text-black">
              ₹{prices.gold.price.toFixed(2)}
            </span>
          </p>
          <p className="text-lg relative z-10">
            Open Price: ₹{prices.gold.open_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            High Price: ₹{prices.gold.high_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            Low Price: ₹{prices.gold.low_price.toFixed(2)}
          </p>
          <p
            className={`text-sm font-bold relative z-10 ${getChangeClassName(
              prices.gold.ch
            )}`}
          >
            Change: {prices.gold.ch.toFixed(2)} ({prices.gold.chp.toFixed(2)}%)
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 relative overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrls.silver})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-70"></div>
          <h2 className="text-2xl font-semibold mb-4 relative z-10">
            Silver (XAG)
          </h2>
          <p className="text-lg relative z-10">
            Current Price:{" "}
            <span className="font-bold text-black">
              ₹{prices.silver.price.toFixed(2)}
            </span>
          </p>
          <p className="text-lg relative z-10">
            Open Price: ₹{prices.silver.open_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            High Price: ₹{prices.silver.high_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            Low Price: ₹{prices.silver.low_price.toFixed(2)}
          </p>
          <p
            className={`text-sm font-bold relative z-10 ${getChangeClassName(
              prices.silver.ch
            )}`}
          >
            Change: {prices.silver.ch.toFixed(2)} (
            {prices.silver.chp.toFixed(2)}%)
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 relative overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrls.platinum})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-70"></div>
          <h2 className="text-2xl font-semibold mb-4 relative z-10">
            Platinum (XPT)
          </h2>
          <p className="text-lg relative z-10">
            Current Price:{" "}
            <span className="font-bold text-black">
              ₹{prices.platinum.price.toFixed(2)}
            </span>
          </p>
          <p className="text-lg relative z-10">
            Open Price: ₹{prices.platinum.open_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            High Price: ₹{prices.platinum.high_price.toFixed(2)}
          </p>
          <p className="text-lg relative z-10">
            Low Price: ₹{prices.platinum.low_price.toFixed(2)}
          </p>
          <p
            className={`text-sm font-bold relative z-10 ${getChangeClassName(
              prices.platinum.ch
            )}`}
          >
            Change: {prices.platinum.ch.toFixed(2)} (
            {prices.platinum.chp.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetalPrices;
