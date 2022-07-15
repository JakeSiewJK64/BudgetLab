package com.jakesiewjk64.budgetlab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class BudgetlabApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgetlabApplication.class, args);
	}

}
