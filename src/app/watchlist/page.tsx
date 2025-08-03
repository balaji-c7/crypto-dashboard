//watchlist/page.tsx
"use client";

import { useEffect, useState } from "react";
import CoinTable from "@/components/coinTable";
import { getWatchlist } from "@/app/utils/watchlist";
import { getCoinMarketsByIds } from "@/lib/api";

export default function WatchlistPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      try {
        const watchlist = getWatchlist();
        if (watchlist.length === 0) {
          setCoins([]);
          return;
        }

        const data = await getCoinMarketsByIds(watchlist);
        setCoins(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load watchlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();
  }, []);

  if (loading) return <p className="p-4">Loading Watchlist...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (coins.length === 0)
    return <p className="p-4">No coins in your watchlist.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">⭐ Your Watchlist</h1>
      <CoinTable coins={coins} />
    </div>
  );
}
