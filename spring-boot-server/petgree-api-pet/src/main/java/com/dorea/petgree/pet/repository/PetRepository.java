package com.dorea.petgree.pet.repository;

import com.dorea.petgree.pet.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet,Long>{
}
