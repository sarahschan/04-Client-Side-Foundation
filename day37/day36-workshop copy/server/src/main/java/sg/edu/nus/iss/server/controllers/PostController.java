package sg.edu.nus.iss.server.controllers;


import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import sg.edu.nus.iss.server.models.Post;
import sg.edu.nus.iss.server.services.PostService;
import sg.edu.nus.iss.server.services.S3Service;

@RestController
public class PostController {
    
    @Autowired
    PostService postService;

    @Autowired
    S3Service s3Service;

    private static final String BASE64_PREFIX = "data:image/png;base64,";



    @PostMapping(path = "/api/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadPost(@RequestPart("file") MultipartFile imageFile, @RequestPart("comments") String comments){

        String postId = "";

        try {
            
            postId = postService.postUpload(imageFile, comments);
            System.out.println("Post saved to SQL, ID: " + postId);

            if (postId != null && !postId.isBlank()){
                String s3ImageUrl = s3Service.upload(imageFile, comments, postId);
                System.out.println(s3ImageUrl);
            }


        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

        JsonObject payload = Json.createObjectBuilder()
            .add("postId", postId)
            .build();

        return ResponseEntity.ok().body(payload.toString());

    }



    @GetMapping(path = "/api/get-post/{postId}")
    public ResponseEntity<String> getPost(@PathVariable String postId) {
        
        Optional<Post> opt = postService.getPostById(postId);

        if (opt.isPresent()) {
            Post foundPost = opt.get();
            String encodedImageString = Base64.getEncoder()
                                            .encodeToString(foundPost.getImage());
            JsonObject payload = Json.createObjectBuilder()
                .add("image", BASE64_PREFIX + encodedImageString)
                .add("comments", foundPost.getComments())
                .build();

            return ResponseEntity.ok().body(payload.toString());

        } else {
            return ResponseEntity.status(500).body("");
        }


    }

}
