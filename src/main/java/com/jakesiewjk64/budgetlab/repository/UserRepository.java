/**
 * Time Created: 12:06:44 PM
 * Date Created: Jul 15, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jakesiewjk64.budgetlab.models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{
	UserModel findUserByUsername(String username);
}
