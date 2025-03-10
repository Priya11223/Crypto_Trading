package com.trading.controller;

import com.trading.entity.Asset;
import com.trading.entity.User;
import com.trading.service.AssetService;
import com.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

    @Autowired
    private AssetService assetService;
    @Autowired
    private UserService userService;

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long assetId) throws Exception {
        Asset asset = assetService.getAssetById(assetId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping("/coin/{coinId}/user")
    public ResponseEntity<Asset> getAssetByUserIdAndCoin(@PathVariable String coinId) throws Exception {
        User user = userService.findUserByJwt("jwt");
        Asset asset = assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
        return ResponseEntity.ok().body(asset);
    }

    @GetMapping()
    public ResponseEntity<List<Asset>> getAssetsForUser() throws Exception {
        User user = userService.findUserByJwt("jwt");
        List<Asset> assets = assetService.getUsersAsset(user.getId());
        return ResponseEntity.ok().body(assets);
    }

}
