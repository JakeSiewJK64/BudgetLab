/**
 * Time Created: 3:37:49 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class MainController {

	@GetMapping("/hello")
	private String hello() {
		return "hello";
	}
}
