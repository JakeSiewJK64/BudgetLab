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

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

	public void generateCSV(long id, HttpServletResponse response) throws IOException {
		generateExpenseCSV(id, response.getWriter());
	}

	private void generateExpenseCSV(long id, PrintWriter printWriter) {

		try {
			CSVPrinter csvPrinter = new CSVPrinter(printWriter, CSVFormat.RFC4180);
			Collection<ExpenseModel> expenses = expenseDao.getExpensesByUserId(id);
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
			e.printStackTrace();
		} finally {
			printWriter.flush();
			printWriter.close();
		}
	}

	private void createCell(Row row, int columnCount, Object value, XSSFSheet sheet) {
		sheet.autoSizeColumn(columnCount);
		Cell cell = row.createCell(columnCount);
		cell.setCellValue(value.toString());
	}

	private void writeData(Collection<ExpenseModel> expenses, XSSFSheet sheet) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		int rowCount = 1;
		for (ExpenseModel expense : expenses) {
			Row row = sheet.createRow(rowCount++);
			int columnCount = 0;
			createCell(row, columnCount++, expense.getDescription(), sheet);
			createCell(row, columnCount++, expense.getTotal(), sheet);
			createCell(row, columnCount++, dateFormat.format(expense.getDate()), sheet);
		}
	}

	public void generateExcel(long id, HttpServletResponse response) throws IOException {
		try {
			Collection<ExpenseModel> expenses = expenseDao.getExpensesByUserId(id);
			XSSFWorkbook workbook = new XSSFWorkbook();
			ServletOutputStream servletOutputStream = response.getOutputStream();
			XSSFSheet sheet = workbook.createSheet();
			Row row = sheet.createRow(0);
			int columnCount = 0;

			// todo: create cells
			sheet.autoSizeColumn(columnCount);

			// todo: write header
			createCell(row, columnCount++, "Description", sheet);
			createCell(row, columnCount++, "Total", sheet);
			createCell(row, columnCount++, "Date", sheet);

			// todo: write data
			writeData(expenses, sheet);

			workbook.write(servletOutputStream);
			workbook.close();
			servletOutputStream.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
