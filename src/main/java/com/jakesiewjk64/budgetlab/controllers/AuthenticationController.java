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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.budgetlab.dto.AuthenticationRequestDto;
import com.jakesiewjk64.budgetlab.dto.AuthenticationResponseDto;
import com.jakesiewjk64.budgetlab.dto.ErrorResponseDto;
import com.jakesiewjk64.budgetlab.dto.RegisterResponseDto;
import com.jakesiewjk64.budgetlab.models.UserModel;
import com.jakesiewjk64.budgetlab.repository.UserRepository;
import com.jakesiewjk64.budgetlab.services.JwtUserDetailsService;
import com.jakesiewjk64.budgetlab.utils.JwtTokenUtil;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private void authenticateUser(String username, String password) throws Exception {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				username, password));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerToken(@RequestBody UserModel request) {
		try {
			UserModel user = userRepository.findUserByUsername(request.getUsername());
			if (user != null) {
				return ResponseEntity.status(403).body(
						new RegisterResponseDto(0l, "This username is taken.", ""));
			}
			user = new UserModel(request);
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			user = userRepository.save(user);
			authenticateUser(request.getUsername(), request.getPassword());
			final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(user.getUsername());
			final String jwt = jwtTokenUtil.generateToken(userDetails);
			return ResponseEntity.ok(new RegisterResponseDto(user.getId(),
					"Registration Successful for user " + request.getUsername(), jwt));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new ErrorResponseDto(e.getMessage(), e.toString()));
		}
	}

	@PostMapping("/authenticate")
	public ResponseEntity<?> createToken(@RequestBody AuthenticationRequestDto authenticationRequest) throws Exception {
		try {
			authenticateUser(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		} catch (Exception e) {
			return ResponseEntity.status(403).body(
					new ErrorResponseDto(
							e.getMessage(),
							e.toString()));
		}
		final UserDetails user = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		final String jwtToken = jwtTokenUtil.generateToken(user);
		return ResponseEntity.ok(new AuthenticationResponseDto(jwtToken));
	}
}
