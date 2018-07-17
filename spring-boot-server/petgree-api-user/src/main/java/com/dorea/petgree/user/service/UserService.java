package com.dorea.petgree.user.service;

import com.dorea.petgree.user.domain.User;

import java.util.List;

public interface UserService {

	List<User> getUsers();

	User getUser(Long userId);

	User postUser(User user);

	User updateUser(User user);

	void deleteUser(Long userId);
}
