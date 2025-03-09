package sg.edu.nus.iss.server.repository;

import java.io.IOException;
import java.sql.ResultSet;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import sg.edu.nus.iss.server.models.Post;

@Repository
public class PostRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;


    public String postUpload(MultipartFile imageFile, String comments){
        
        System.out.println("Attempting to save post and image to mySQL");

        String postId = UUID.randomUUID().toString()
                            .replace("-", "")
                            .substring(0, 8);

        try {
            byte[] imageFileBytes = imageFile.getBytes();
            jdbcTemplate.update(Queries.INSERT_POST, ps -> {
                ps.setString(1, postId);
                ps.setString(2, comments);
                ps.setBytes(3, imageFileBytes);
            });
            System.out.println("File save success");

        } catch (IOException e) {
            throw new RuntimeException("Error while uploading file");
        }
        
        return postId;
    }


    public Optional<Post> getPostById(String postId) {
        
        try {
            Post foundPost = jdbcTemplate.queryForObject(Queries.GET_POST_BY_ID, BeanPropertyRowMapper.newInstance(Post.class), postId);
            return Optional.of(foundPost);

        } catch (DataAccessException ex) {
            System.out.println("The post cannot be found in the database");
            return Optional.empty();
        }


        // // Alternate method
        // return jdbcTemplate.query(
        //     Queries.GET_POST_BY_ID, 
        //     (ResultSet rs) -> {
        //         if (rs.next()){
        //             return Optional.of(Post.toPost(rs));

        //         } else {
        //             return Optional.empty();
        //         }
        //     },
        //     postId);

    }


}
