package com.dorea.petgree.ong.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.dorea.petgree.ong")
@EnableJpaRepositories(basePackages = "com.dorea.petgree.ong.repository")
@EntityScan(basePackages = "com.dorea.petgree.ong.domain")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
