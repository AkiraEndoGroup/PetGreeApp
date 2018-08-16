package com.dorea.petgree.user.service;

import com.dorea.petgree.user.domain.User;

import java.util.List;

public interface UserService {

	List<User> getUsers();

	User getUser(Long userId);

	User findByEmail(String email);

	User postUser(User user);

	void deleteUser(Long userId);
}
