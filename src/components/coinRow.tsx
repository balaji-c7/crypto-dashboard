
// src/components/CoinRow.tsx
import Image from "next/image";

export default function CoinRow({ coin }: { coin: any }) {
  const changeClass =
    coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

  return (
    <tr className="border-b hover:bg-gray-100">
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
