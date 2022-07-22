/**
 * Time Created: 9:18:27 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.budgetlab.dao.TransactionDao;
import com.jakesiewjk64.budgetlab.models.TransactionModel;

@Service
public class TransactionService {

	@Autowired
	private TransactionDao transactionDao;

	public Optional<TransactionModel> getOneTransaction(long id) {
		return transactionDao.get(id);
	}

	public List<TransactionModel> getAllTransactions() {
		return (List<TransactionModel>) transactionDao.getAll();
	}

	public List<TransactionModel> getAllTransactionsByUserId(int userid) {
		return (List<TransactionModel>) transactionDao.getAllByUserId(userid);
	}

	public long upsertTransaction(TransactionModel transaction) {
		return transactionDao.save(transaction);
	}

	public long deleteTransaction(long id) {
		TransactionModel transaction = transactionDao.get(id).get();
		transaction.setIsdeleted(true);
		return transactionDao.save(transaction);
	}
}
