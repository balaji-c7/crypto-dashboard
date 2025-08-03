//components/cointable.tsx
import CoinRow from "./coinRow";

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

export default function CoinTable({ coins }: { coins: Coin[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">#</th>
            <th className="p-3">Coin</th>
            <th className="p-3">Price</th>
            <th className="p-3">24h %</th>
            <th className="p-3">Market Cap</th>
            <th className="p-3">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <CoinRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
