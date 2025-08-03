// src/components/Header.tsx

"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white px-4 py-3 shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold hover:text-gray-300">
          Crypto Dashboard
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/watchlist" className="hover:text-yellow-400">
            ⭐ Watchlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
