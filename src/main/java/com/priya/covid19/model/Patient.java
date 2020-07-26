package com.priya.covid19.model;

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

    public Patient()
    {

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


