"use client";
import { useEffect, useState } from "react";
import CoinTable from "@/components/coinTable";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  image: string;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    const ids = stored ? JSON.parse(stored) : [];
    setWatchlist(ids);

    if (ids.length > 0) {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
          ","
        )}`
      )
        .then((res) => res.json())
        .then((data) => setCoins(data));
    }
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      <CoinTable coins={coins} />
    </main>
  );
}
