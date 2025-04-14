import React from "react";
import usePYUSDData from "../hooks/usePollingPYUSDStats";

export default function PYUSDStats() {
  const { supplyHistory, latestSupply, pegPrice, holders, transferStats } =
    usePYUSDData(import.meta.env.VITE_ETHEREUM_RPC_URL || "");

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">PYUSD Dashboard</h2>

      <div>
        <strong>Current Supply:</strong> {latestSupply?.toFixed(2)}
      </div>
      <div>
        <strong>Peg Price:</strong> ${pegPrice?.toFixed(4)}
      </div>
      <div>
        <strong>Wallet Holders:</strong> {holders}
      </div>
      <div>
        <strong>Total Transferred (24h):</strong>{" "}
        {transferStats.totalTransferred.toFixed(2)} PYUSD
      </div>
      <div>
        <strong>Unique Addresses (24h):</strong> {transferStats.uniqueAddresses}
      </div>
    </div>
  );
}
