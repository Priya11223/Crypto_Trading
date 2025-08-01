"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
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

interface CoinWrapper {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: number;
      price_btc: string;
      price_change_percentage_24h: {
        [currency: string]: number;
      };
      market_cap: number;
      market_cap_btc: string;
      total_volume: string;
      total_volume_btc: string;
      sparkline: string;
      content: string | null;
    };
  }
}

// Mock user portfolio data
const portfolioData = [
  { symbol: "BTC", amount: 0.5432, value: 23456.78, change: 2.45 },
  { symbol: "ETH", amount: 8.234, value: 21245.67, change: -1.23 },
  { symbol: "SOL", amount: 125.67, value: 12356.89, change: 5.42 },
  { symbol: "ADA", amount: 15420.5, value: 7478.94, change: -2.15 },
]

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; 
  atl: number;
  atl_change_percentage: number;
  atl_date: string; 
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string; 
}

export default function CryptoDashboard() {
  const {user} = useAuth();
  const [showBalance, setShowBalance] = useState(true)
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [top50, setTop50] = useState<CoinData[]>([])
  const [trendingCoins, setTrendingCoins] = useState<CoinWrapper[]>([])

  const hero2 = () => {
    console.log("This the hero2 funtion here: ");
  }

  useEffect(() => {
    const fetchTop50Coins = async () => {
      try {
        const response = await axios.get<CoinData[]>('http://localhost:8080/coins/top50');
        setTop50(response.data);
      } catch (error) {
        console.error("Error fetching top 50 coins:", error);
      }
    };

    async function fetchTrendingCoins() {
      try{
        const res = await axios.get('http://localhost:8080/coins/trending');
        setTrendingCoins(res.data.coins.slice(0, 9));
        console.log(trendingCoins); // not res.data
      }catch (error){
        console.error("Error fetching trending coins: ", error);
      }
    }

    if (user) {
      fetchTop50Coins();
      fetchTrendingCoins();
    }
  }, [user]);

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
          <p className="text-lg font-medium text-gray-700">Loading</p>
        </div>
      </div>
    );
 } 

  const coinsPerSlide = 5
  const totalSlides = Math.ceil(top50.length / coinsPerSlide)

  const handleCoinClick = (coin: CoinData) => {
    // Replace this with your desired action
    console.log("Coin clicked:", coin);
  };

  const addToWishlist = async (id: string) => {
    try{
      const token = user.jwt;
      const response = await axios.patch(`http://localhost:8080/api/wishlist/add/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
    }catch (err){
      console.log("Error adding coin to list: " + err);
    }
  } 

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleWatchlistClick = () => {
    router.push("/home/wishlist")
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
        {/* Top 10 Coins Slider */}
        <div className="mb-8">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Top 10 Cryptocurrencies</h2>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
              <div className="flex space-x-4 pb-4">
                {top50.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleCoinClick(coin)}
                    className="flex-shrink-0 w-48 bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/40 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <button
                        onClick={() => addToWishlist(coin.id)}
                        className="p-1 text-slate-400 hover:text-yellow-500 transition-colors"
                        title={`Add ${coin.name} to watchlist`}
                      >
                        <BookmarkPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{coin.symbol.toUpperCase()}</p>
                      <p className="text-slate-400 text-xs mb-2">{coin.name}</p>
                      <p className="text-white font-semibold">
                        ${coin.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center mt-1">
                        {coin.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                          {coin.price_change_percentage_24h.toFixed(2)}%
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
                  key={coin.item.id}
                  className="bg-gradient-to-r from-slate-700/30 to-slate-700/20 rounded-lg p-4 hover:from-slate-700/40 hover:to-slate-700/30 transition-all duration-200 cursor-pointer border border-orange-500/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="relative mr-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-200">
                          <span className="text-white font-bold text-xs drop-shadow-sm">#{coin.item.market_cap_rank}</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r rounded-full flex items-center justify-center">
                      <img src={coin.item.small} alt={coin.item.name} className="w-8 h-8 rounded-full" />
                      </div>
                    </div>
                    <button
                      onClick={() => addToWishlist(coin.item.id)}
                      className="p-1 text-slate-400 hover:text-yellow-500 transition-colors"
                      title={`Add ${coin.item.name} to watchlist`}
                    >
                      <BookmarkPlus className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white font-medium">{coin.item.symbol}</p>
                    <p className="text-slate-400 text-sm mb-2">{coin.item.name}</p>
                    <p className="text-white font-semibold">
                      ${coin.item.data.price.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 })}
                    </p>
                    <div className="flex items-center mt-2">
                      {coin.item.data.price_change_percentage_24h.usd >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                     <span className={`text-xs ${coin.item.data.price_change_percentage_24h.usd >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {coin.item.data.price_change_percentage_24h.usd >= 0 ? "+" : ""}
                          {coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </span>
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
