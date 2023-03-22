package com.threec.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.threec.beans.ServiceProvider;

public interface ServiceProviderDao extends JpaRepository<ServiceProvider, Integer>{

	@Query("select new ServiceProvider(sp.serviceProviderId, sp.username, sp.password) from ServiceProvider sp where sp.username=:n")
	ServiceProvider getLogin(@Param("n") String username);

}
