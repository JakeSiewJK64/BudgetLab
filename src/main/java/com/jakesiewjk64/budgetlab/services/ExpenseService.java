/**
 * Time Created: 5:27:32 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jakesiewjk64.budgetlab.dao.ExpenseDao;
import com.jakesiewjk64.budgetlab.models.ExpenseModel;

@Service
public class ExpenseService {

	@Autowired
	private ExpenseDao expenseDao;

	public Optional<ExpenseModel> getOneExpense(long id) {
		return expenseDao.get(id);
	}

	public Collection<ExpenseModel> getAllExpense() {
		return expenseDao.getAll();
	}

	public long upsertExpense(ExpenseModel expense) {
		return expenseDao.save(new ExpenseModel(
				expense.getId(),
				expense.getDescription(),
				expense.getDate()));
	}

}
