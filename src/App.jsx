import { useState, useEffect } from "react";
import Overview from "./components/Overview";
import axios from "axios";

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || "";
const PYUSD_CONTRACT_ADDRESS =
  import.meta.env.VITE_PYUSD_CONTRACT_ADDRESS || "";

export default function App() {
  const [stats, setStats] = useState({
    totalSupply: "--",
    transferVolume: "--",
    activeWallets: "--",
    priceDeviation: "--",
    totalHolders: "--",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total supply, holders, and price
        const [supplyRes, priceRes] = await Promise.all([
          axios.get(
            `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${PYUSD_CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
          ),
          axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=paypal-usd&vs_currencies=usd"
          ),
        ]);

        const totalSupply = supplyRes.data.result / 10 ** 6; // PYUSD has 6 decimals
        const currentPrice = priceRes.data["paypal-usd"].usd;

        // Fetch holders count
        const holdersRes = await axios.get(
          `https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${PYUSD_CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
        );
        const holdersCount = holdersRes.data.result[0]?.holders || "--";

        // Fetch 24-hour transfer volume and active wallets
        const transferRes = await axios.get(
          `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${PYUSD_CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
        );

        const now = Math.floor(Date.now() / 1000);
        const oneDayAgo = now - 86400;
        const transactions = transferRes.data.result.filter(
          (tx) => tx.timeStamp >= oneDayAgo
        );

        let transferVolume = 0;
        const activeWallets = new Set();

        transactions.forEach((tx) => {
          transferVolume += parseFloat(tx.value) / 10 ** 6; // Convert from smallest unit
          activeWallets.add(tx.from);
          activeWallets.add(tx.to);
        });

        setStats({
          totalSupply: formatNumber(totalSupply),
          transferVolume: formatNumber(transferVolume),
          activeWallets: formatNumber(activeWallets.size),
          priceDeviation: `$${currentPrice.toFixed(6)}`,
          totalHolders: formatNumber(holdersCount),
          loading: false,
        });
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          error: "Failed to fetch data",
          loading: false,
        }));
        console.error("Error fetching PYUSD stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return "--";
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="text-white bg-gradient-to-b from-[#20273d] to-[#2b324a]">
      <div className="container flex flex-col items-center min-h-screen pb-20 gap-20 sm:p-8 mx-auto">
        <header>
          <h1 className="bg pt-24 text-7xl mb-6 text-center">
            ultra pegged money
          </h1>
        </header>
        <main className="min-w-full px-8">
          <div className="text-center flex flex-col gap-[32px] items-center">
            <Overview stats={stats} />
          </div>
        </main>
      </div>
    </div>
  );
}
