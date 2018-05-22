package com.dorea.petgree.repository;

import com.dorea.petgree.domain.PetSize;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetSizeRepository extends CrudRepository<PetSize, Integer> {
}
