/**
 * Time Created: 9:24:28 PM
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

import com.jakesiewjk64.budgetlab.models.TransactionModel;
import com.jakesiewjk64.budgetlab.services.TransactionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/transaction")
public class TransactionController {

	@Autowired
	private TransactionService transactionService;

	@GetMapping("/getTransactionById/{id}")
	public Optional<TransactionModel> getOneTransactionModel(@PathVariable long id) {
		return transactionService.getOneTransaction(id);
	}

	@GetMapping("/getAllTransactions")
	public List<TransactionModel> getAllTransactionModel() {
		return (List<TransactionModel>) transactionService.getAllTransactions();
	}

	@GetMapping("/getAllTransactionsByUserId/{userid}")
	public List<TransactionModel> getAllTransactionModel(@PathVariable int userid) {
		return (List<TransactionModel>) transactionService.getAllTransactionsByUserId(userid);
	}

	@PostMapping("/upsertTransaction")
	public long upsertTransaction(@RequestBody TransactionModel transaction) {
		return transactionService.upsertTransaction(transaction);
	}

	@PostMapping("/deleteTransaction")
	public long deleteTransaction(@RequestBody long id) {
		return transactionService.deleteTransaction(id);
	}
}
