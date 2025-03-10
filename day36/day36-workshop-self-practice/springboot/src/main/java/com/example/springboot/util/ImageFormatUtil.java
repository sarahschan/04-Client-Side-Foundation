package com.example.springboot.util;

import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class ImageFormatUtil {
    
    public String prepareImageDataString(byte[] imageBytes){

        String mimeType = determineImageMimeType(imageBytes);
        String encodedImageString = Base64.getEncoder().encodeToString(imageBytes);
        String imageDataToSend = "data:" + mimeType + ";base64," + encodedImageString;

        return imageDataToSend;
    }


    private String determineImageMimeType(byte[] imageBytes) {
        // Check file signature bytes to determine image type
        if (imageBytes.length > 2) {
        // JPEG signature: starts with FF D8 FF
        if (imageBytes[0] == (byte) 0xFF && imageBytes[1] == (byte) 0xD8 && imageBytes[2] == (byte) 0xFF) {
            return "image/jpeg";
        }
        
        // PNG signature: starts with 89 50 4E 47
        if (imageBytes.length > 3 && imageBytes[0] == (byte) 0x89 && imageBytes[1] == (byte) 0x50 && 
            imageBytes[2] == (byte) 0x4E && imageBytes[3] == (byte) 0x47) {
            return "image/png";
        }
    }
    
    // If we couldn't determine the type, default to JPEG
    // This is a reasonable default since JPEG is more common
    return "image/jpeg";
    }
}
