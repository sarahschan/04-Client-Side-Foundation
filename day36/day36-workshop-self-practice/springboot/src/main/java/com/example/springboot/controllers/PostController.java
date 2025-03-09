package com.example.springboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springboot.services.PostService;

import jakarta.json.Json;
import jakarta.json.JsonObject;


@RestController
public class PostController {
    
    @Autowired
    PostService postService;

    
    @PostMapping("/api/post")
    public ResponseEntity<String> insertNewPost(@RequestPart("imageFile") MultipartFile imageFile, @RequestPart("comments") String comments) {
        
        String postId = "";

        try {
            
            postId = postService.insertNewPost(imageFile, comments);
            System.out.println("Post saved to mySQL, ID: " + postId);

            JsonObject payload = Json.createObjectBuilder()
                .add("postId", postId)
                .build();

            return ResponseEntity.status(200).body(payload.toString());

        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }



}
