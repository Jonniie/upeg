/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const PYUSD_ADDRESS = "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8"; // Replace with actual PYUSD contract
const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

export default function usePYUSDData(providerUrl) {
  const [supplyHistory, setSupplyHistory] = useState([]);
  const [latestSupply, setLatestSupply] = useState(null);
  const [pegPrice, setPegPrice] = useState(null);
  const [holders, setHolders] = useState(null);
  const [transferStats, setTransferStats] = useState({
    totalTransferred: 0,
    uniqueAddresses: 0,
  });

  useEffect(() => {
    console.log("Polling PYUSD stats...");
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const token = new ethers.Contract(PYUSD_ADDRESS, ERC20_ABI, provider);

    let interval = setInterval(async () => {
      const now = Math.floor(Date.now() / 1000);
      const since = now - 86400;

      // 1. Supply
      const totalSupply = await token.totalSupply();
      const supply = Number(ethers.formatUnits(totalSupply, 18));
      setLatestSupply(supply);
      setSupplyHistory((prev) => [
        ...prev.slice(-1439),
        { time: Date.now(), supply },
      ]); // keep last 24h (every min)

      // 2. Peg price - replace with onchain oracle / coingecko / DEX price
      const price = 1.0034; // placeholder
      setPegPrice(price);

      // 3. Holders count - placeholder: off-chain index or snapshot
      const holdersCount = 1583; // replace with query to block explorer API
      setHolders(holdersCount);

      // 4 & 5. Transfers in last 24h
      const transferEvents = await token.queryFilter(
        token.filters.Transfer(),
        (await provider.getBlockNumber()) - 6500 // approx 24h on Ethereum
      );

      let totalTransferred = 0;
      let unique = new Set();

      transferEvents.forEach((e) => {
        totalTransferred += Number(ethers.formatUnits(e.args.value, 18));
        unique.add(e.args.from);
        unique.add(e.args.to);
      });

      setTransferStats({
        totalTransferred,
        uniqueAddresses: unique.size,
      });
    }, 1000); // Poll every minute

    return () => clearInterval(interval);
  }, [providerUrl]);

  return {
    supplyHistory,
    latestSupply,
    pegPrice,
    holders,
    transferStats,
  };
}
