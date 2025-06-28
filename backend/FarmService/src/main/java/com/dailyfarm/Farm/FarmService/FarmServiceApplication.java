package com.dailyfarm.Farm.FarmService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class FarmServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmServiceApplication.class, args);
	}

}
