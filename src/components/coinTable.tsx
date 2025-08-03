"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toggleWatchlist, isInWatchlist } from "@/app/utils/watchlist";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

interface CoinTableProps {
  coins: Coin[];
}

export default function CoinTable({ coins }: CoinTableProps) {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setWatchlist(saved);
  }, []);

  const handleWatchToggle = (coinId: string) => {
    const updated = toggleWatchlist(coinId);
    setWatchlist(updated);
  };

  const goToCoinPage = (id: string) => {
    router.push(`/coin/${id}`);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white dark:bg-gray-900 border rounded-lg">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="p-3">#</th>
            <th className="p-3">Coin</th>
            <th className="p-3">Price</th>
            <th className="p-3">24h %</th>
            <th className="p-3">Market Cap</th>
            <th className="p-3">Volume</th>
            <th className="p-3 text-center">⭐</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            const isWatchlisted = isInWatchlist(coin.id);
            const change = coin.price_change_percentage_24h;
            return (
              <tr
                key={coin.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                <td className="p-3">{coin.market_cap_rank}</td>
                <td
                  className="p-3 flex items-center gap-2"
                  onClick={() => goToCoinPage(coin.id)}
                >
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-medium">{coin.name}</span>
                  <span className="uppercase text-gray-500 text-sm">
                    ({coin.symbol})
                  </span>
                </td>
                <td className="p-3">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`p-3 ${
                    change > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {change?.toFixed(2)}%
                </td>
                <td className="p-3">${coin.market_cap.toLocaleString()}</td>
                <td className="p-3">${coin.total_volume.toLocaleString()}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleWatchToggle(coin.id)}>
                    {isWatchlisted ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
