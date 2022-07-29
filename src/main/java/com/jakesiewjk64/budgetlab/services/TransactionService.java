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

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
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
}
