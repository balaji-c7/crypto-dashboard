"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export default function CoinChart({ id }: { id: string }) {
  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    )
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map((p: any) => ({
          x: new Date(p[0]).toLocaleDateString(),
          y: p[1],
        }));

        setChartData({
          labels: prices.map((p: any) => p.x),
          datasets: [
            {
              label: "Price (USD)",
              data: prices.map((p: any) => p.y),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              fill: true,
            },
          ],
        });
      });
  }, [id, days]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <div className="mb-4 flex gap-2">
        {[1, 7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1 rounded ${
              days === d ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {d === 1 ? "24h" : `${d}d`}
          </button>
        ))}
      </div>
      <Line data={chartData} />
    </div>
  );
}
