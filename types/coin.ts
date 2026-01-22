/**
 * Global Coin interface for use across all pages
 * This interface matches the API response structure from the backend
 */

export interface Coin {
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
  max_supply: number | null;
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

/**
 * Extended coin interface for coin detail pages
 * Includes additional fields like description, links, and color
 */
export interface CoinDetail extends Coin {
  // Additional fields for detail view
  description?: string;
  website?: string;
  whitepaper?: string;
  github?: string;
  twitter?: string;
  // Price change periods (for detail view)
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
}

/**
 * Trending coin wrapper interface
 * Used for trending coins API response
 */
export interface CoinWrapper {
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
  };
}

