/**
 * Time Created: 2:31:48 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jakesiewjk64.budgetlab.services.JwtUserDetailsService;
import com.jakesiewjk64.budgetlab.utils.JwtTokenUtil;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
  private JwtUserDetailsService jwtUserDetailsService;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    final String authorizeHeader = request.getHeader("Authorization");
    String username = null;
    String jwt = null;

    if (authorizeHeader != null && authorizeHeader.startsWith("Bearer")) {
      jwt = authorizeHeader.substring(7);
      username = jwtTokenUtil.extractUsername(jwt);
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
      if (jwtTokenUtil.validateToken(jwt, userDetails)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken
            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      }
    }
    /**
     * ? HANDING CONTROL TO NEXT FILTER CHAIN (SPRING SECURITY)
     */
    filterChain.doFilter(request, response);
  }
}
