package com.example.springboot.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.models.Employee;
import com.example.springboot.services.EmployeeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {
    
    @Autowired
    EmployeeService employeeService;


    @GetMapping("/getAll")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        
        List<Employee> employees = employeeService.getAllEmployees();

        return ResponseEntity.ok().body(employees);

    }


    @PostMapping("/addNew")
    public ResponseEntity<String> addNewEmployee(@RequestBody Map<String, String> requestBody) {
        
        String name = requestBody.get("name");
        String email = requestBody.get("email");
        System.out.println(String.format("recieved in RequestBody name: %s, email: %s", name, email));

        employeeService.addEmployee(name, email);

        return ResponseEntity.ok().body(null);

    }
    
}
