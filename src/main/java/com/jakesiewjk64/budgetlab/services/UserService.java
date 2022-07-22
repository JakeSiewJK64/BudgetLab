/**
 * Time Created: 2:28:19 PM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.budgetlab.dao.UserDao;
import com.jakesiewjk64.budgetlab.dto.UserDto;
import com.jakesiewjk64.budgetlab.models.UserModel;
import com.jakesiewjk64.budgetlab.repository.UserRoleBridgeRepository;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserRoleBridgeRepository userRoleBridgeRepository;

    public UserDto getUserById(long id) {
        UserModel user = userDao.get(id).get();
        String[] role = userRoleBridgeRepository.findUserRoleByUserId(id);
        return new UserDto(user.getUsername(), user.getId(), role, user.getFirstName(), user.getLastName(),
                user.getJoinedDate());
    }

    public UserDto getUserByUsername(String username) {
        UserModel user = userDao.getUserByUsername(username);
        String role[] = userRoleBridgeRepository.findUserRoleByUserId(user.getId());
        return new UserDto(user.getUsername(), user.getId(), role, user.getFirstName(), user.getLastName(),
                user.getJoinedDate());
    }

    public Collection<UserModel> getAllUsers() {
        return userDao.getAll();
    }

    public int upsertUser(UserModel user) {
        return userDao.save(user);
    }
}
