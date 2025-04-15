import StatCard from "./StatCard";

export default function Overview({ stats }) {
  return (
    <div className="w-full text-center flex flex-col gap-8 items-center ">
      <div>
        <h2 className="text-4xl font-normal mb-4 text-gray-200">
          Overview Section
        </h2>
        <p className="text-sm text-gray-300">
          High level snapshot of PYUSD at a glance
        </p>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-6 gap-6 mt-8 w-full">
        {/* Total PYUSD Supply (4x2) */}
        <StatCard grid="col-span-4 row-span-2 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-200">
              Total PYUSD Supply
            </h3>
            <span className="text-xs text-gray-400">Updated live</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalSupply}</p>
          <p className="text-sm text-gray-400">Current circulating supply</p>
          {/* Placeholder for Graph */}
          <div className="bg-gray-800 h-40 rounded-md flex items-center justify-center">
            <span className="text-gray-500">Graph Placeholder</span>
          </div>
        </StatCard>
        {/* 24h Transfer Volume (2x1) */}
        <StatCard grid="col-span-2 row-span-1 ">
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
        </StatCard>
        {/* 24h Active Wallets (2x1) */}
        <StatCard grid="col-span-2 row-span-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-200">
              24h Active Wallets
            </h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.activeWallets}</p>
          <p className="text-sm text-gray-400">
            Unique senders + receivers in 24h
          </p>
        </StatCard>
        {/* Current Price / Peg Deviation (3x1) */}
        <StatCard grid="col-span-3 row-span-1 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-200">
              Current Price / Peg Deviation
            </h3>
            <span className="text-xs text-gray-400">Updated live</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {stats.priceDeviation}
          </p>
          <p className="text-sm text-gray-400">(via DEX pool or price feed)</p>
        </StatCard>
        {/* Total Holders (3x1) */}
        <StatCard grid="col-span-3 row-span-1 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-200">
              Total Holders
            </h3>
            <span className="text-xs text-gray-400">Updated live</span>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalHolders}</p>
          <p className="text-sm text-gray-400">
            Count of wallet addresses holding PYUSD
          </p>
        </StatCard>
      </div>
    </div>
  );
}
