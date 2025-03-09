package com.example.springboot.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.example.springboot.models.Employee;

@Repository
public class EmployeeRepo {
    
    public static final String GET_ALL_EMPLOYEES = 
        " select * from employees ";

    public static final String ADD_EMPLOYEE = 
        " insert into employees (name, email) values (?, ?) ";
        

    @Autowired
    JdbcTemplate jdbcTemplate;


    public List<Employee> getAllEmployees() {
        
        List<Employee> employees = new ArrayList<>();

        SqlRowSet rs = jdbcTemplate.queryForRowSet(GET_ALL_EMPLOYEES);

        while (rs.next()) {
            employees.add(Employee.toEmployee(rs));
        }

        return employees;

    }


    public void addEmployee(String name, String email) {
        jdbcTemplate.update(ADD_EMPLOYEE, name, email);
    }
}
