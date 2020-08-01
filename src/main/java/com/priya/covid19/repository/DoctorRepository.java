package com.priya.covid19.repository;

import com.priya.covid19.model.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {


    Page<Doctor> findByNameContaining(String name, Pageable pageable);

    List<Doctor> findByNameContaining(String name, Sort sort);
}
