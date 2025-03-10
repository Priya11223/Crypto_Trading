package com.trading.service;

import com.trading.entity.Asset;
import com.trading.entity.Coin;
import com.trading.entity.User;

import java.util.List;

public interface AssetService {
    Asset createAsset(User user, Coin coin, double quantity);

    Asset getAssetById(Long assetId) throws Exception;

    Asset getAssetByUserAndId(Long userId, Long assetId);

    List<Asset> getUsersAsset(Long userId);

    Asset updateAsset(Long assetId, double quantity) throws Exception;

    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);

    void deleteAsset(Long assetId);
}
