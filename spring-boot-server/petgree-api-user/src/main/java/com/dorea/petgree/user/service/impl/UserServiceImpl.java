package com.dorea.petgree.user.service.impl;

import com.dorea.petgree.user.domain.User;
import com.dorea.petgree.user.repository.UserRepository;
import com.dorea.petgree.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getUsers() { return userRepository.findAll(); }

	@Override
	public User getUser(Long userId) { return userRepository.findOne(userId); }

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User postUser(User user) { return userRepository.save(user); }

	@Override
	public void deleteUser(Long userId) {
		if (getUser(userId) != null) {
			userRepository.delete(userId);
		}
	}
}
