package com.threec.service;

import java.util.List;

import com.threec.beans.ServiceProvider;

public interface ServiceProviderService {

	ServiceProvider createServiceProvider(ServiceProvider sp);

	ServiceProvider readServiceProvider(int serviceProviderId);

	List<ServiceProvider> readAll();

	boolean deleteSP(int spid);

	ServiceProvider getLogin(ServiceProvider sp);

}
