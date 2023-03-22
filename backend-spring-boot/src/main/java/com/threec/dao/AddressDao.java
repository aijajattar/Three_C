package com.threec.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.threec.beans.Address;

public interface AddressDao extends JpaRepository<Address, Integer>{

	@Query("select a from Address a where a.consumer.consumerId=:n")
	List<Address> getAddressByConsumer(@Param("n") int consumerId);

}
