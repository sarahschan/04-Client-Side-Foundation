package sg.edu.nus.iss.server.repository;

public class Queries {
    
    public static final String INSERT_POST =
        "INSERT INTO posts VALUES (?, ?, ?)";


    public static final String GET_POST_BY_ID =
        "SELECT post_id, comments, image FROM posts where post_id = ?";
}
