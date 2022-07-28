/**
 * Time Created: 5:27:32 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collection;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
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

	public Collection<ExpenseModel> getAllExpensesByUserId(long userid) {
		return expenseDao.getExpensesByUserId(userid);
	}

	public long upsertExpense(ExpenseModel expense) {
		return expenseDao.save(expense);
	}

	public long deleteExpense(long id) {
		ExpenseModel model = expenseDao.get(id).get();
		model.setDeleted(true);
		return expenseDao.save(model);
	}

	public void generateCSV(HttpServletResponse response) throws IOException {
		generateExpenseCSV(response.getWriter());
	}

	private void generateExpenseCSV(PrintWriter printWriter) {

		try {
			CSVPrinter csvPrinter = new CSVPrinter(printWriter, CSVFormat.RFC4180);
			Collection<ExpenseModel> expenses = expenseDao.getAll();
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			csvPrinter.printRecord("Description", "Date", "Total");
			for (ExpenseModel expense : expenses) {
				csvPrinter.printRecord(
						Arrays.asList(
								expense.getDescription(),
								dateFormat.format(expense.getDate()),
								expense.getTotal()));
			}
			csvPrinter.flush();
			csvPrinter.close();
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			printWriter.flush();
			printWriter.close();
		}
	}
}
