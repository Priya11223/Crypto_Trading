"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Copy,
  Check,
  Bell,
  Share2,
  BarChart3,
  Activity,
  DollarSign,
  Layers,
  Clock,
  Globe,
  FileText,
  Github,
  Twitter,
  ChevronUp,
  ChevronDown,
  Zap,
  Target,
  PieChart,
} from "lucide-react"
import { CoinDetail } from "@/types/coin"
import axios from "axios"
import CoinLoading from "./loading"

export default function CoinDetailPage() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract coin ID from pathname or params
  // Handle both /coin/id and /home/coin/id patterns
  const coinId = (params.id as string) || pathname.split('/').filter(Boolean).pop() || ''
  const [coin, setCoin] = useState<CoinDetail | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Convert mock data structure to CoinDetail format for type safety
  useEffect(() => {
    console.log("UseEffect trigerred for coin -" + coinId);
    const getCoinDetail = async () => {
      try {
        setLoading(true)
        const res = await axios.get<CoinDetail>(`http://localhost:8080/coins/${coinId}`);
        setCoin(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching coin:", error);
      } finally {
        setLoading(false)
      }
    }

    getCoinDetail();
  }, [coinId])

  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "markets" | "historical">("overview")
  const [chartPeriod, setChartPeriod] = useState("24h")

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toLocaleString()}`
  }

  const formatSupply = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    return num.toLocaleString()
  }

  // Show loading state
  if (loading || !coin) {
    return <CoinLoading />
  }

  // After this point, TypeScript knows coin is defined
  const copyToClipboard = () => {
    navigator.clipboard.writeText(coin.name)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Mock chart data points
  const chartPoints = Array.from({ length: 24 }, (_, i) => ({
    x: i,
    y: coin.current_price * (1 + (Math.random() - 0.5) * 0.1),
  }))

  const maxY = Math.max(...chartPoints.map((p) => p.y))
  const minY = Math.min(...chartPoints.map((p) => p.y))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: "#FFD700" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 animate-pulse"
          style={{ backgroundColor: "#FFD700", animationDelay: "1s" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-10 h-10 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-12"
                />
                <div>
                  <h1 className="text-white font-semibold flex items-center">
                    {coin.name}
                    <span className="ml-2 px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                      #{coin.market_cap_rank}
                    </span>
                  </h1>
                  <p className="text-slate-400 text-sm">{coin.symbol}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isWatchlisted
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Star className={`w-5 h-5 ${isWatchlisted ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Price Hero Section */}
        <div className="mb-8 group">
          <div
            className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 transition-all duration-500 hover:border-opacity-100 hover:shadow-2xl relative overflow-hidden"
            style={{ borderColor: `${"#FFD700"}30` }}
          >
            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${"#FFD700"}, transparent 70%)`,
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Price Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Current Price</p>
                  <div className="flex items-baseline space-x-4">
                    <h2 className="text-5xl font-bold text-white transition-all duration-300 group-hover:scale-105 origin-left">
                      ${coin.current_price.toLocaleString()}
                    </h2>
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${
                        coin.price_change_percentage_24h >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* Price Change Periods */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "24h", value: coin.price_change_percentage_24h },
                    { label: "7d", value: coin.price_change_percentage_7d || 0 },
                    { label: "30d", value: coin.price_change_percentage_30d || 0 },
                  ].map((period) => (
                    <div
                      key={period.label}
                      className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 cursor-pointer"
                    >
                      <p className="text-slate-400 text-xs mb-1">{period.label} Change</p>
                      <p className={`font-semibold ${period.value >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {period.value >= 0 ? "+" : ""}
                        {period.value.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </div>

                {/* 24h Range */}
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">24h Range</span>
                    <span className="text-slate-400">
                      ${coin.low_24h.toLocaleString()} - ${coin.high_24h.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                      style={{
                        width: `${((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100}%`,
                        background: `linear-gradient(90deg, ${"#FFD700"}80, ${"#FFD700"})`,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-125"
                      style={{
                        left: `${((coin.current_price - coin.low_24h) / (coin.high_24h - coin.low_24h)) * 100}%`,
                        transform: `translateX(-50%) translateY(-50%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-red-400 flex items-center">
                      <ChevronDown className="w-3 h-3" /> Low
                    </span>
                    <span className="text-green-400 flex items-center">
                      High <ChevronUp className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Right - Mini Chart */}
              <div className="relative">
                <div className="bg-slate-700/30 rounded-xl p-4 h-full min-h-[250px] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" style={{ color: "#FFD700" }} />
                      Price Chart
                    </h3>
                    <div className="flex space-x-1">
                      {["24h", "7d", "30d", "1y"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setChartPeriod(period)}
                          className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
                            chartPeriod === period
                              ? "text-white"
                              : "text-slate-400 hover:text-white hover:bg-slate-600/50"
                          }`}
                          style={chartPeriod === period ? { backgroundColor: `${"#FFD700"}40` } : {}}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="flex-1 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`gradient-${coin.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={"#FFD700"} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={"#FFD700"} stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area fill */}
                      <path
                        d={`M 0 ${50 - ((chartPoints[0].y - minY) / (maxY - minY)) * 50} ${chartPoints
                          .map((p, i) => `L ${(i / (chartPoints.length - 1)) * 100} ${50 - ((p.y - minY) / (maxY - minY)) * 50}`)
                          .join(" ")} L 100 50 L 0 50 Z`}
                        fill={`url(#gradient-${coin.id})`}
                        className="transition-all duration-500"
                      />

                      {/* Line */}
                      <path
                        d={`M 0 ${50 - ((chartPoints[0].y - minY) / (maxY - minY)) * 50} ${chartPoints
                          .map((p, i) => `L ${(i / (chartPoints.length - 1)) * 100} ${50 - ((p.y - minY) / (maxY - minY)) * 50}`)
                          .join(" ")}`}
                        fill="none"
                        stroke={"#FFD700"}
                        strokeWidth="0.5"
                        className="transition-all duration-500"
                      />
                    </svg>

                    {/* Hover indicator */}
                    <div
                      className="absolute bottom-0 right-4 w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: "#FFD700" }}
                    />
                    <div
                      className="absolute bottom-0 right-4 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#FFD700" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: "Market Cap", value: formatNumber(coin.market_cap), color: "#10B981" },
            { icon: Activity, label: "24h Volume", value: formatNumber(coin.total_volume), color: "#3B82F6" },
            { icon: Layers, label: "Circulating Supply", value: formatSupply(coin.circulating_supply), color: "#F59E0B" },
            { icon: Target, label: "Max Supply", value: coin.max_supply ? formatSupply(coin.max_supply) : "Unlimited", color: "#8B5CF6" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <Zap className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
              <p className="text-white font-semibold text-lg">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ATH / ATL Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* All Time High */}
          <div className="group bg-gradient-to-br from-green-500/10 to-slate-800/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 transition-all duration-500 hover:border-green-500/40 hover:shadow-xl hover:shadow-green-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">All Time High</h3>
                  <p className="text-slate-400 text-sm">{coin.ath_date}</p>
                </div>
              </div>
              <ChevronUp className="w-6 h-6 text-green-400 transition-transform duration-300 group-hover:-translate-y-1" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">${coin.ath.toLocaleString()}</p>
            <p className="text-red-400 text-sm">
              {(((coin.current_price - coin.ath) / coin.ath) * 100).toFixed(2)}% from ATH
            </p>
          </div>

          {/* All Time Low */}
          <div className="group bg-gradient-to-br from-red-500/10 to-slate-800/60 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 transition-all duration-500 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">All Time Low</h3>
                  <p className="text-slate-400 text-sm">{coin.atl_date}</p>
                </div>
              </div>
              <ChevronDown className="w-6 h-6 text-red-400 transition-transform duration-300 group-hover:translate-y-1" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">${coin.atl.toLocaleString()}</p>
            <p className="text-green-400 text-sm">
              +{(((coin.current_price - coin.atl) / coin.atl) * 100).toFixed(2)}% from ATL
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-1 w-fit">
            {[
              { id: "overview", label: "Overview", icon: PieChart },
              { id: "markets", label: "Markets", icon: BarChart3 },
              { id: "historical", label: "Historical", icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-slate-700 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 transition-all duration-500">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">About {coin.name}</h3>
                <p className="text-slate-400 leading-relaxed">{coin.description}</p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Links</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Globe, label: "Website", href: coin.website },
                    { icon: FileText, label: "Whitepaper", href: coin.whitepaper },
                    { icon: Github, label: "GitHub", href: coin.github },
                    { icon: Twitter, label: "Twitter", href: coin.twitter },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300 hover:scale-105 group"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Copy Name */}
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-300"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : `Copy ${coin.name}`}</span>
              </button>
            </div>
          )}

          {activeTab === "markets" && (
            <div className="animate-fadeIn">
              <h3 className="text-white font-semibold text-lg mb-4">{coin.name} Markets</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-400 text-sm border-b border-slate-700">
                      <th className="text-left py-3 px-4">Exchange</th>
                      <th className="text-right py-3 px-4">Pair</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-right py-3 px-4">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                    { exchange: "Binance", pair: `${coin.symbol}/USDT`, price: coin.current_price, volume: coin.total_volume * 0.3 },
                    { exchange: "Coinbase", pair: `${coin.symbol}/USD`, price: coin.current_price * 1.001, volume: coin.total_volume * 0.25 },
                    { exchange: "Kraken", pair: `${coin.symbol}/EUR`, price: coin.current_price * 0.92, volume: coin.total_volume * 0.15 },
                    { exchange: "KuCoin", pair: `${coin.symbol}/USDT`, price: coin.current_price * 0.999, volume: coin.total_volume * 0.1 },
                    ].map((market, index) => (
                      <tr
                        key={market.exchange}
                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="py-4 px-4 text-white font-medium">{market.exchange}</td>
                        <td className="py-4 px-4 text-right text-slate-300">{market.pair}</td>
                        <td className="py-4 px-4 text-right text-white">${market.price.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right text-slate-400">{formatNumber(market.volume)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "historical" && (
            <div className="animate-fadeIn">
              <h3 className="text-white font-semibold text-lg mb-4">Historical Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { period: "1 Week Ago", price: coin.current_price * 0.95, change: -5 },
                  { period: "1 Month Ago", price: coin.current_price * 0.88, change: -12 },
                  { period: "3 Months Ago", price: coin.current_price * 0.75, change: -25 },
                  { period: "6 Months Ago", price: coin.current_price * 0.65, change: -35 },
                  { period: "1 Year Ago", price: coin.current_price * 0.45, change: -55 },
                  { period: "2 Years Ago", price: coin.current_price * 0.3, change: -70 },
                ].map((data, index) => (
                  <div
                    key={data.period}
                    className="bg-slate-700/30 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50 hover:scale-105"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="text-slate-400 text-sm mb-1">{data.period}</p>
                    <p className="text-white font-semibold">${data.price.toLocaleString()}</p>
                    <p className="text-green-400 text-sm">+{Math.abs(data.change)}% since then</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
