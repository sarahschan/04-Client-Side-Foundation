package com.example.springboot.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.springboot.models.Post;
import com.example.springboot.repositories.PostRepository;

@Service
public class PostService {
    
    @Autowired
    PostRepository postRepository;
    
    public String insertNewPost(MultipartFile imageFile, String comments) {
        return postRepository.insertNewPost(imageFile, comments);
    }

    public Optional<Post> getPostById(String postId) {
        return postRepository.getPostById(postId);
    }
}
