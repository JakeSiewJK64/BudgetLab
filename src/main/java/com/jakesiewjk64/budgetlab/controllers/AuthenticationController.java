/**
 * Time Created: 3:56:00 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.budgetlab.dto.AuthenticationRequestDto;
import com.jakesiewjk64.budgetlab.dto.AuthenticationResponseDto;
import com.jakesiewjk64.budgetlab.dto.ErrorResponseDto;
import com.jakesiewjk64.budgetlab.models.UserModel;
import com.jakesiewjk64.budgetlab.repository.UserRepository;
import com.jakesiewjk64.budgetlab.utils.JwtTokenUtil;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@PostMapping("/authenticate")
	public ResponseEntity<?> createToken(@RequestBody AuthenticationRequestDto authenticationRequest) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					authenticationRequest.getUsername(), authenticationRequest.getPassword()));
		} catch (Exception e) {
			return ResponseEntity.status(403).body(
					new ErrorResponseDto(
							e.getMessage(),
							e.toString()));
		}
		final UserModel user = userRepository.findUserByUsername(authenticationRequest.getUsername());
		final String jwtToken = jwtTokenUtil.generateToken(user);
		return ResponseEntity.ok(new AuthenticationResponseDto(jwtToken));
	}
}
