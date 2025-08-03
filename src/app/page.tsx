"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
      )
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Crypto Dashboard</h1>
      <CoinTable coins={coins} />
    </main>
  );
}
