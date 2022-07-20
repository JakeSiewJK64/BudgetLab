/**
 * Time Created: 3:57:37 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jakesiewjk64.budgetlab.dto.ExpenseDto;
import com.jakesiewjk64.budgetlab.dto.GenericResponseDto;
import com.jakesiewjk64.budgetlab.models.ExpenseModel;
import com.jakesiewjk64.budgetlab.services.ExpenseService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/expense")
public class ExpenditureController {

	@Autowired
	private ExpenseService expenseService;

	@GetMapping("/getExpenseById/{id}")
	public Optional<ExpenseModel> getExpenseById(@PathVariable long id) {
		return expenseService.getOneExpense(id);
	}

	@GetMapping("/getExpenses")
	public List<ExpenseModel> getExpenses() {
		return (List<ExpenseModel>) expenseService.getAllExpense();
	}

	@PostMapping("/upsertExpense")
	public GenericResponseDto upsertExpense(@RequestBody ExpenseDto expense) {
		return new GenericResponseDto(expenseService.upsertExpense(expense), "Successfully saved expense!");
	}
}
