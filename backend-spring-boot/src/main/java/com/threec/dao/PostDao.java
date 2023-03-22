package com.threec.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.threec.beans.Post;

public interface PostDao extends JpaRepository<Post, Integer>{

	@Query("select p from Post p where p.category.expertiseId in :list")
	List<Post> readByExpertise(@Param("list") List<Integer> elist);

}
