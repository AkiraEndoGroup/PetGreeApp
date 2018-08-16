package com.dorea.petgree.pet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class IdForbiddenException extends RuntimeException{
    public IdForbiddenException() { super("Não pode enviar o ID!"); }
}
