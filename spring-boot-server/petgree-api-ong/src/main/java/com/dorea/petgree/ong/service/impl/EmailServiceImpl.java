package com.dorea.petgree.ong.service.impl;

import com.dorea.petgree.ong.exception.EmailSendException;
import com.dorea.petgree.ong.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

import org.springframework.mail.javamail.JavaMailSender;

@Component
public class EmailServiceImpl implements EmailService {
	@Autowired
	JavaMailSender emailSender;

	public void sendEmail(String to,String from,String subject,String text) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setFrom(from);
			message.setSubject(subject);
			message.setText(text);

			emailSender.send(message);
		} catch (MailException e) {
			throw new EmailSendException(e.getMessage());
		}
	}
}
