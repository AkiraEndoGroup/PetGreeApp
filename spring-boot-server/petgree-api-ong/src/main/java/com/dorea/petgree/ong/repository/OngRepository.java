package com.dorea.petgree.ong.repository;

import com.dorea.petgree.ong.domain.Ong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OngRepository extends JpaRepository<Ong,Long> {

	@Query("SELECT ong FROM Ong ong WHERE ong.email = :email")
	Ong findByEmail(@Param("email") String email);
}
