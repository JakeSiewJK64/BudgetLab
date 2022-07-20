/**
 * Time Created: 4:09:38 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Expense")
public class ExpenseModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String description;
	private Date date;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "expenseId")
	private List<TransactionModel> transaction;

	public ExpenseModel() {
	}

	public ExpenseModel(long id, String description, Date date) {
		this.id = id;
		this.description = description;
		this.date = date;
	}

	public List<TransactionModel> getTransaction() {
		return transaction;
	}

	public void setTransaction(List<TransactionModel> transaction) {
		this.transaction = transaction;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Float getTotal() {
		float totalVal = 0;
		for (TransactionModel transaction : this.transaction) {
			totalVal += transaction.getAmount();
		}
		return totalVal;
	}
}
