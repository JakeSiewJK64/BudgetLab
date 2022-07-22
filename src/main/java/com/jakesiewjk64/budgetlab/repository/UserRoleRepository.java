/**
 * Time Created: 3:30:18 PM
 * Date Created: Jul 22, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jakesiewjk64.budgetlab.models.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    @Query(value = "SELECT * from userroles u WHERE u.role = ?1", nativeQuery = true)
    public UserRole findUserRoleByName(String rolename);
}
