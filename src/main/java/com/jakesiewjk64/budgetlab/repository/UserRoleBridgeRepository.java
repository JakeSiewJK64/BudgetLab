package com.jakesiewjk64.budgetlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jakesiewjk64.budgetlab.models.UserToRoleModel;

@Repository
public interface UserRoleBridgeRepository extends JpaRepository<UserToRoleModel, Long> {
    @Query(value = "SELECT * FROM usertorolebridge WHERE userid = ?1", nativeQuery = true)
    public List<UserToRoleModel> findUserRolesById(long id);

    @Query(value = "SELECT rolehash FROM usertorolebridge a RIGHT JOIN userroles b ON a.roleid = b.id WHERE b.role = ?1", nativeQuery = true)
    public String[] findRoleHashByName(String rolename);
    
    @Query(value = "SELECT role FROM usertorolebridge a RIGHT JOIN userroles b ON a.roleid = b.id WHERE a.userid = ?1", nativeQuery = true)
    public String findUserRoleByUserId(long id);
}
