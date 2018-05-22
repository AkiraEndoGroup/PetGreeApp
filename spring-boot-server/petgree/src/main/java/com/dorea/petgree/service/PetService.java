package com.dorea.petgree.service;

import com.dorea.petgree.domain.Pet;

import java.util.List;

public interface PetService {

    List<Pet> getPets();

    Pet getPetById(Long id);

    Pet postPet(Pet pet);

    Pet updatePet(Pet pet);

    void deletePet(Long id);
}
