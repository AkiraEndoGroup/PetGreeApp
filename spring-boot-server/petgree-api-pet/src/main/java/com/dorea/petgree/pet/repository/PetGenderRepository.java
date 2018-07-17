package com.dorea.petgree.pet.repository;

import com.dorea.petgree.pet.domain.PetGender;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetGenderRepository extends CrudRepository<PetGender, Integer> {
}
