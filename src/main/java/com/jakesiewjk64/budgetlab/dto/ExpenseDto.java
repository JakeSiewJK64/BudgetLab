/**
 * Time Created: 11:37:35 AM
 * Date Created: Jul 20, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dto;

import java.util.Date;
import java.util.List;

import com.jakesiewjk64.budgetlab.models.TransactionModel;

public class ExpenseDto {
	private long id;
	private String description;
	private Date date;
	private List<TransactionModel> transactions;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<TransactionModel> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<TransactionModel> transactions) {
		this.transactions = transactions;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
