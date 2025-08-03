"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CoinChart from "@/components/coinChart";

export default function CoinDetailsPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching coin:", err);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!coin) return <div className="p-4 text-red-600">Coin not found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <img src={coin.image.large} alt={coin.name} className="w-20 h-20 mb-4" />

      <div className="grid gap-2">
        <p>
          <strong>Current Price:</strong> $
          {coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <p>
          <strong>Market Cap:</strong> $
          {coin.market_data.market_cap.usd.toLocaleString()}
        </p>
        <p>
          <strong>24h Volume:</strong> $
          {coin.market_data.total_volume.usd.toLocaleString()}
        </p>
        <p>
          <strong>Market Cap Rank:</strong> #{coin.market_cap_rank}
        </p>
        <p>
          <strong>Circulating Supply:</strong>{" "}
          {coin.market_data.circulating_supply.toLocaleString()}
        </p>
        <p>
          <strong>Total Supply:</strong>{" "}
          {coin.market_data.total_supply?.toLocaleString() ?? "N/A"}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: coin.description.en.split(". ")[0] + ".",
          }}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Price Chart</h2>
        <CoinChart id={id as string} />
      </div>
    </div>
  );
}
