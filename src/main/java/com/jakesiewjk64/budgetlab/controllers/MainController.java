/**
 * Time Created: 3:37:49 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.budgetlab.models.UserToRoleModel;
import com.jakesiewjk64.budgetlab.repository.UserRoleRepository;

@RestController
@RequestMapping("/")
public class MainController {

	@Autowired
	private UserRoleRepository userRoleRepository;

	@GetMapping("/hello")
	private String hello() {
		return "hello";
	}

	@GetMapping("/getusertorolemodel")
	private List<UserToRoleModel> getUserToRoleModel() {
		return userRoleRepository.findAll();
	}

	@GetMapping("/getusertorolemodelsById/{id}")
	private List<UserToRoleModel> getUserToRoleModel(@PathVariable long id) {
		return userRoleRepository.findUserRolesById(id);
	}
}
