package com.dorea.petgree.pet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PetNotFoundException extends RuntimeException {
    public PetNotFoundException(Long id) {
        super("Não foi encontrado nenhum pet com ID " + id);
    }
}
