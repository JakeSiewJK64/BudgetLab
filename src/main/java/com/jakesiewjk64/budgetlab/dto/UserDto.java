/**
 * Time Created: 11:21:20 AM
 * Date Created: Jul 21, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dto;

import java.util.Date;

public class UserDto {
	private String username;
	private long userid;
	private String[] role;
	private String firstname;
	private String lastname;
	private String profileimage;
	private Date joineddate;

	public UserDto(String username, long userid, String[] role, String firstname, String lastname, Date joineddate,
			String profileimage) {
		this.username = username;
		this.profileimage = profileimage;
		this.joineddate = joineddate;
		this.userid = userid;
		this.role = role;
		this.firstname = firstname;
		this.lastname = lastname;
	}

	public Date getJoineddate() {
		return joineddate;
	}

	public void setJoineddate(Date joineddate) {
		this.joineddate = joineddate;
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

	public String getProfileimage() {
		return profileimage;
	}

	public void setProfileimage(String profileimage) {
		this.profileimage = profileimage;
	}

}
