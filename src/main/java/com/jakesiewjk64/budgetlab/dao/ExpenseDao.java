/**
 * Time Created: 5:44:06 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dao;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jakesiewjk64.budgetlab.models.ExpenseModel;
import com.jakesiewjk64.budgetlab.repository.ExpenseRepository;

@Component
public class ExpenseDao implements IDao<ExpenseModel> {

	@Autowired
	private ExpenseRepository expenseRepository;

	public List<ExpenseModel> getExpensesByUserId(long userid) {
		return this.expenseRepository.findExpensesByUserId(userid);
	}

	@Override
	public Optional<ExpenseModel> get(long id) {
		try {
			return expenseRepository.findById(id);
		} catch (Exception e) {
			return Optional.empty();
		}
	}

	@Override
	public Collection<ExpenseModel> getAll() {
		return expenseRepository.findAll();
	}

	@Override
	public int save(ExpenseModel t) {
		return (int) expenseRepository.save(t).getId();
	}

	@Override
	public void update(ExpenseModel t) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(ExpenseModel t) {
		// TODO Auto-generated method stub

	}

}
