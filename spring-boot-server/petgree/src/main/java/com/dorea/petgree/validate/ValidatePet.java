package com.dorea.petgree.validate;

import com.dorea.petgree.domain.Pet;

public class ValidatePet {
    public static boolean isValid(Pet pet) {
        return (pet.getType() != null && pet.getColor() != null && pet.getGender() != null && pet.getSize() != null);
    }
}
