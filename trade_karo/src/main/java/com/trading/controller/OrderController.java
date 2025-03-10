package com.trading.controller;

import com.trading.domain.OrderType;
import com.trading.entity.Coin;
import com.trading.entity.Order;
import com.trading.entity.User;
import com.trading.requests.CreateOrderRequest;
import com.trading.service.CoinService;
import com.trading.service.OrderService;
import com.trading.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestBody CreateOrderRequest req) throws Exception {
        User user = userService.findUserByJwt("jwt");
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long orderId
    ) throws Exception {

        User user = userService.findUserByJwt("jwt");

        Order order = orderService.getOrderById(orderId);
        if(order.getUser().getId().equals(user.getId())){
            return ResponseEntity.ok(order);
        }else{
            throw new Exception("you don't have access");
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrderForUser(@RequestParam(required = false) OrderType order_type,
                                                          @RequestParam(required = false) String asset_symbol) throws Exception {
        Long userId = userService.findUserByJwt("jwt").getId();

        List<Order> userOrders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);
        return ResponseEntity.ok(userOrders);

    }
}
