/**
 * Time Created: 10:36:19 AM
 * Date Created: Jul 20, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dto;

public class GenericResponseDto {

	private Long id;
	private String message;

	public GenericResponseDto(Long id, String message) {
		this.id = id;
		this.message = message;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
