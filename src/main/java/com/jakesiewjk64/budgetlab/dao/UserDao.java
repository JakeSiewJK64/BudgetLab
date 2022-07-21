/**
 * Time Created: 2:28:02 PM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dao;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jakesiewjk64.budgetlab.models.UserModel;
import com.jakesiewjk64.budgetlab.repository.UserRepository;

@Component
public class UserDao implements IDao<UserModel> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<UserModel> get(long id) {
        return userRepository.findById(id);
    }

    @Override
    public Collection<UserModel> getAll() {
        return userRepository.findAll();
    }

    @Override
    public int save(UserModel t) {
        return (int) userRepository.save(t).getId();
    }

    @Override
    public void update(UserModel t) {
        // TODO Auto-generated method stub

    }

    @Override
    public void delete(UserModel t) {
        // TODO Auto-generated method stub

    }

}
