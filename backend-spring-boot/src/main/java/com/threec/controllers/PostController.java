package com.threec.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threec.beans.Expertise;
import com.threec.beans.Post;
import com.threec.service.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin("*")
public class PostController {
	
	@Autowired
	PostService postService;
	
	// CREATE
	@PostMapping("/posts")
	public ResponseEntity<Post> createPost(@RequestBody Post post){
		Post createdPost=postService.createPost(post);
		if(createdPost!=null) return ResponseEntity.ok(createdPost);
		return new ResponseEntity<Post>(HttpStatus.BAD_REQUEST);
	}
	
	// READ ONE
	@GetMapping("/posts/{postId}")
	public ResponseEntity<Post> readPost(@PathVariable int postId){
		Post post=postService.readPost(postId);
		if(post!=null) return ResponseEntity.ok(post);
		return new ResponseEntity<Post>(HttpStatus.NOT_FOUND);
	}
	
	// READ ALL
	@GetMapping("/posts")
	public ResponseEntity<List<Post>> readAllPosts(){
		List<Post> plist=postService.readAllPosts();
		if(plist!=null) return ResponseEntity.ok(plist);
		return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
	}
	
	// UPDATE
	
	// DELETE
	@DeleteMapping("/posts/{postId}")
	public ResponseEntity<String> deletePost(@PathVariable int postId){
		boolean status=postService.deletePost(postId);
		if(status) return ResponseEntity.ok("Deleted successfully");
		return new ResponseEntity<String>("Post not present", HttpStatus.NOT_FOUND);
	}
	
	// POSTS BY EXPERTISE
	@PostMapping("/expertise")
	public ResponseEntity<List<Post>> postsByExpertise(@RequestBody List<Integer> elist){
		List<Post> plist=postService.readByExpertise(elist);
		if(plist==null) return new ResponseEntity<List<Post>>(HttpStatus.NOT_FOUND);
		return ResponseEntity.ok(plist);
	}
	
}
