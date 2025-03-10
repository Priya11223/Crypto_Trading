package com.trading.service;

import com.trading.entity.Coin;
import com.trading.entity.User;
import com.trading.entity.Watchlist;

public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;
    Watchlist createWatchlist(User user);
    Watchlist findById(Long id) throws Exception;
    Coin addItemToWatchList(Coin coin, User user) throws Exception;
}
