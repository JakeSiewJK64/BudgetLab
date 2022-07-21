/**
 * Time Created: 11:21:20 AM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dto;

public class UserDto {
	private String username;
	private long userid;
	private String[] role;
	private String firstname;
	private String lastname;

	public UserDto(String username, long userid, String[] role, String firstname, String lastname) {
		this.username = username;
		this.userid = userid;
		this.role = role;
		this.firstname = firstname;
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String[] getRole() {
		return role;
	}

	public void setRole(String[] role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getUserid() {
		return userid;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

}
