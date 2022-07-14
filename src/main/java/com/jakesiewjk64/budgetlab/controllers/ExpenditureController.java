/**
 * Time Created: 3:57:37 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expense")
public class ExpenditureController {

	@GetMapping("/getExpenses")
	public String getExpenses() {
		return "my expense";
	}
}
