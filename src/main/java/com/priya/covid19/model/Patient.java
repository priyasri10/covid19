package com.priya.covid19.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "doctor_id", nullable = true)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private Doctor doctor;

    public Patient(String name, int age, int bprate, Doctor doctor) {
        this.name = name;
        this.age = age;
        this.bprate = bprate;
        this.doctor = doctor;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public Patient()
    {

    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient(String name, int age, int bprate)
    {
        this.name = name;
        this.age = age;
        this.bprate = bprate;
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

    @Override
    public String toString()
    {
        return "Patient [ id=" + id + ", name=" + name + ", age=" + age + ", bprate=" + bprate +"]";
    }

}


