"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface MarketData {
  prices: [number, number][];
}

export default function CoinChart({ id }: { id: string }) {
  const [chartData, setChartData] = useState<MarketData | null>(null);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((data) => setChartData(data));
  }, [id]);

  if (!chartData) return <div>Loading chart...</div>;

  const data = {
    labels: chartData.prices.map((p) =>
      new Date(p[0]).toLocaleDateString("en-US")
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: chartData.prices.map((p) => p[1]),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}
