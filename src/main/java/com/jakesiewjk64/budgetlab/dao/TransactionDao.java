/**
 * Time Created: 9:10:54 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dao;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jakesiewjk64.budgetlab.models.TransactionModel;
import com.jakesiewjk64.budgetlab.repository.TransactionRepository;

@Component
public class TransactionDao implements IDao<TransactionModel> {

	@Autowired
	private TransactionRepository transactionRepository;

	@Override
	public Optional<TransactionModel> get(long id) {
		return transactionRepository.findById(id);
	}

	@Override
	public Collection<TransactionModel> getAll() {
		return transactionRepository.findAll();
	}

	@Override
	public int save(TransactionModel t) {
		return (int) this.transactionRepository.save(t).getId();
	}

	@Override
	public void update(TransactionModel t) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(TransactionModel t) {
		// TODO Auto-generated method stub

	}

}
