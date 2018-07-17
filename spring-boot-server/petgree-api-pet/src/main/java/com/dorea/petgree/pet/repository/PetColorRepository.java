package com.dorea.petgree.pet.repository;

import com.dorea.petgree.pet.domain.PetColor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetColorRepository extends CrudRepository<PetColor, Integer> {
}
