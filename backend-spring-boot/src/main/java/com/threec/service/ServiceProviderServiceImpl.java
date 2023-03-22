package com.threec.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threec.beans.ServiceProvider;
import com.threec.dao.ServiceProviderDao;

@Service
public class ServiceProviderServiceImpl implements ServiceProviderService{

	@Autowired
	ServiceProviderDao serviceProviderDao;

	@Override
	public ServiceProvider createServiceProvider(ServiceProvider sp) {
		return serviceProviderDao.save(sp);
	}

	@Override
	public ServiceProvider readServiceProvider(int serviceProviderId) {
		Optional<ServiceProvider> op=serviceProviderDao.findById(serviceProviderId);
		return op.orElse(null);
	}

	@Override
	public List<ServiceProvider> readAll() {
		return serviceProviderDao.findAll();
	}

	@Override
	public boolean deleteSP(int spid) {
		ServiceProvider sp=readServiceProvider(spid);
		if(sp==null) return false;
		serviceProviderDao.delete(sp);
		return true;
	}

	@Override
	public ServiceProvider getLogin(ServiceProvider sp) {
		ServiceProvider valid=serviceProviderDao.getLogin(sp.getUsername());
//		System.out.println(valid.getServiceProviderId());
//		System.out.println(valid.getPassword().hashCode());
//		System.out.println(sp.getPassword());
//		System.out.println(valid.getPassword());
//		System.out.println(valid.getPassword().compareTo(sp.getUsername()));
		if(valid==null) {
			return null;
		}
		if(valid.getPassword().equals(sp.getPassword())) {
			
			ServiceProvider readSP=readServiceProvider(valid.getServiceProviderId());
			readSP.setPassword(null);
			return readSP;
		}
		return null;
	}
	
}
