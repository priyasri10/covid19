package com.priya.covid19.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "bprate")
    private int bprate;

    @Column(name = "doctor_id", insertable = false, updatable = false)
    private Long doctorId;

    @JsonProperty("doctor_id")
    public void setDoctorId(long doctorId) {
        this.doctor = new Doctor(doctorId);
    }

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Doctor doctor;

    public Patient()
    {

    }

    public Patient(String name, int age, int bprate, Doctor doctor) {
        this.name = name;
        this.age = age;
        this.bprate = bprate;
        this.doctor = doctor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id= id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getBprate() {
        return bprate;
    }

    public void setBprate(int bprate) { this.bprate = bprate; }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Patient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", bprate=" + bprate +
                ", doctor=" + doctor +
                '}';
    }
}


