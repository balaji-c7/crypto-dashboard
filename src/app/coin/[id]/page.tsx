//app/coin/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CoinChart from "@/components/coinChart";
import Image from "next/image";

export default function CoinDetailsPage() {
  const { id } = useParams();

  interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: {
      large: string;
    };
    market_data: {
      current_price: {
        usd: number;
      };
      market_cap: {
        usd: number;
      };
    };
  }

  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    if (id) fetchCoin();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!coin) return <p className="text-center text-red-500">Coin not found.</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        {coin.image?.large && (
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
            className="rounded"
          />
        )}
        <h1 className="text-3xl font-bold">{coin.name}</h1>
      </div>

      <div className="mb-4">
        <p>
          <strong>Symbol:</strong> {coin.symbol.toUpperCase()}
        </p>
        <p>
          <strong>Current Price:</strong> $
          {coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <p>
          <strong>Market Cap:</strong> $
          {coin.market_data.market_cap.usd.toLocaleString()}
        </p>
      </div>

      <CoinChart id={id as string} />
    </div>
  );
}
