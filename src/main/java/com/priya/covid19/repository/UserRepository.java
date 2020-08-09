package com.priya.covid19.repository;

import com.priya.covid19.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
//	Page<User> findByNameContaining(String name, Pageable pageable);
//
//	List<User> findByNameContaining(String name, Sort sort);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
