package com.dorea.petgree.pet.controller.converter;

import com.dorea.petgree.pet.domain.*;
import com.dorea.petgree.pet.domain.*;
import com.dorea.petgree.pet.domain.PetColor.ColorPet;
import com.dorea.petgree.pet.domain.PetGender.GenderPet;
import com.dorea.petgree.pet.domain.PetType.TypePet;
import com.dorea.petgree.pet.domain.PetSize.SizePet;
import com.dorea.petgree.pet.domain.PetStatus.StatusPet;

import javax.validation.constraints.NotNull;
import java.util.UUID;

public class PetConverter {

	public static Pet toPet(@NotNull PetModel petModel, Pet pet) {
		if (pet == null) {
			pet = new Pet();
		}

		if (petModel.getId() != null) {
			pet.setId(petModel.getId());
		}

		if (petModel.getName() != null) {
			pet.setName(petModel.getName());
		} else if (pet.getName() == null) {
			pet.setName("Sem nome");
		}

		if (petModel.getType() != null) {
			TypePet typePet = PetType.TypePet.getType(petModel.getType().toUpperCase());
			if (typePet != null) {
				PetType petType = new PetType();
				petType.setId(typePet.getType());
				pet.setType(petType);
			}
		}

		if (petModel.getGender() != null) {
			GenderPet genderPet = PetGender.GenderPet.getGender(petModel.getGender().toUpperCase());
			if (genderPet != null) {
				PetGender petGender = new PetGender();
				petGender.setId(genderPet.getGender());
				pet.setGender(petGender);
			}
		}

		if (petModel.getSize() != null) {
			SizePet sizePet = PetSize.SizePet.getSize(petModel.getSize().toUpperCase());
			if (sizePet != null) {
				PetSize petSize = new PetSize();
				petSize.setId(sizePet.getSize());
				pet.setSize(petSize);
			}
		}

		if (petModel.getColor() != null) {
			ColorPet colorPet = PetColor.ColorPet.getColor(petModel.getColor().toUpperCase());
			if (colorPet != null) {
				PetColor petColor = new PetColor();
				petColor.setId(colorPet.getColor());
				pet.setColor(petColor);
			}
		}

		if (petModel.getStatus() != null) {
			StatusPet statusPet = PetStatus.StatusPet.getStatus(petModel.getStatus().toUpperCase());
			if (statusPet != null) {
				PetStatus petStatus = new PetStatus();
				petStatus.setId(statusPet.getStatus());
				pet.setStatus(petStatus);
			}
		} else if (pet.getStatus() == null) { // Se não vier com status, é um animal perdido
			PetStatus petStatus = new PetStatus();
			petStatus.setId(0);
			pet.setStatus(petStatus);
		}

		pet.setSpots(petModel.isSpots());

		if (petModel.getDescription() != null) {
			pet.setDescription(petModel.getDescription());
		} else {
			pet.setDescription("Sem descrição.");
		}

		if (petModel.getImage_url() != null && petModel.getImage_url() != "") {
			pet.setImage_url(petModel.getImage_url());
		} else {
			pet.setImage_url("https://api.adorable.io/avatars/200/" + UUID.randomUUID());
		}

		if (petModel.getOng_email() != null) {
			pet.setOng_email(petModel.getOng_email());
		}

		if (petModel.getLat() != null) {
			pet.setLat(petModel.getLat());
		}

		if (petModel.getLon() != null) {
			pet.setLon(petModel.getLon());
		}

		return pet;
	}
}
