// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CoinTable from "@/components/coinTable";
import { toggleWatchlist, isInWatchlist } from "@/app/utils/watchlist";

export default function HomePage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 50;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 250,
              page: 1,
            },
          }
        );
        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (direction: "prev" | "next") => {
    setCurrentPage((prev) =>
      direction === "prev" ? Math.max(prev - 1, 1) : prev + 1
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Market</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CoinTable coins={currentCoins} />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => paginate("prev")}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="self-center font-semibold">
              Page {currentPage}
            </span>
            <button
              onClick={() => paginate("next")}
              className="px-4 py-2 bg-gray-200 rounded"
              disabled={indexOfLastCoin >= coins.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
