package sg.edu.nus.iss.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.server.models.City;
import sg.edu.nus.iss.server.repository.CitiesRepositories;

@Service
public class CitiesService {
    
    @Autowired
    private CitiesRepositories citiesRepositories;


    public Optional<List<City>> getAllCities() {
        
        List<City> cities = this.citiesRepositories.getAllCities();

        if (cities != null && !cities.isEmpty()) {
            return Optional.of(cities);

        } else {
            return Optional.empty();
        }

    }
}
