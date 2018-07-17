package com.dorea.petgree.user.validate;

import com.dorea.petgree.user.domain.User;

public class ValidateUser {

	public static boolean isValid(User user) {
		return (user.getEmail() != null && user.getAvatar() != null);
	}
}
