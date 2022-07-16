/**
 * Time Created: 12:03:18 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.jakesiewjk64.budgetlab.filters.JwtRequestFilter;
import com.jakesiewjk64.budgetlab.repository.UserRoleRepository;

@EnableWebSecurity
public class SecurityConfigurer {

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private UserRoleRepository userRoleRepository;

    private final String[] PUBLIC_PATHS = new String[] {
            "/auth/**",
            "/hello"
    };

    private final String[] ADMIN_PATHS = new String[] {
        "/admindashboard"
    };

    private final String[] AUTHENTICATED_PATHS = new String[] {
            "/userdashboard"
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        String[] admin = userRoleRepository.findRoleByName("Admin");
        String[] user = userRoleRepository.findRoleByName("User");

        http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers(PUBLIC_PATHS).permitAll()
                .antMatchers(ADMIN_PATHS).hasAnyAuthority(admin)
                .antMatchers(AUTHENTICATED_PATHS).hasAnyAuthority(user)
                .anyRequest()
                .authenticated();
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
