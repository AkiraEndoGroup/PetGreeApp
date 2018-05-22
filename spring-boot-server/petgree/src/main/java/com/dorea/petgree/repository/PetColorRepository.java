package com.dorea.petgree.repository;

import com.dorea.petgree.domain.PetColor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetColorRepository extends CrudRepository<PetColor, Integer> {
}
