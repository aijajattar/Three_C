package com.threec.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threec.beans.Consumer;
import com.threec.beans.Post;
import com.threec.dao.ConsumerDao;
import com.threec.dao.PostDao;

import jakarta.persistence.OptimisticLockException;

@Service
public class PostServiceImpl implements PostService{
	@Autowired
	PostDao postDao;
	@Autowired
	ConsumerDao consumerDao;
	
	@Override
	public Post createPost(Post post) {
//		== OLD LOGIC == it caused multiple trips to database
		
//		int consumerId=post.getConsumer().getConsumerId();
//		Optional<Consumer> op=consumerDao.findById(consumerId);
//		if(op.isPresent()) {
//			post.setConsumer(op.get());
//			return postDao.save(post);
//		}
//		return null;
		
//		== NEW LOGIC ==
		try {
			return postDao.save(post);
		}catch (Exception e) {
			
		}
		return null;
	}

	@Override
	public Post readPost(int postId) {
		Optional<Post> post=postDao.findById(postId);
		return post.orElse(null);
	}

	@Override
	public List<Post> readAllPosts() {
		return postDao.findAll();
	}

	@Override
	public boolean deletePost(int postId) {
		Post post=readPost(postId);
		if(post!=null) {
			postDao.delete(post);
			return true;
		}
		return false;
	}

	@Override
	public List<Post> readByExpertise(List<Integer> elist) {
		return postDao.readByExpertise(elist);
	}
	
}
