//utils/watchlist.ts

export const getWatchlist = (): string[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const toggleWatchlist = (id: string): void => {
  const watchlist = getWatchlist();
  const index = watchlist.indexOf(id);

  if (index > -1) {
    watchlist.splice(index, 1); // Remove
  } else {
    watchlist.push(id); // Add
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
};

export const isInWatchlist = (id: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.includes(id);
};
