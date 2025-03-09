package sg.edu.nus.iss.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.server.models.City;
import sg.edu.nus.iss.server.services.CitiesService;

@RestController
public class CitiesController {
    
    @Autowired
    private CitiesService citiesService;



    @GetMapping(path = "/api/cities", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getCities() {
        
        Optional<List<City>> cities = citiesService.getAllCities();

        JsonArray result = null;
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        cities.get().forEach( city -> {
            jsonArrayBuilder.add(city.toJson());
        });

        result = jsonArrayBuilder.build();


        return ResponseEntity.status(200).contentType(MediaType.APPLICATION_JSON).body(result.toString());


    }



}
