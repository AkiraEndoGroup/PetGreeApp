package com.dorea.petgree.pet.service;

import com.dorea.petgree.pet.domain.Pet;

import java.util.List;

public interface PetService {

    List<Pet> getPets();

    Pet getPetById(Long id);

    Pet postPet(Pet pet);

    void deletePet(Long id);
}
