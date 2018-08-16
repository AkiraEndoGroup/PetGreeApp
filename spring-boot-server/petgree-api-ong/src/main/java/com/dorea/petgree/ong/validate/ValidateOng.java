package com.dorea.petgree.ong.validate;

import com.dorea.petgree.ong.domain.Ong;

public class ValidateOng {

	public static boolean validateOng(Ong ong) {
		return (ong.getName() != null
			&& ong.getEmail() != null
			&& ong.getEndereco() != null);
	}

	public static boolean isThisAPhone(String telefone) { return telefone.matches("\\+55(\\d){10,11}"); }

}
