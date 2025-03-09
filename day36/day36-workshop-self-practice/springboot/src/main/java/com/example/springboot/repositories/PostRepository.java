package com.example.springboot.repositories;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public class PostRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String INSERT_NEW_POST = 
        "insert into posts2 (post_id, comments, picture) values (?, ?, ?)";



    public String insertNewPost(MultipartFile imageFile, String comments) {

        System.out.println("In PostRepository, attempting to save post to mySQL");

        String postId = UUID.randomUUID().toString()
            .replace("-", "")
            .substring(0,8);


        try {
            
            System.out.println("in try block");

            byte[] imageFileBytes = imageFile.getBytes();
            jdbcTemplate.update(INSERT_NEW_POST, ps -> {
                ps.setString(1, postId);
                ps.setString(2, comments);
                ps.setBytes(3, imageFileBytes);
            });

            System.out.println("Post saved to mySQL");
            return postId;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while saving post");
        }

    }


}
