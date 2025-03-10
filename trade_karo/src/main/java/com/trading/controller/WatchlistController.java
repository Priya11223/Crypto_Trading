package com.trading.controller;

import com.trading.entity.Coin;
import com.trading.entity.User;
import com.trading.entity.Watchlist;
import com.trading.service.CoinService;
import com.trading.service.UserService;
import com.trading.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {
    @Autowired
    private WatchlistService watchlistService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<?> getUserWatchlist() throws Exception {
        User user = userService.findUserByJwt("jwt");
        Watchlist watchlist = watchlistService.findUserWatchlist(user.getId());
        return ResponseEntity.ok(watchlist);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createWatchlist() throws Exception {
        User user = userService.findUserByJwt("jwt");
        Watchlist createdW = watchlistService.createWatchlist(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdW);
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<?> getWatchlistById(@PathVariable Long watchlistId) throws Exception {
        Watchlist watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);
    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<?> addItemToWatchlist(@PathVariable String coinId) throws Exception {
        User user = userService.findUserByJwt("jwt");
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchlistService.addItemToWatchList(coin, user);
        return ResponseEntity.ok(addedCoin);

    }
}
