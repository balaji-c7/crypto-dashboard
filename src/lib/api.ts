// src/lib/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "",
  },
});

export const getCoins = async (page = 1) => {
  const res = await API.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 50,
      page,
    },
  });
  return res.data;
};
// src/lib/api.ts

export const getCoinMarketsByIds = async (ids: string[]) => {
  const response = await API.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: ids.join(","), // comma-separated IDs
    },
  });
  return response.data;
};
