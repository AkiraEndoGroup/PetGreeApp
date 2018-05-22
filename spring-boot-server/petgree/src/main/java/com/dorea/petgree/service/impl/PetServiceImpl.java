package com.dorea.petgree.service;

import com.dorea.petgree.domain.Pet;
import com.dorea.petgree.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetServiceImpl implements PetService{

    @Autowired
    private PetRepository petRepository;

    @Override
    public List<Pet> getPets() {
        return petRepository.findAll();
    }

    @Override
    public Pet getPetById(Long id) {
        return petRepository.findOne(id);
    }

    @Override
    public Pet postPet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public void deletePet(Long id) {
        Pet pet = getPetById(id);
        if (pet != null) {
            petRepository.delete(id);
        }
    }
}
