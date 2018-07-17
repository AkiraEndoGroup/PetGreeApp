package com.dorea.petgree.user.controller.Converter;

import com.dorea.petgree.user.domain.Avatar;
import com.dorea.petgree.user.domain.User;
import com.dorea.petgree.user.domain.UserModel;

import javax.validation.constraints.NotNull;

public class UserConverter {

	public static User toUser(@NotNull UserModel userModel) {
		User user = new User();

		if (userModel.getId() != null) {
			user.setId(userModel.getId());
		}

		if (userModel.getAvatar() != null) {
			user.setAvatar(userModel.getAvatar());
		} else {
			Avatar newAvatar = new Avatar();
			newAvatar.setBio("Sem informações de descrição.");
			newAvatar.setIdade(0);
			newAvatar.setImageUrl("http://via.placeholder.com/150x150");
			newAvatar.setNome(userModel.getEmail());
			user.setAvatar(newAvatar);
		}

		if (userModel.getEmail() != null) {
			user.setEmail(userModel.getEmail());
		}

		if (userModel.getEndereco() != null) {
			user.setEndereco(userModel.getEndereco());
		}

		if (userModel.getOwned() != null) {
			user.setOwned(userModel.getOwned());
		}

		if (userModel.getTelefones() != null) {
			user.setTelefones(userModel.getTelefones());
		}

		return user;
	}
}
