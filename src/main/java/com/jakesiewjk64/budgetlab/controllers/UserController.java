/**
 * Time Created: 2:26:03 PM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.budgetlab.dto.ErrorResponseDto;
import com.jakesiewjk64.budgetlab.dto.UserDto;
import com.jakesiewjk64.budgetlab.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable long id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @GetMapping("/getAllUser/")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping("/upsertUser")
    public ResponseEntity<?> upsertUser(@RequestBody UserDto user) {
        try {
            return ResponseEntity.ok().body(userService.upsertUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(
                    new ErrorResponseDto(e.getMessage(), e.toString()));
        }
    }
}
