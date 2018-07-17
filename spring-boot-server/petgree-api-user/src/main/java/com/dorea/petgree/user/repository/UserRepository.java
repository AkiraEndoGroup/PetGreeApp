package com.dorea.petgree.user.repository;

import com.dorea.petgree.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {

	@Query("SELECT usuario FROM User usuario WHERE usuario.email = :email")
	User findByEmail(@Param("email") String email);
}
