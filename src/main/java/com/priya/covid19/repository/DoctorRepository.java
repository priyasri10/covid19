package com.priya.covid19.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.priya.covid19.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {


    Page<Doctor> findByNameContaining(String name, Pageable pageable);

    List<Doctor> findByNameContaining(String name, Sort sort);
}
