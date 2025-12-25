'use client';

import { useState, useEffect } from 'react';

interface PortfolioItem {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  value: number;
  weight: number;
}

interface PortfolioSimulatorProps {
  stocks: string[];
}

export default function PortfolioSimulator({ stocks }: PortfolioSimulatorProps) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [allocations, setAllocations] = useState<{ [symbol: string]: number }>({});
  const [totalInvestment, setTotalInvestment] = useState(10000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stocks.length > 0) {
      loadStockData();
    }
  }, [stocks]);

  const loadStockData = async () => {
    setLoading(true);
    try {
      const mockPrices: { [symbol: string]: number } = {
        'AAPL': 180.50,
        'MSFT': 415.20,
        'TSLA': 248.30,
        'GOOGL': 142.80,
        'NVDA': 875.20,
        'AMZN': 155.30,
        'META': 485.60,
        'NFLX': 605.40,
      };

      const portfolioItems: PortfolioItem[] = stocks.map((symbol, index) => ({
        symbol: symbol.toUpperCase(),
        name: symbol.toUpperCase(),
        shares: 0,
        price: mockPrices[symbol.toUpperCase()] || 100 + Math.random() * 200,
        value: 0,
        weight: stocks.length > 0 ? 100 / stocks.length : 100,
      }));

      setPortfolio(portfolioItems);

      const equalAllocation = 100 / stocks.length;
      const initialAllocations: { [symbol: string]: number } = {};
      stocks.forEach(symbol => {
        initialAllocations[symbol.toUpperCase()] = equalAllocation;
      });
      setAllocations(initialAllocations);

    } catch (error) {
      console.error('Error loading stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAllocation = (symbol: string, percentage: number) => {
    const newAllocations = { ...allocations, [symbol]: percentage };
    setAllocations(newAllocations);

    const updatedPortfolio = portfolio.map(item => {
      if (item.symbol === symbol) {
        const shares = (totalInvestment * percentage / 100) / item.price;
        const value = shares * item.price;
        return { ...item, shares, value, weight: percentage };
      }
      return item;
    });

    setPortfolio(updatedPortfolio);
  };

  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);
  const totalReturn = portfolio.reduce((sum, item) => sum + ((item.value - (item.shares * item.price)) / (item.shares * item.price)) * 100, 0) / portfolio.length;

  if (loading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-white mb-6">Portfolio Simulator</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Total Investment Amount
        </label>
        <input
          type="number"
          value={totalInvestment}
          onChange={(e) => setTotalInvestment(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="10000"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400">Total Value</h4>
          <p className="text-2xl font-bold text-green-400">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400">Total Return</h4>
          <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalReturn.toFixed(2)}%
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400">Stocks</h4>
          <p className="text-2xl font-bold text-blue-400">{portfolio.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Asset Allocation</h4>

        {portfolio.map((item) => (
          <div key={item.symbol} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h5 className="font-medium text-white">{item.name}</h5>
                <p className="text-sm text-gray-400">{item.symbol} • ${item.price.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Shares</p>
                <p className="font-medium text-white">{item.shares.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={item.weight}
                onChange={(e) => updateAllocation(item.symbol, Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={item.weight}
                onChange={(e) => updateAllocation(item.symbol, Number(e.target.value))}
                className="w-16 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-center"
              />
              <span className="text-white font-medium w-12">{item.weight.toFixed(1)}%</span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-400">Value: ${item.value.toFixed(2)}</span>
              <span className={`font-medium ${item.value >= (totalInvestment * item.weight / 100) ? 'text-green-400' : 'text-red-400'}`}>
                {((item.value / (totalInvestment * item.weight / 100) - 1) * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {portfolio.length > 0 && (
        <div className="mt-6 p-4 bg-blue-900/50 border border-blue-600 rounded-lg">
          <h4 className="font-medium text-blue-400 mb-2">Portfolio Analysis</h4>
          <p className="text-blue-200 text-sm">
            {portfolio.filter(item => item.weight > 30).length > 0
              ? "⚠️ High concentration in individual stocks detected. Consider diversifying."
              : "✅ Well-diversified portfolio with balanced allocations."
            }
          </p>
        </div>
      )}
    </div>
  );
}
