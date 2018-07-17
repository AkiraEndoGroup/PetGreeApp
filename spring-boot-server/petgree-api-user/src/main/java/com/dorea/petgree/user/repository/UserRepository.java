package com.dorea.petgree.user.repository;

import com.dorea.petgree.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
