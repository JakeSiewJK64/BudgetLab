/**
 * Time Created: 2:28:19 PM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.budgetlab.dao.UserDao;
import com.jakesiewjk64.budgetlab.models.UserModel;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public Optional<UserModel> getUserById(long id) {
        return userDao.get(id);
    }

    public Collection<UserModel> getAllUsers() {
        return userDao.getAll();
    }

    public int upsertUser(UserModel user) {
        return userDao.save(user);
    }
}
