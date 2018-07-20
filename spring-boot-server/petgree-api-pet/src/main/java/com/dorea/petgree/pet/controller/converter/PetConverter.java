package com.dorea.petgree.pet.controller.converter;

import com.dorea.petgree.pet.domain.*;
import com.dorea.petgree.pet.domain.*;
import com.dorea.petgree.pet.domain.PetColor.ColorPet;
import com.dorea.petgree.pet.domain.PetGender.GenderPet;
import com.dorea.petgree.pet.domain.PetType.TypePet;
import com.dorea.petgree.pet.domain.PetSize.SizePet;
import com.dorea.petgree.pet.domain.PetStatus.StatusPet;

import javax.validation.constraints.NotNull;

public class PetConverter {

	public static Pet toPet(@NotNull PetModel petModel) {
		Pet pet = new Pet();

		if (petModel.getId() != null) {
			pet.setId(petModel.getId());
		}

		if (petModel.getName() != null) {
			pet.setName(petModel.getName());
		} else {
			pet.setName("Sem nome");
		}

		TypePet typePet = PetType.TypePet.getType(petModel.getType().toUpperCase());
		if (typePet != null) {
			PetType petType = new PetType();
			petType.setId(typePet.getType());
			pet.setType(petType);
		}

		GenderPet genderPet = PetGender.GenderPet.getGender(petModel.getGender().toUpperCase());
		if (genderPet != null) {
			PetGender petGender = new PetGender();
			petGender.setId(genderPet.getGender());
			pet.setGender(petGender);
		}

		SizePet sizePet = PetSize.SizePet.getSize(petModel.getSize().toUpperCase());
		if (sizePet != null) {
			PetSize petSize = new PetSize();
			petSize.setId(sizePet.getSize());
			pet.setSize(petSize);
		}

		ColorPet colorPet = PetColor.ColorPet.getColor(petModel.getColor().toUpperCase());
		if (colorPet != null) {
			PetColor petColor = new PetColor();
			petColor.setId(colorPet.getColor());
			pet.setColor(petColor);
		}

		if (petModel.getStatus() != null) {
			StatusPet statusPet = PetStatus.StatusPet.getStatus(petModel.getStatus().toUpperCase());
			if (statusPet != null) {
				PetStatus petStatus = new PetStatus();
				petStatus.setId(statusPet.getStatus());
				pet.setStatus(petStatus);
			}
		} else { // Se não vier com status, é um animal perdido
			PetStatus petStatus = new PetStatus();
			petStatus.setId(0);
			pet.setStatus(petStatus);
		}

		pet.setSpots(petModel.isSpots());

		if (petModel.getDescription() != null) {
			pet.setDescription(petModel.getDescription());
		}

		if (petModel.getImage_url() != null) {
			pet.setImage_url(petModel.getImage_url());
		}

		return pet;
	}
}
