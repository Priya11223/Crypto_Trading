package com.trading;

import jakarta.annotation.PreDestroy;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class TradeKaroApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradeKaroApplication.class, args);
	}
}
