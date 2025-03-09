package sg.edu.nus.iss.server.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${do.storage.bucket}")
    private String bucketName;

    @Value("${do.storage.endpoint}")
    private String endPoint;


    public String upload(MultipartFile file, String comments, String postId) throws IOException {

        System.out.println("Attempting to save to digital ocean");
        System.out.println("Filetype: " + file.getContentType());
        System.out.println("Filename: " + file.getOriginalFilename());

        Map<String, String> metadata = Map.of(
            "comments", comments,
            "postId", postId,
            "uploadDatetime", String.valueOf(System.currentTimeMillis()));

        ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setUserMetadata(metadata);

        String origFilename = file.getOriginalFilename();
        String finalFilename = "";

        if (origFilename.equals("blob")) {
            finalFilename = postId + ".png";
        }

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, finalFilename, file.getInputStream(), objectMetadata);
        putObjectRequest.withCannedAcl(CannedAccessControlList.PublicRead);
        amazonS3.putObject(putObjectRequest);

        String imgUrl = String.format("https://%s.%s/%s", bucketName, endPoint, finalFilename);

        return imgUrl;

    }
}
