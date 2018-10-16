package com.dorea.petgree.ong.service;

public interface EmailService {

	void sendEmail(String to,String from,String subject,String text);
}
