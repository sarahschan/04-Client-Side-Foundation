package sg.edu.nus.iss.server.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sg.edu.nus.iss.server.models.Post;
import sg.edu.nus.iss.server.repository.PostRepository;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    public String postUpload(MultipartFile imageFile, String comments) {
        return postRepository.postUpload(imageFile, comments);
    }


    public Optional<Post> getPostById(String postId) {
        return postRepository.getPostById(postId);
    }
}
