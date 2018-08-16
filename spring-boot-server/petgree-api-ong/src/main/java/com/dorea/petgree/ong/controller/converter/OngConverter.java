package com.dorea.petgree.ong.controller.converter;

import com.dorea.petgree.ong.domain.Ong;
import com.dorea.petgree.ong.domain.OngModel;
import com.dorea.petgree.ong.exception.InvalidPhoneException;
import com.dorea.petgree.ong.validate.ValidateOng;

import javax.validation.constraints.NotNull;

public class OngConverter {

	public static Ong toOng(@NotNull OngModel ongModel, Ong ong) {
		if (ong == null) {
			ong = new Ong();
		}

		if (ongModel.getId() != null) {
			ong.setId(ongModel.getId());
		}

		if (ongModel.getEmail() != null) {
			ong.setEmail(ongModel.getEmail());
		}

		if (ongModel.getName() != null) {
			ong.setName(ongModel.getName());
		}

		if (ongModel.getEndereco() != null) {
			ong.setEndereco(ongModel.getEndereco());
		}

		if (ongModel.getPets() != null) {
			ong.setPets(ongModel.getPets());
		}

		if (ongModel.getTelefones() != null && !ongModel.getTelefones().isEmpty()) {
			String phone = ongModel.getTelefones().iterator().next();
			if (!ValidateOng.isThisAPhone(phone)) {
				throw new InvalidPhoneException(phone);
			}
			ong.setTelefones(ongModel.getTelefones());
		}

		return ong;
	}
}
