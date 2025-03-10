package com.example.springboot.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springboot.models.Post;
import com.example.springboot.services.PostService;
import com.example.springboot.util.ImageFormatUtil;

import jakarta.json.Json;
import jakarta.json.JsonObject;


@RestController
public class PostController {
    
    @Autowired
    PostService postService;

    @Autowired
    ImageFormatUtil imageFormatUtil;

    
    @PostMapping("/api/post")
    public ResponseEntity<String> insertNewPost(@RequestPart("imageFile") MultipartFile imageFile, @RequestPart("comments") String comments) {
        
        String postId = "";

        System.out.println(comments);

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


    @GetMapping("/api/post/{postId}")
    public ResponseEntity<String> getPostById(@PathVariable String postId) {
        
        Optional<Post> opt = postService.getPostById(postId);

        if (opt.isPresent()) {
            
            Post foundPost = opt.get();
            
            String imageDataToSend = imageFormatUtil.prepareImageDataString(foundPost.getPicture());

            JsonObject payload = Json.createObjectBuilder()
                .add("image", imageDataToSend)
                .add("comments", foundPost.getComments())
                .build();

            return ResponseEntity.ok().body(payload.toString());


        } else {
            
            System.out.println("Cannot find post " + postId);
            JsonObject payload = Json.createObjectBuilder()
                .add("error", String.format("Post %s not found", postId))
                .build();

            return ResponseEntity.status(404).body(payload.toString());
        }

    }



}
