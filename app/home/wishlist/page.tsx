"use client"

import { useState } from "react"
import {
  Bitcoin,
  TrendingUp,
  TrendingDown,
  User,
  Wallet,
  Settings,
  Bell,
  Search,
  Star,
  BarChart3,
  Crown,
  Activity,
  DollarSign,
  Coins,
  ArrowLeft,
  Trash2,
} from "lucide-react"

// Mock wishlist data with comprehensive coin information
const wishlistCoins = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 43250.8,
    change24h: 2.45,
    icon: "₿",
    rank: 1,
    high24h: 44120.5,
    low24h: 42180.3,
    totalSupply: 21000000,
    totalVolume: 28450000000,
    altChange: 5.67,
    marketCap: 847500000000,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 2580.45,
    change24h: -1.23,
    icon: "Ξ",
    rank: 2,
    high24h: 2650.8,
    low24h: 2520.1,
    totalSupply: 120280000,
    totalVolume: 15230000000,
    altChange: -2.34,
    marketCap: 310450000000,
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    price: 98.32,
    change24h: 5.42,
    icon: "◎",
    rank: 4,
    high24h: 102.5,
    low24h: 94.8,
    totalSupply: 588000000,
    totalVolume: 2450000000,
    altChange: 8.91,
    marketCap: 57800000000,
  },
  {
    id: 4,
    name: "Cardano",
    symbol: "ADA",
    price: 0.485,
    change24h: -2.15,
    icon: "₳",
    rank: 8,
    high24h: 0.512,
    low24h: 0.468,
    totalSupply: 45000000000,
    totalVolume: 890000000,
    altChange: -1.78,
    marketCap: 17100000000,
  },
  {
    id: 5,
    name: "Polygon",
    symbol: "MATIC",
    price: 0.892,
    change24h: 4.67,
    icon: "⬟",
    rank: 12,
    high24h: 0.945,
    low24h: 0.834,
    totalSupply: 10000000000,
    totalVolume: 567000000,
    altChange: 6.23,
    marketCap: 8920000000,
  },
  {
    id: 6,
    name: "Chainlink",
    symbol: "LINK",
    price: 14.23,
    change24h: 1.89,
    icon: "⬢",
    rank: 15,
    high24h: 14.89,
    low24h: 13.67,
    totalSupply: 1000000000,
    totalVolume: 234000000,
    altChange: 3.45,
    marketCap: 14230000000,
  },
]

export default function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const wishlistCoins = useState();

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
    return num.toFixed(2)
  }

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(6)
    return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const handleShowGraph = (coinSymbol: string) => {
    console.log(`Show graph for ${coinSymbol}`)
  }

  const handleRemoveFromWishlist = (coinId: number) => {
    console.log(`Remove coin ${coinId} from wishlist`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 mr-4"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
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
                  placeholder="Search your wishlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                <Wallet className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 ml-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Star className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">My Wishlist</h1>
            <div className="ml-4 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
              {wishlistCoins.length} coins
            </div>
          </div>
          <p className="text-slate-400">Track your favorite cryptocurrencies and monitor their performance</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wishlistCoins.map((coin) => (
            <div
              key={coin.id}
              className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300 group"
              style={{ minHeight: "40vh" }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => handleRemoveFromWishlist(coin.id)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/20 active:bg-red-500/30 rounded-lg transition-all duration-200 z-10 cursor-pointer"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="relative z-10 h-full flex flex-col">
                {/* Header Section */}
                <div className="flex items-center mb-6">
                  <div className="relative mr-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl drop-shadow-sm">{coin.icon}</span>
                    </div>
                    {coin.rank <= 3 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-slate-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-xl font-bold text-white mr-2">{coin.name}</h3>
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                        #{coin.rank}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{coin.symbol}</p>
                  </div>
                </div>

                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-white">${formatPrice(coin.price)}</span>
                    <div className="flex items-center">
                      {coin.change24h >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-lg font-semibold ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {coin.change24h >= 0 ? "+" : ""}
                        {coin.change24h}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-slate-400">
                    <span className="mr-4">24h Alt: </span>
                    <span className={`font-medium ${coin.altChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {coin.altChange >= 0 ? "+" : ""}
                      {coin.altChange}%
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
                  {/* 24h High/Low */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Activity className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">24h Range</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">High:</span>
                        <span className="text-green-400 font-medium">${formatPrice(coin.high24h)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Low:</span>
                        <span className="text-red-400 font-medium">${formatPrice(coin.low24h)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Market Cap</span>
                    </div>
                    <div className="text-white font-semibold">${formatNumber(coin.marketCap)}</div>
                  </div>

                  {/* Total Volume */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <BarChart3 className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">24h Volume</span>
                    </div>
                    <div className="text-white font-semibold">${formatNumber(coin.totalVolume)}</div>
                  </div>

                  {/* Total Supply */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Coins className="w-4 h-4 text-orange-400 mr-2" />
                      <span className="text-xs text-slate-400 uppercase tracking-wider">Total Supply</span>
                    </div>
                    <div className="text-white font-semibold">{formatNumber(coin.totalSupply)}</div>
                  </div>
                </div>

                {/* Show Graph Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleShowGraph(coin.symbol)}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Show Graph
                  </button>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-orange-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Empty State (if no coins) */}
        {wishlistCoins.length === 0 && (
          <div className="text-center py-16">
            <Star className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">Your wishlist is empty</h3>
            <p className="text-slate-500">Start adding coins to track your favorites</p>
          </div>
        )}
      </div>
    </div>
  )
}
