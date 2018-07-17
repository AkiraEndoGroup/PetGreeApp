package com.dorea.petgree.pet.repository;

import com.dorea.petgree.pet.domain.PetSize;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetSizeRepository extends CrudRepository<PetSize, Integer> {
}
