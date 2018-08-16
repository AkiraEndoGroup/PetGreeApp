package com.dorea.petgree.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class EmailAlreadyRegisteredException extends RuntimeException {
	public EmailAlreadyRegisteredException(String email) { super("O email " + email + " já está cadastrado."); }
}
