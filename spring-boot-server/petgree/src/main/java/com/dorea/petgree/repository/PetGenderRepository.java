package com.dorea.petgree.repository;

import com.dorea.petgree.domain.PetGender;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetGenderRepository extends CrudRepository<PetGender, Integer> {
}
