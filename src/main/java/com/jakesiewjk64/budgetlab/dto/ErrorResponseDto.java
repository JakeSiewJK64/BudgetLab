package com.jakesiewjk64.budgetlab.dto;

public class ErrorResponseDto {
    private final String subject;
    private final String message;

    public ErrorResponseDto(String subject, String message) {
        this.subject = subject;
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public String getMessage() {
        return message;
    }

}
