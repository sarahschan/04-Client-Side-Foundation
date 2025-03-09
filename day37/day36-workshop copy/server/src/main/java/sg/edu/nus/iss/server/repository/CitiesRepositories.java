package sg.edu.nus.iss.server.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.server.models.City;

@Repository
public class CitiesRepositories {
    
    @Autowired
    JdbcTemplate jdbcTemplate;


    private static final String SELECT_ALL_CITIES = 
        "SELECT code, city_name FROM cities";

    public List<City> getAllCities() {
        return jdbcTemplate.query(SELECT_ALL_CITIES, (rs, rowNum) -> {
            return City.toCity(rs);
        });
    }

}
