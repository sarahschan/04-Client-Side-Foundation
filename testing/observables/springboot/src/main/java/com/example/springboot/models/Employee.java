package com.example.springboot.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

public class Employee {
    
    private int empId;
    private String name;
    private String email;

    
    @Override
    public String toString() {
        return "Employee [empId=" + empId + ", name=" + name + ", email=" + email + "]";
    }


    public int getEmpId() {
        return empId;
    }
    public void setEmpId(int empId) {
        this.empId = empId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }


    public static Employee toEmployee(SqlRowSet rs) {
        Employee employee = new Employee();
            employee.setEmpId(rs.getInt("id"));
            employee.setName(rs.getString("name"));
            employee.setEmail(rs.getString("email"));
        return employee;
    }
    
}
