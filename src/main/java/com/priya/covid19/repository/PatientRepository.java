package com.priya.covid19.repository;

import java.util.List;

import com.priya.covid19.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {


    Page<Patient> findByNameContaining(String name, Pageable pageable);

    List<Patient> findByNameContaining(String name,  Sort sort);
}
