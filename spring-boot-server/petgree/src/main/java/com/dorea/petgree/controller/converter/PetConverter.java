package com.dorea.petgree.controller.converter;

import com.dorea.petgree.domain.Pet;
import com.dorea.petgree.domain.PetColor;
import com.dorea.petgree.domain.PetColor.ColorPet;
import com.dorea.petgree.domain.PetGender;
import com.dorea.petgree.domain.PetGender.GenderPet;
import com.dorea.petgree.domain.PetType;
import com.dorea.petgree.domain.PetType.TypePet;
import com.dorea.petgree.domain.PetSize;
import com.dorea.petgree.domain.PetSize.SizePet;
import com.dorea.petgree.domain.PetModel;

import javax.validation.constraints.NotNull;

public class PetConverter {

	public static Pet toPet(@NotNull PetModel petModel) {
		Pet pet = new Pet();

		if (petModel.getId() != null) {
			pet.setId(petModel.getId());
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

		pet.setSpots(petModel.isSpots());

		if (petModel.getDescription() != null) {
			pet.setDescription(petModel.getDescription());
		}

		return pet;
	}
}
