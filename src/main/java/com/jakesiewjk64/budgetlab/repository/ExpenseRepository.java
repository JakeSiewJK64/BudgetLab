/**
 * Time Created: 5:47:22 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.jakesiewjk64.budgetlab.models.ExpenseModel;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseModel, Long> {
    @Query(value = "SELECT * FROM expense WHERE userid = ?1 and not isdeleted", nativeQuery = true)
    public List<ExpenseModel> findExpensesByUserId(long userid);
}
