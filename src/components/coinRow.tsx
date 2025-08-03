"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Coin = {
  id: string;
  market_cap_rank: number;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
};

export default function CoinRow({ coin }: { coin: Coin }) {
  const router = useRouter();

  const changeClass =
    coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

  const handleClick = () => {
    router.push(`/coin/${coin.id}`);
  };

  return (
    <tr
      onClick={handleClick}
      className="border-b hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
    >
      <td className="p-3">{coin.market_cap_rank}</td>
      <td className="p-3 flex items-center gap-2">
        <Image src={coin.image} alt={coin.name} width={24} height={24} />
        <div>
          <div className="font-semibold">{coin.name}</div>
          <div className="text-xs uppercase text-gray-500">{coin.symbol}</div>
        </div>
      </td>
      <td className="p-3">${coin.current_price.toLocaleString()}</td>
      <td className={`p-3 ${changeClass}`}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="p-3">${coin.market_cap.toLocaleString()}</td>
      <td className="p-3">${coin.total_volume.toLocaleString()}</td>
    </tr>
  );
}
