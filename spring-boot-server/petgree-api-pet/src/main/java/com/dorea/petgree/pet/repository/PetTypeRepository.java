package com.dorea.petgree.pet.repository;

import com.dorea.petgree.pet.domain.PetType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetTypeRepository extends CrudRepository<PetType, Integer> {
}
