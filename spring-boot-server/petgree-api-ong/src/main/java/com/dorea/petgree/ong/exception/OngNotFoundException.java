package com.dorea.petgree.ong.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OngNotFoundException extends RuntimeException {
	public OngNotFoundException(Long id) { super("Não existe ONG registrada com id " + id); }
}
