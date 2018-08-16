package com.dorea.petgree.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidPhoneException extends RuntimeException {
	public InvalidPhoneException(String telefone) { super("'"+telefone+"' não um telefone válido! Exemplo de número válido: +5511123456789");}
}
