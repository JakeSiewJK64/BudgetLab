/**
 * Time Created: 9:18:27 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.services;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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

	public void exportTransactionCSV(long id, HttpServletResponse response) throws IOException {
		generateTransactionCSV(id, response);
	}

	private void generateTransactionCSV(long id, HttpServletResponse response) throws IOException {
		try {
			Collection<TransactionModel> transactions = transactionDao.getAllByUserId((int) id);
			CSVPrinter printer = new CSVPrinter(response.getWriter(), CSVFormat.RFC4180);
			printer.printRecord("name", "amount");
			for (TransactionModel transactionModel : transactions) {
				printer.printRecord(Arrays.asList(
						transactionModel.getName(),
						transactionModel.getAmount()));
			}
			printer.flush();
			printer.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private Cell createCell(Row row, int columnCount, Object value, XSSFSheet sheet) {
		sheet.autoSizeColumn(columnCount);
		Cell cell = row.createCell(columnCount);
		cell.setCellValue(value.toString());
		return cell;
	}

	private void setHeaderStyle(Cell cell, CellStyle style) {
		cell.setCellStyle(style);
	}

	private CellStyle getHeaderStyle(XSSFWorkbook workbook) {
		CellStyle style = workbook.createCellStyle();
		XSSFFont font = workbook.createFont();
		font.setBold(true);
		font.setFontHeight(16);
		style.setFont(font);
		return style;
	}

	private void writeHeader(Row row, int columnCount, XSSFWorkbook workbook, XSSFSheet sheet) {
		String[] headers = new String[] { "Name", "Amount" };
		CellStyle style = getHeaderStyle(workbook);
		for (String header : headers) {
			Cell cell = createCell(row, columnCount++, header, sheet);
			setHeaderStyle(cell, style);
		}
	}

	private void writeData(Collection<TransactionModel> transactions, XSSFSheet sheet) {
		int rowCount = 1;
		for (TransactionModel transaction : transactions) {
			Row row = sheet.createRow(rowCount++);
			int columnCount = 0;
			createCell(row, columnCount++, transaction.getName(), sheet);
			createCell(row, columnCount++, transaction.getAmount(), sheet);
		}
	}

	public void exportTransactionExcel(long id, HttpServletResponse response) throws IOException {
		Collection<TransactionModel> transactions = transactionDao.getAllByUserId((int) id);
		XSSFWorkbook workbook = new XSSFWorkbook();
		ServletOutputStream servletOutputStream = response.getOutputStream();
		XSSFSheet sheet = workbook.createSheet();
		Row row = sheet.createRow(0);
		int columnCount = 0;
		try {
			sheet.autoSizeColumn(columnCount);
			writeHeader(row, columnCount, workbook, sheet);
			writeData(transactions, sheet);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			workbook.write(servletOutputStream);
			workbook.close();
			servletOutputStream.close();
		}
	}
}
