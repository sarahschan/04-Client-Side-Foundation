package com.example.springboot.models;

import java.util.Arrays;

public class Post {
    
    private String postId;
    private String comments;
    private byte[] picture;


    public String getPostId() {
        return postId;
    }
    public void setPostId(String postId) {
        this.postId = postId;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    public byte[] getPicture() {
        return picture;
    }
    public void setPicture(byte[] picture) {
        this.picture = picture;
    }


    @Override
    public String toString() {
        return "Post [postId=" + postId + ", comments=" + comments + ", picture=" + Arrays.toString(picture) + "]";
    }

}
