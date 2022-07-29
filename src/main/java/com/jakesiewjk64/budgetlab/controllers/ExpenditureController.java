/**
 * Time Created: 3:57:37 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.controllers;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping("/getExpensesByUserId/{userid}")
	public List<ExpenseModel> getExpensesByUserId(@PathVariable long userid) {
		return (List<ExpenseModel>) expenseService.getAllExpensesByUserId(userid);
	}

	@PostMapping("/upsertExpense")
	public GenericResponseDto upsertExpense(@RequestBody ExpenseModel expense) {
		return new GenericResponseDto(expenseService.upsertExpense(expense), "Successfully saved expense!");
	}

	@PostMapping("/deleteExpense")
	public GenericResponseDto deleteExpense(@RequestBody long id) {
		return new GenericResponseDto(expenseService.deleteExpense(id), "Successfully deleted expense!");
	}

	@GetMapping("/exportExpenseCSV/{id}")
	public void exportExpenseCSV(@PathVariable long id,HttpServletResponse response) throws IOException {
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String filename = "Expense_" + dateFormat.format(new Date()) + ".csv";
			response.setContentType("text/csv");
			response.addHeader("Content-Disposition", "attachment; filename=" + filename);
			expenseService.generateCSV(id, response);
		} catch (Exception e) {
			response.sendError(0, e.toString());
		}
	}
	
	@GetMapping("/exportExpenseExcel/{id}")
	public void exportExpenseExcel(@PathVariable long id,HttpServletResponse response) throws IOException {
		try {
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String filename = "Expense_" + dateFormat.format(new Date()) + ".xlsx";
			response.setContentType("text/excel");
			response.addHeader("Content-Disposition", "attachment; filename=" + filename);
			expenseService.generateExcel(id, response);
		} catch (Exception e) {
			response.sendError(0, e.toString());
		}
	}
}
