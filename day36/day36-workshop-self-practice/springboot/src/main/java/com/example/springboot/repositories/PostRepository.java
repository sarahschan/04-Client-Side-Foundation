package com.example.springboot.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.example.springboot.models.Post;

@Repository
public class PostRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String INSERT_NEW_POST = 
        "insert into posts2 (post_id, comments, picture) values (?, ?, ?)";

    private static final String GET_POST_BY_ID =
        "SELECT * FROM posts2 where post_id = ?";


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


    public Optional<Post> getPostById(String postId) {
        
        try {
            Post foundPost = jdbcTemplate.queryForObject(GET_POST_BY_ID, BeanPropertyRowMapper.newInstance(Post.class), postId);
            // IF USING BEAN PROPERTY ROW MAPPER MAKE SURE THE CLASS' VARIABLES HAVE THE SAME NAME AS THE SQL ROWS OMFG
            return Optional.of(foundPost);

        } catch (DataAccessException ex) {
            return Optional.empty();
        }
    }

}
