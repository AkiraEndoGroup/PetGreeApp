package com.dorea.petgree.service;

import com.dorea.petgree.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdoptionService {

    @Autowired
    private PetRepository petRepository;
}
