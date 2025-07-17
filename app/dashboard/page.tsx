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
  Eye,
  EyeOff,
  BookmarkPlus,
  Flame,
} from "lucide-react"
import { useAuth } from "../context/AuthContext"

// Mock data for top 50 cryptocurrencies (showing first 20 for demo)
const top50Coins = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 43250.8, change24h: 2.45, icon: "₿" },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 2580.45, change24h: -1.23, icon: "Ξ" },
  { id: 3, name: "Binance Coin", symbol: "BNB", price: 315.67, change24h: 3.78, icon: "⬡" },
  { id: 4, name: "Solana", symbol: "SOL", price: 98.32, change24h: 5.42, icon: "◎" },
  { id: 5, name: "Cardano", symbol: "ADA", price: 0.485, change24h: -2.15, icon: "₳" },
  { id: 6, name: "Polygon", symbol: "MATIC", price: 0.892, change24h: 4.67, icon: "⬟" },
  { id: 7, name: "Chainlink", symbol: "LINK", price: 14.23, change24h: 1.89, icon: "⬢" },
  { id: 8, name: "Litecoin", symbol: "LTC", price: 72.45, change24h: -0.56, icon: "Ł" },
  { id: 9, name: "Polkadot", symbol: "DOT", price: 5.67, change24h: 3.21, icon: "●" },
  { id: 10, name: "Avalanche", symbol: "AVAX", price: 24.89, change24h: 6.78, icon: "▲" },
  { id: 11, name: "Uniswap", symbol: "UNI", price: 6.45, change24h: -1.45, icon: "🦄" },
  { id: 12, name: "Cosmos", symbol: "ATOM", price: 8.92, change24h: 2.34, icon: "⚛" },
  { id: 13, name: "Algorand", symbol: "ALGO", price: 0.234, change24h: 4.56, icon: "◊" },
  { id: 14, name: "VeChain", symbol: "VET", price: 0.0234, change24h: -3.21, icon: "V" },
  { id: 15, name: "Stellar", symbol: "XLM", price: 0.123, change24h: 1.78, icon: "✦" },
]

// Mock data for trending coins
const trendingCoins = [
  { id: 1, name: "Pepe", symbol: "PEPE", price: 0.00000123, change24h: 45.67, rank: 1, icon: "🐸" },
  { id: 2, name: "Shiba Inu", symbol: "SHIB", price: 0.0000089, change24h: 23.45, rank: 2, icon: "🐕" },
  { id: 3, name: "Dogecoin", symbol: "DOGE", price: 0.078, change24h: 12.34, rank: 3, icon: "🐶" },
  { id: 4, name: "Floki", symbol: "FLOKI", price: 0.000034, change24h: 34.56, rank: 4, icon: "🚀" },
  { id: 5, name: "SafeMoon", symbol: "SAFEMOON", price: 0.00012, change24h: 67.89, rank: 5, icon: "🌙" },
  { id: 6, name: "Baby Doge", symbol: "BABYDOGE", price: 0.0000000234, change24h: 89.12, rank: 6, icon: "👶" },
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
  const [currentSlide, setCurrentSlide] = useState(0)

  if(user == null){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-4">
          <svg
            className="animate-spin h-8 w-8 text-red-600"
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
          <p className="text-lg font-medium text-gray-700">Logging you in via Google...</p>
        </div>
      </div>
    );
 } 

  const coinsPerSlide = 5
  const totalSlides = Math.ceil(top50Coins.length / coinsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentSlideCoins = () => {
    const startIndex = currentSlide * coinsPerSlide
    return top50Coins.slice(startIndex, startIndex + coinsPerSlide)
  }

  const handleWatchlistClick = () => {
    console.log("Watchlist clicked")
  }

  const handleWalletClick = () => {
    console.log("Wallet clicked")
  }

  const handleSettingsClick = () => {
    console.log("Settings clicked")
  }

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

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleWatchlistClick}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                title="Watchlist"
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>

              <button
                onClick={handleWalletClick}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                title="Wallet"
              >
                <Wallet className="w-5 h-5" />
              </button>

              <button
                onClick={handleSettingsClick}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 ml-4">
              {user?.pic ? (
                  <img
                    src={user.pic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-900" />
                  </div>
              )}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 50 Coins Slider */}
        <div className="mb-8">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Top 50 Cryptocurrencies</h2>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="flex space-x-4 pb-4" style={{ width: `${top50Coins.length * 200}px` }}>
                {top50Coins.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex-shrink-0 w-48 bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-slate-900 font-bold text-xs">{coin.icon}</span>
                      </div>
                      <button
                        onClick={() => console.log(`Add ${coin.symbol} to watchlist`)}
                        className="p-1 text-slate-400 hover:text-yellow-500 transition-colors"
                        title={`Add ${coin.name} to watchlist`}
                      >
                        <BookmarkPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{coin.symbol}</p>
                      <p className="text-slate-400 text-xs mb-2">{coin.name}</p>
                      <p className="text-white font-semibold">
                        ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center mt-1">
                        {coin.change24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {coin.change24h >= 0 ? "+" : ""}
                          {coin.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trending Coins */}
        <div className="mb-8">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center mb-6">
              <Flame className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Trending Coins</h2>
              <div className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">Hot</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="bg-gradient-to-r from-slate-700/30 to-slate-700/20 rounded-lg p-4 hover:from-slate-700/40 hover:to-slate-700/30 transition-all duration-200 cursor-pointer border border-orange-500/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-200">
                          <span className="text-white font-bold text-xs drop-shadow-sm">#{coin.rank}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-slate-900 font-bold text-xs">{coin.icon}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => console.log(`Add ${coin.symbol} to watchlist`)}
                      className="p-1 text-slate-400 hover:text-yellow-500 transition-colors"
                      title={`Add ${coin.name} to watchlist`}
                    >
                      <BookmarkPlus className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-medium">{coin.symbol}</p>
                    <p className="text-slate-400 text-sm mb-2">{coin.name}</p>
                    <p className="text-white font-semibold">
                      ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 })}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-semibold">+{coin.change24h}%</span>
                      <span className="text-xs text-slate-400 ml-2">24h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Holdings */}
        <div className="mb-8">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Holdings</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              >
                {showBalance ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                <span className="text-sm">{showBalance ? "Hide" : "Show"} Balance</span>
              </button>
            </div>
            <div className="space-y-4">
              {portfolioData.map((holding) => (
                <div
                  key={holding.symbol}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/40 transition-colors"
                >
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
      </div>
    </div>
  )
}
