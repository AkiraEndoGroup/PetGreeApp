package com.dorea.petgree.ong.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OngNotFoundByEmailException extends RuntimeException {
	public OngNotFoundByEmailException(String email) { super("Não existe ONG registrada no email " + email); }
}
