package com.example.springboot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.springboot.repositories.PostRepository;

@Service
public class PostService {
    
    @Autowired
    PostRepository postRepository;
    
    public String insertNewPost(MultipartFile imageFile, String comments) {
        return postRepository.insertNewPost(imageFile, comments);
    }
}
