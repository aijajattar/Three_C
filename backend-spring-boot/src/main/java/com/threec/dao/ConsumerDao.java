package com.threec.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.threec.beans.Consumer;

public interface ConsumerDao extends JpaRepository<Consumer, Integer>{
	
	@Query("select new Consumer(c.consumerId, c.username, c.password, c.salt) from Consumer c where c.username =:n")
	public Consumer getLogin(@Param("n") String name);

}
