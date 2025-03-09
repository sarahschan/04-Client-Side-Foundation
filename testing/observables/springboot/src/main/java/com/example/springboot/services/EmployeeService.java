package com.example.springboot.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.models.Employee;
import com.example.springboot.repositories.EmployeeRepo;

@Service
public class EmployeeService {
    
    @Autowired
    EmployeeRepo employeeRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.getAllEmployees();
    }


    public void addEmployee(String name, String email) {
        employeeRepo.addEmployee(name, email);
    }
}
