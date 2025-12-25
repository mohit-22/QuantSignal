'use client';

import { useState, useEffect } from 'react';
import { StockData, NewsItem } from '@/lib/stock-api';
import { AIAnalysis } from '@/lib/ai-analysis';
import { analyzeStocks, getStockHistory, getStockAnalysis, getStockNews } from '@/lib/actions/stock.actions';
import StockChart from '@/components/charts/StockChart';
import ComparisonChart from '@/components/charts/ComparisonChart';
import PortfolioSimulator from '@/components/PortfolioSimulator';

// Exact replica of the GitHub repository UI
// https://github.com/amit-123-max/AI_Market_Assistance.git

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function AIAnalystClient() {
  const [stockSymbols, setStockSymbols] = useState<string>('AAPL,MSFT,TSLA,GOOGL,NVDA');
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [allHistoricalData, setAllHistoricalData] = useState<{[symbol: string]: any[]}>({});
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'portfolio' | 'comparison'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (stockSymbols.trim()) {
      analyzeStocksAction();
    }
  }, []);

  const analyzeStocksAction = async () => {
    setLoading(true);
    try {
      const symbols = stockSymbols.split(',').map(s => s.trim().toUpperCase()).filter(s => s);
      if (symbols.length === 0) return;

            const result = await analyzeStocks(symbols);
            console.log('Analysis result:', result);
            console.log('AI Analysis:', result.aiAnalysis);
            console.log('Stocks received:', result.stocks?.length || 0);

            setStocks(result.stocks);
            setSelectedStock(result.selectedStock);
            setHistoricalData(result.historicalData);
            setAiAnalysis(result.aiAnalysis);
            setNews(result.news);

            // Fetch historical data for all stocks for comparison
            const historicalDataMap: {[symbol: string]: any[]} = {};
            for (const stock of result.stocks) {
              try {
                const histData = await getStockHistory(stock.symbol);
                historicalDataMap[stock.symbol] = histData;
              } catch (error) {
                console.error(`Failed to fetch historical data for ${stock.symbol}:`, error);
                historicalDataMap[stock.symbol] = [];
              }
            }
            setAllHistoricalData(historicalDataMap);

            console.log('State updated - aiAnalysis set to:', result.aiAnalysis);
            console.log('Historical data fetched for all stocks:', Object.keys(historicalDataMap).length);
    } catch (error) {
      console.error('Error analyzing stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = async (stock: StockData) => {
    setSelectedStock(stock);
    setLoading(true);

    try {
      const [histData, newsData] = await Promise.all([
        getStockHistory(stock.symbol),
        getStockNews(stock.symbol)
      ]);

      const analysis = await getStockAnalysis(stock, histData);

      setHistoricalData(histData);
      setAllHistoricalData(prev => ({ ...prev, [stock.symbol]: histData }));
      setAiAnalysis(analysis);
      setNews(newsData);
    } catch (error) {
      console.error('Error loading stock details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'text-green-400';
      case 'SELL': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getRecommendationBg = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-900/50 border-green-600';
      case 'SELL': return 'bg-red-900/50 border-red-600';
      default: return 'bg-yellow-900/50 border-yellow-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header - Exact replica from repository */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 shadow-xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Investment Strategist Pro
                </h1>
                <p className="text-gray-300 mt-1">Advanced AI-powered stock analysis and portfolio management</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  ${stocks.reduce((sum, stock) => sum + stock.price, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Portfolio Value</div>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Exact replica from repository */}
        {sidebarOpen && (
          <div className="w-80 bg-gray-800 shadow-xl border-r border-gray-700 min-h-screen">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-white">⚙️ Analysis Settings</h2>

              {/* Stock Symbols Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  📊 Enter Stock Symbols
                </label>
                <textarea
                  value={stockSymbols}
                  onChange={(e) => setStockSymbols(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Enter stock symbols separated by commas&#10;Example: AAPL,MSFT,TSLA,GOOGL,NVDA"
                />
                <p className="text-xs text-gray-400 mt-2">
                  💡 Enter multiple stock symbols separated by commas for comprehensive analysis
                </p>
              </div>

              {/* Analysis Button */}
              <button
                onClick={analyzeStocksAction}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Stocks...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Analyze Stocks
                  </div>
                )}
              </button>

              {/* Analysis Type Selection */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">🎯 Analysis Type</h3>
                <div className="space-y-3">
                  {[
                    { id: 'overview', label: '📊 Overview', desc: 'Stock data, charts & news' },
                    { id: 'analysis', label: '🤖 AI Analysis', desc: 'AI-powered insights' },
                    { id: 'portfolio', label: '💼 Portfolio', desc: 'Investment simulator' },
                    { id: 'comparison', label: '📈 Comparison', desc: 'Multi-stock analysis' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform scale-105'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium text-white">{tab.label}</div>
                      <div className="text-sm text-gray-300 mt-1">{tab.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              {stocks.length > 0 && (
                <div className="mt-8 p-4 bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-lg border border-gray-600">
                  <h4 className="font-medium text-white mb-3">📈 Quick Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stocks Analyzed:</span>
                      <span className="text-white font-medium">{stocks.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg. Performance:</span>
                      <span className={`font-medium ${stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(stocks.reduce((sum, s) => sum + s.changePercent, 0) / stocks.length).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to AI Investment Strategist Pro</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Get comprehensive stock analysis, AI-powered insights, and portfolio management tools all in one place.
                </p>
              </div>

              {/* Stock Cards */}
              {stocks.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">📊 Stock Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {stocks.map((stock, index) => (
                      <div
                        key={stock.symbol}
                        onClick={() => handleStockSelect(stock)}
                        className={`bg-gradient-to-br from-gray-800 to-gray-900 border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          selectedStock?.symbol === stock.symbol ? 'ring-2 ring-blue-500 shadow-2xl' : 'border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-white text-lg">{stock.symbol}</h3>
                            <p className="text-gray-400 text-sm truncate">{stock.name}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            stock.changePercent >= 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                          }`}>
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </div>
                        </div>

                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-white">${stock.price.toFixed(2)}</div>
                          <div className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}
                          </div>
                        </div>

                        {stock.marketCap && (
                          <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-700">
                            <span>Market Cap</span>
                            <span>${(stock.marketCap / 1e9).toFixed(1)}B</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Stock Details */}
              {selectedStock && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <span className="mr-3">📈</span>
                      {selectedStock.name} ({selectedStock.symbol})
                    </h2>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Current Price</h3>
                        <div className="text-3xl font-bold text-blue-400">${selectedStock.price.toFixed(2)}</div>
                        <div className={`text-sm mt-1 ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {selectedStock.change >= 0 ? '+' : ''}${selectedStock.change.toFixed(2)} ({selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
                        </div>
                      </div>

                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Market Data</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Volume:</span>
                            <span className="text-white font-medium">{selectedStock.volume?.toLocaleString() || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">P/E Ratio:</span>
                            <span className="text-white font-medium">{selectedStock.pe?.toFixed(2) || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sector:</span>
                            <span className="text-white font-medium">{selectedStock.sector || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* News Section */}
                    {news.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <span className="mr-2">📰</span>
                          Latest News
                        </h3>
                        <div className="space-y-4">
                          {news.slice(0, 3).map((item, index) => (
                            <div key={index} className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                              <h4 className="text-white font-medium mb-2">{item.title}</h4>
                              <p className="text-gray-400 text-sm mb-3">{item.summary}</p>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span className="text-blue-400">{item.source}</span>
                                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                      <span className="mr-2">📊</span>
                      Price Chart (6 Months)
                    </h3>
                    <StockChart
                      data={allHistoricalData[selectedStock.symbol] || historicalData}
                      symbol={selectedStock.symbol}
                      title={`${selectedStock.symbol} Price Trend`}
                      height={400}
                    />
                  </div>
                </div>
              )}

              {stocks.length === 0 && !loading && (
                <div className="text-center py-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Analyze Stocks</h3>
                  <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                    Enter stock symbols in the sidebar and click "Analyze Stocks" to get comprehensive market analysis and AI-powered insights.
                  </p>
                  <div className="text-sm text-gray-500">
                    💡 Try: AAPL, MSFT, TSLA, GOOGL, NVDA
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {aiAnalysis ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className={`p-8 rounded-xl border-2 ${getRecommendationBg(aiAnalysis.investmentRecommendation)} bg-gradient-to-br from-gray-800 to-gray-900`}>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-white">🤖 AI Investment Analysis</h2>
                        <div className={`px-6 py-3 rounded-full font-bold text-xl ${getRecommendationColor(aiAnalysis.investmentRecommendation)} bg-gray-800 border-2 ${
                          aiAnalysis.investmentRecommendation === 'BUY' ? 'border-green-600' :
                          aiAnalysis.investmentRecommendation === 'SELL' ? 'border-red-600' : 'border-yellow-600'
                        }`}>
                          {aiAnalysis.investmentRecommendation}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <span className="mr-2">🏢</span>
                            Company Overview
                          </h3>
                          <p className="text-gray-300">{aiAnalysis.companyOverview}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <span className="mr-2">📈</span>
                            Market Position
                          </h3>
                          <p className="text-gray-300">{aiAnalysis.marketPosition}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <span className="mr-2">💰</span>
                            Financial Health
                          </h3>
                          <p className="text-gray-300">{aiAnalysis.financialHealth}</p>
                        </div>

                        <div className="bg-gray-700 p-4 rounded-lg">
                          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <span className="mr-2">⚠️</span>
                            Risk Assessment
                          </h3>
                          <p className="text-gray-300">{aiAnalysis.riskAssessment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <span className="mr-2">🎯</span>
                        Key Investment Factors
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                            <span className="mr-2">✅</span>
                            Key Drivers
                          </h4>
                          <ul className="space-y-2">
                            {aiAnalysis.keyDrivers.map((driver, index) => (
                              <li key={index} className="text-gray-300 flex items-start ml-6">
                                <span className="text-green-400 mr-2 mt-1">•</span>
                                {driver}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                            <span className="mr-2">⚠️</span>
                            Risk Factors
                          </h4>
                          <ul className="space-y-2">
                            {aiAnalysis.risks.map((risk, index) => (
                              <li key={index} className="text-gray-300 flex items-start ml-6">
                                <span className="text-red-400 mr-2 mt-1">•</span>
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <span className="mr-2">📊</span>
                        Analysis Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-400 mb-2">
                            {aiAnalysis.confidenceLevel}%
                          </div>
                          <div className="text-sm text-gray-400">Confidence Level</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-400 mb-2">
                            ${aiAnalysis.priceTarget.low.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">Price Target (Low)</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-green-400 mb-2">
                            ${aiAnalysis.priceTarget.high.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-400">Price Target (High)</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-2">
                            {aiAnalysis.priceTarget.timeframe}
                          </div>
                          <div className="text-sm text-gray-400">Timeframe</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
                      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                        <span className="mr-2">💡</span>
                        AI Recommendations
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start p-4 bg-gray-700 rounded-lg">
                          <span className="text-yellow-400 mr-3 mt-1 text-xl">💰</span>
                          <div>
                            <div className="text-white font-semibold">Investment Strategy</div>
                            <div className="text-gray-300 text-sm mt-1">
                              Consider {aiAnalysis.investmentRecommendation.toLowerCase()} position with {aiAnalysis.confidenceLevel}% confidence based on comprehensive market analysis.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start p-4 bg-gray-700 rounded-lg">
                          <span className="text-blue-400 mr-3 mt-1 text-xl">🎯</span>
                          <div>
                            <div className="text-white font-semibold">Price Target Range</div>
                            <div className="text-gray-300 text-sm mt-1">
                              Target: ${aiAnalysis.priceTarget.low.toFixed(2)} - ${aiAnalysis.priceTarget.high.toFixed(2)} within {aiAnalysis.priceTarget.timeframe}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start p-4 bg-gray-700 rounded-lg">
                          <span className="text-purple-400 mr-3 mt-1 text-xl">📈</span>
                          <div>
                            <div className="text-white font-semibold">Market Position</div>
                            <div className="text-gray-300 text-sm mt-1">
                              {aiAnalysis.marketPosition}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                  <div className="text-6xl mb-6">🤖</div>
                  <h2 className="text-2xl font-bold text-white mb-4">AI Analysis Loading...</h2>
                  <p className="text-gray-400 text-lg">
                    Generating comprehensive investment analysis with AI-powered insights.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">💼 Portfolio Simulator</h2>
                <p className="text-gray-400 text-lg">
                  Test different investment allocations and see how your portfolio performs.
                </p>
              </div>
              <PortfolioSimulator stocks={stocks.map(s => s.symbol)} />
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">📈 Stock Comparison</h2>
                <p className="text-gray-400 text-lg">
                  Compare multiple stocks side-by-side to make informed investment decisions.
                </p>
              </div>

              {stocks.length > 1 ? (
                <div className="space-y-8">
                  {(() => {
                    const comparisonStocks = stocks.slice(0, 6).map((stock, index) => ({
                      symbol: stock.symbol,
                      data: allHistoricalData[stock.symbol] || [],
                      color: CHART_COLORS[index % CHART_COLORS.length],
                    }));
                    console.log('Comparison chart data:', comparisonStocks.map(s => ({ symbol: s.symbol, dataPoints: s.data.length })));
                    return (
                      <ComparisonChart
                        stocks={comparisonStocks}
                        title="Stock Performance Comparison (Normalized Returns)"
                        height={500}
                      />
                    );
                  })()}

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
                    <h3 className="text-2xl font-semibold text-white mb-6">📊 Performance Summary</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Change</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Market Cap</th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P/E Ratio</th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                          {stocks.map((stock) => (
                            <tr key={stock.symbol} className="hover:bg-gray-700">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-white">{stock.symbol}</div>
                                <div className="text-sm text-gray-400">{stock.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                                ${stock.price.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                  stock.changePercent >= 0
                                    ? 'bg-green-900 text-green-300'
                                    : 'bg-red-900 text-red-300'
                                }`}>
                                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {stock.marketCap ? `$${(stock.marketCap / 1e9).toFixed(1)}B` : 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {stock.pe ? stock.pe.toFixed(2) : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Add Multiple Stocks for Comparison</h3>
                  <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                    Enter multiple stock symbols in the sidebar (separated by commas) to compare their performance side-by-side.
                  </p>
                  <div className="text-sm text-gray-500">
                    💡 Example: AAPL, MSFT, TSLA, GOOGL, NVDA
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
