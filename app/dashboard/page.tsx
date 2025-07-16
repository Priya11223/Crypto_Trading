"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  User,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

// Mock data for cryptocurrencies
const cryptoData = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 43250.8,
    change24h: 2.45,
    marketCap: "847.2B",
    volume: "28.4B",
    icon: "₿",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2580.45,
    change24h: -1.23,
    marketCap: "310.1B",
    volume: "15.2B",
    icon: "Ξ",
  },
  {
    id: 3,
    name: "Binance Coin",
    symbol: "BNB",
    price: 315.67,
    change24h: 3.78,
    marketCap: "48.7B",
    volume: "1.8B",
    icon: "⬡",
  },
  {
    id: 4,
    name: "Solana",
    symbol: "SOL",
    price: 98.32,
    change24h: 5.42,
    marketCap: "42.1B",
    volume: "2.1B",
    icon: "◎",
  },
  {
    id: 5,
    name: "Cardano",
    symbol: "ADA",
    price: 0.485,
    change24h: -2.15,
    marketCap: "17.2B",
    volume: "890M",
    icon: "₳",
  },
  {
    id: 6,
    name: "Polygon",
    symbol: "MATIC",
    price: 0.892,
    change24h: 4.67,
    marketCap: "8.3B",
    volume: "456M",
    icon: "⬟",
  },
]

// Mock user portfolio data
const portfolioData = [
  { symbol: "BTC", amount: 0.5432, value: 23456.78, change: 2.45 },
  { symbol: "ETH", amount: 8.234, value: 21245.67, change: -1.23 },
  { symbol: "SOL", amount: 125.67, value: 12356.89, change: 5.42 },
  { symbol: "ADA", amount: 15420.5, value: 7478.94, change: -2.15 },
]

export default function CryptoDashboard() {
  const {user} = useAuth();
  const [showBalance, setShowBalance] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalChange = portfolioData.reduce((sum, item) => sum + (item.value * item.change) / 100, 0)
  const totalChangePercent = (totalChange / totalPortfolioValue) * 100

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if(!user) return(
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/favicon.png" alt="TradeKaro Logo" className="w-8 h-8 mr-3" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                TradeKaro
              </h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search cryptocurrencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-900" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Portfolio Overview</h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">Total Balance</p>
                  <p className="text-3xl font-bold text-white">
                    {showBalance
                      ? `$${totalPortfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : "••••••••"}
                  </p>
                  <div className="flex items-center mt-1">
                    {totalChangePercent >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${totalChangePercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {showBalance ? `${totalChangePercent >= 0 ? "+" : ""}${totalChangePercent.toFixed(2)}%` : "••••"}
                    </span>
                    <span className="text-slate-400 text-sm ml-2">
                      {showBalance ? `(${totalChange >= 0 ? "+" : ""}$${totalChange.toFixed(2)})` : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Wallet className="w-5 h-5 text-yellow-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assets</span>
                  <span className="text-white">{portfolioData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Best Performer</span>
                  <span className="text-green-500">SOL +5.42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Worst Performer</span>
                  <span className="text-red-500">ADA -2.15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="mb-8">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Your Holdings</h2>
            <div className="space-y-4">
              {portfolioData.map((holding) => (
                <div key={holding.symbol} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-slate-900 font-bold text-sm">{holding.symbol}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{holding.symbol}</p>
                      <p className="text-slate-400 text-sm">
                        {holding.amount.toFixed(4)} {holding.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      {showBalance
                        ? `$${holding.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : "••••••"}
                    </p>
                    <div className="flex items-center justify-end">
                      {holding.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${holding.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {holding.change >= 0 ? "+" : ""}
                        {holding.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Market Overview</h2>
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-slate-400 text-sm">Live Prices</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Asset</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Price</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">24h Change</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Market Cap</th>
                  <th className="text-right py-3 px-4 text-slate-400 font-medium">Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrypto.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-slate-900 font-bold text-xs">{crypto.icon}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{crypto.name}</p>
                          <p className="text-slate-400 text-sm">{crypto.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <p className="text-white font-medium">
                        ${crypto.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className={`${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {crypto.change24h >= 0 ? "+" : ""}
                          {crypto.change24h}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-300">${crypto.marketCap}</td>
                    <td className="py-4 px-4 text-right text-slate-300">${crypto.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
