/**
 * Time Created: 5:09:59 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.jakesiewjk64.budgetlab.dto.UserDto;

@Entity
@Table(name = "Users")
public class UserModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String username;
	private String password;
	private String profileimage;

	public String getProfileimage() {
		return profileimage;
	}

	public void setProfileimage(String profileimage) {
		this.profileimage = profileimage;
	}

	@Column(name = "firstname")
	private String firstName;

	@Column(name = "lastname")
	private String lastName;

	@Column(name = "joineddate")
	private Date joineddate;

	public Date getJoinedDate() {
		return joineddate;
	}

	public void setJoinedDate(Date joinedDate) {
		this.joineddate = joinedDate;
	}

	public UserModel() {
	}

	public UserModel(UserModel user) {
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.firstName = user.getFirstname();
		this.lastName = user.getLastname();
		this.joineddate = user.getJoinedDate();
	}

	public UserModel(UserDto user) {
		this.id = user.getUserid();
		this.username = user.getUsername();
		this.firstName = user.getFirstname();
		this.lastName = user.getLastname();
		this.joineddate = user.getJoineddate();
		this.profileimage = user.getProfileimage();
	}

	public String getFirstname() {
		return firstName;
	}

	public void setFirstname(String firstName) {
		this.firstName = firstName;
	}

	public String getLastname() {
		return lastName;
	}

	public void setLastname(String lastName) {
		this.lastName = lastName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
