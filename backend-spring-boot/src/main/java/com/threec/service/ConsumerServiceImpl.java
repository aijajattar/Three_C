package com.threec.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threec.beans.Consumer;
import com.threec.beans.Post;
import com.threec.dao.ConsumerDao;

@Service
public class ConsumerServiceImpl implements ConsumerService{
	@Autowired
	ConsumerDao consumerDao;

	// CREATE
	public Consumer createConsumer(Consumer consumer) {
		return consumerDao.save(consumer);
	}

	// READ ONE
	@Override
	public Consumer readConsumer(int consumerId) {
		Optional<Consumer> consumer=consumerDao.findById(consumerId);
		return consumer.orElse(null);
	}

	// READ ALL
	@Override
	public List<Consumer> readAllConsumers() {
		return consumerDao.findAll();
	}

	// UPDATE
	@Override
	public Consumer updateConsumer(Consumer consumer) {
		//	========= OLD LOGIC =========
		// it was making checks first, making code slow in case of user not existing
		//		if(consumer.getConsumerId()!=0 && consumer.getName()!=null && consumer.getPassword()!=null) {
		//			Optional<Consumer> old=consumerDao.findById(consumer.getConsumerId());
		//			if(old.isPresent()) {
		//				Consumer newConsumer=old.get();
		//				newConsumer.setName(consumer.getName());
		//				newConsumer.setPassword(consumer.getPassword());
		//				consumerDao.save(newConsumer);
		//				return newConsumer;
		//			}
		//		}
		//		return null;
		// ========= NEW LOGIC =========
		Consumer old=readConsumer(consumer.getConsumerId());
		if(old==null) return null;
		if(consumer.getFullname()!=null) old.setFullname(consumer.getFullname());
		if(consumer.getEmail()!=null) old.setEmail(consumer.getEmail());
		if(consumer.getPassword()!=null) old.setPassword(consumer.getPassword());
		if(consumer.getPhone()!=0) old.setPhone(consumer.getPhone());
		if(consumer.getUsername()!=null) old.setUsername(consumer.getUsername());
		return consumerDao.save(old);
	}

	// DELETE
	@Override
	public boolean deleteConsumer(int consumerId) {
		Consumer consumer= readConsumer(consumerId);
		if(consumer!=null) {
			consumerDao.deleteById(consumerId);
			return true;
		}
		return false;
	}

	// LOGIN
	@Override
	public Consumer getLogin(Consumer consumer) {
		Consumer user=null;
		if(consumer!=null) {
			user= consumerDao.getLogin(consumer.getUsername());
			System.out.println(consumer.getUsername());
//			System.out.println(user.getPassword()==consumer.getPassword());
//			System.out.println(consumer.getPassword());
		}
		
		if(user==null) return null;
		
		else if(user.getPassword().equals(consumer.getPassword())) {
			user=readConsumer(user.getConsumerId());
			user.setPassword(null);
			return  user;
		}
		return null;
	}

	// ADD POST
	@Override
	public Consumer addPost(Consumer consumer) {
		int id=consumer.getConsumerId();
		System.out.println(id);
		Optional<Consumer> findCon=consumerDao.findById(id);
		if(findCon.isPresent()) {
			Consumer con=findCon.get();
			//			System.out.println(con);
			List<Post> plist=con.getPosts();
			//			System.out.println(plist.get(0).getTitle());
			if(plist==null) plist=new ArrayList<>();
			plist.addAll(consumer.getPosts());
			Post post=plist.get(0);
			post.setConsumer(con);
			Consumer saved=consumerDao.save(con);
			if(saved!=null) return saved;
		}
		return null;
	}
}
