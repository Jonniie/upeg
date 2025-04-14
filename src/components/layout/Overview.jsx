/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function Overview() {
  const [stats, setStats] = useState({
    totalSupply: "--",
    transferVolume: "--",
    activeWallets: "--",
    priceDeviation: "$1.000x",
    totalHolders: "--",
  });
  return (
    <div className="text-white bg-gradient-to-b from-[#20273d] to-[#2b324a]">
      <div className="container flex flex-col items-center min-h-screen p-8 pb-20 gap-20 sm:p-20 mx-auto">
        <header>
          <h1 className="bg text-7xl mb-6 text-center">ultra pegged money</h1>
        </header>
        <main className="min-w-full px-8">
          <div className="text-center flex flex-col gap-[32px] items-center ">
            <div>
              <h2 className="text-4xl font-normal mb-4 text-gray-200">
                Overview Section
              </h2>
              <p className="text-sm text-gray-300">
                High level snapshot of PYUSD at a glance
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6 mt-8 w-full">
              {/* Total PYUSD Supply (4x2) */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left col-span-4 row-span-2 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">
                    Total PYUSD Supply
                  </h3>
                  <span className="text-xs text-gray-400">Updated live</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.totalSupply}
                </p>
                <p className="text-sm text-gray-400">
                  Current circulating supply
                </p>
                {/* Placeholder for Graph */}
                <div className="bg-gray-800 h-40 rounded-md flex items-center justify-center">
                  <span className="text-gray-500">Graph Placeholder</span>
                </div>
              </div>
              {/* 24h Transfer Volume (2x1) */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left col-span-2 row-span-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">
                    24h Transfer Volume
                  </h3>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.transferVolume}
                </p>
                <p className="text-sm text-gray-400">
                  Total transferred amount in past 24h
                </p>
              </div>
              {/* 24h Active Wallets (2x1) */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left col-span-2 row-span-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">
                    24h Active Wallets
                  </h3>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.activeWallets}
                </p>
                <p className="text-sm text-gray-400">
                  Unique senders + receivers in 24h
                </p>
              </div>
              {/* Current Price / Peg Deviation (3x1) */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left col-span-3 row-span-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">
                    Current Price / Peg Deviation
                  </h3>
                  <span className="text-xs text-gray-400">Updated live</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.priceDeviation}
                </p>
                <p className="text-sm text-gray-400">
                  (via DEX pool or price feed)
                </p>
              </div>
              {/* Total Holders (3x1) */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-md text-left col-span-3 row-span-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-200">
                    Total Holders
                  </h3>
                  <span className="text-xs text-gray-400">Updated live</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  {stats.totalHolders}
                </p>
                <p className="text-sm text-gray-400">
                  Count of wallet addresses holding PYUSD
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
