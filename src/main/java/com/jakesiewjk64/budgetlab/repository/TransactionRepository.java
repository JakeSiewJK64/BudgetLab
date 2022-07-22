/**
 * Time Created: 9:11:58 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jakesiewjk64.budgetlab.models.TransactionModel;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionModel, Long> {
    @Query(value = "SELECT * FROM transactions WHERE userid = ?1 and not isdeleted", nativeQuery = true)
    public List<TransactionModel> findAllByUserId(long userid);
}
