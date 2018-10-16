package com.dorea.petgree.ong.exception;

public class EmailSendException extends RuntimeException {
	public EmailSendException(String error) { super("Erro enviando email! " + error); }
}
