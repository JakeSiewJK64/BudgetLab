/**
 * Time Created: 9:11:58 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jakesiewjk64.budgetlab.models.TransactionModel;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionModel, Long>{
}
