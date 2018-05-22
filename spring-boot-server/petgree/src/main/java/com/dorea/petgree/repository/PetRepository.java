package com.dorea.petgree.repository;

import com.dorea.petgree.domain.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet,Long>{
}
