package com.dorea.petgree.pet.service;

import com.dorea.petgree.pet.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdoptionService {

    @Autowired
    private PetRepository petRepository;
}
