/**
 * Time Created: 12:06:01 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.budgetlab.models.UserModel;
import com.jakesiewjk64.budgetlab.models.UserToRoleModel;
import com.jakesiewjk64.budgetlab.repository.UserRepository;
import com.jakesiewjk64.budgetlab.repository.UserRoleBridgeRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleBridgeRepository userRoleBridgeRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserModel user = userRepository.findUserByUsername(username);
		List<GrantedAuthority> authorityList = new ArrayList<>();
		List<UserToRoleModel> roles = userRoleBridgeRepository.findUserRolesById(user.getId());

		if (roles.size() == 0) {
			authorityList.add(new SimpleGrantedAuthority(userRoleBridgeRepository.findRoleHashByName("User")[0]));
		} else {
			for (UserToRoleModel r : roles) {
				authorityList.add(new SimpleGrantedAuthority(r.getUserRole().getRolehash()));
			}
		}
		return new User(user.getUsername(), user.getPassword(), authorityList);
	}
}
