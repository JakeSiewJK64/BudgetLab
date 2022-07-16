package com.jakesiewjk64.budgetlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jakesiewjk64.budgetlab.models.UserToRoleModel;

@Repository
public interface UserRoleRepository extends JpaRepository<UserToRoleModel, Long>{
    @Query(value = "SELECT * FROM usertorolebridge WHERE userid = ?1", nativeQuery = true)
    public List<UserToRoleModel> findUserRolesById(long id);
}
