package com.dorea.petgree.user.controller.Converter;

import com.dorea.petgree.user.domain.Avatar;
import com.dorea.petgree.user.domain.User;
import com.dorea.petgree.user.domain.UserModel;
import com.dorea.petgree.user.exception.InvalidPhoneException;
import com.dorea.petgree.user.validate.ValidateUser;

import javax.validation.constraints.NotNull;

public class UserConverter {

	public static User toUser(@NotNull UserModel userModel, User user) {
		if (user == null) {
			user = new User();
		}

		if (userModel.getId() != null) {
			user.setId(userModel.getId());
		}

		if (userModel.getAvatar() != null) {
			if (user.getAvatar() != null) { // (nonNull, nonNull) -> complicado, ver quais campos tem valor
				Avatar newAvatar = new Avatar();
				newAvatar.setId(user.getAvatar().getId()); // manter o ID

				// name
				if (userModel.getAvatar().getName() != null) {
					newAvatar.setName(userModel.getAvatar().getName());
				} else {
					newAvatar.setName(user.getAvatar().getName());
				}

				// bio
				if (userModel.getAvatar().getBio() != null) {
					newAvatar.setBio(userModel.getAvatar().getBio());
				} else {
					newAvatar.setBio(user.getAvatar().getBio());
				}

				// imageUrl
				if (userModel.getAvatar().getImageUrl() != null) {
					newAvatar.setImageUrl(userModel.getAvatar().getImageUrl());
				} else {
					newAvatar.setImageUrl(user.getAvatar().getImageUrl());
				}

				// idade
				if (userModel.getAvatar().getIdade() > 0) {
					newAvatar.setIdade(userModel.getAvatar().getIdade());
				} else {
					newAvatar.setIdade(user.getAvatar().getIdade());
				}

				user.setAvatar(newAvatar);

			} else { // (nonNull, null)
				user.setAvatar(userModel.getAvatar());
			}
		} else if (user.getAvatar() == null) { // (null, null)
			Avatar newAvatar = new Avatar();
			newAvatar.setBio("Sem informações de descrição.");
			newAvatar.setIdade(0);
			newAvatar.setImageUrl("https://api.adorable.io/avatars/200/" + userModel.getEmail());
			newAvatar.setName(userModel.getEmail());
			user.setAvatar(newAvatar);
		}

		if (userModel.getEmail() != null) {
			user.setEmail(userModel.getEmail());
		}

		if (userModel.getOwned() != null) {
			user.setOwned(userModel.getOwned());
		}

		if (userModel.getEndereco() != null) {
			user.setEndereco(userModel.getEndereco());
		}

		if (userModel.getTelefones() != null) {
			if (userModel.getTelefones().size() == 0) {
				user.setTelefones(userModel.getTelefones());
			} else {
				String phone = userModel.getTelefones().iterator().next();
				if (!ValidateUser.isThisAPhone(phone)) {
					throw new InvalidPhoneException(phone);
				}
				user.setTelefones(userModel.getTelefones());
			}
		}

		return user;
	}
}
