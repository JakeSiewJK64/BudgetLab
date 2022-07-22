/**
 * Time Created: 3:22:31 PM
 * Date Created: Jul 22, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dto;

public class UserRoleDto {

	private long id;
	private String role;
	private String rolehash;

	public long getid() {
		return id;
	}

	public void setid(long id) {
		this.id = id;
	}

	public String getrole() {
		return role;
	}

	public void setrole(String role) {
		this.role = role;
	}

	public String getrolehash() {
		return rolehash;
	}

	public void setrolehash(String rolehash) {
		this.rolehash = rolehash;
	}

}
