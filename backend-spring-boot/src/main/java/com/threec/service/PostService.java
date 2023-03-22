package com.threec.service;

import java.util.List;

import com.threec.beans.Post;

public interface PostService {

	Post createPost(Post post);

	Post readPost(int postId);

	List<Post> readAllPosts();

	boolean deletePost(int postId);

	List<Post> readByExpertise(List<Integer> elist);


}
