package com.trading.service;

import com.trading.domain.OrderType;
import com.trading.entity.Coin;
import com.trading.entity.Order;
import com.trading.entity.OrderItem;
import com.trading.entity.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

}
