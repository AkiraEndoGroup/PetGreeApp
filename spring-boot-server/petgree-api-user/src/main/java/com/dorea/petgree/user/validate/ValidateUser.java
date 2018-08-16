package com.dorea.petgree.user.validate;

import com.dorea.petgree.user.domain.User;

public class ValidateUser {

	public static boolean isValid(User user) { return (user.getEmail() != null && user.getAvatar() != null); }

	public static boolean isThisAPhone(String telefone) { return telefone.matches("\\+55(\\d){10,11}"); }
}
