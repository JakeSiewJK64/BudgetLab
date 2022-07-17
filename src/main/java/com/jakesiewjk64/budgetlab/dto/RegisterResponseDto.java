package com.jakesiewjk64.budgetlab.dto;

public class RegisterResponseDto {
    private String message;
    private Long id;
    private String jwt;

    public RegisterResponseDto(Long id, String message, String jwt) {
        this.message = message;
        this.id = id;
        this.jwt = jwt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

}
