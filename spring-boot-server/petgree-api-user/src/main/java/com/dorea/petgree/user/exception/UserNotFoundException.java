package com.dorea.petgree.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(Long userId) { super("Não existe um usuário com id " + userId); }
}
