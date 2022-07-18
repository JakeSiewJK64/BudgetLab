/**
 * Time Created: 2:34:30 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenUtil {

	private String secretKey = "45F94C61FAC55EAFE98CA5F89151E";

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	private Date extractExpiration(String token) {
		try {
			return extractClaim(token, Claims::getExpiration);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claim = extractAllClaims(token);
		return claimsResolver.apply(claim);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public String generateToken(UserDetails userModel) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("username", userModel.getUsername());
		claims.put("roles", userModel.getAuthorities());
		return createToken(claims, userModel.getUsername());
	}

	public String createToken(Map<String, Object> claim, String subject) {
		return Jwts.builder().setClaims(claim).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, secretKey).compact();
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
