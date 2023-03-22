package com.threec.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threec.beans.Address;
import com.threec.beans.Consumer;
import com.threec.dao.AddressDao;
import com.threec.dao.ConsumerDao;

@Service
public class AddressServiceImpl implements AddressService{
	@Autowired
	AddressDao addressDao;
	@Autowired
	ConsumerDao consumerDao;
	
	
	@Override
	public Address createAddress(Address address) {
		
		int consumerId=address.getConsumer().getConsumerId();
		Optional<Consumer> op=consumerDao.findById(consumerId);
		
		if(op.isPresent()) {
			Consumer consumer=op.get();
			address.setConsumer(consumer);
		}
		
		return addressDao.save(address);
	}

	@Override
	public List<Address> readAddresses() {
		return addressDao.findAll();
	}

	@Override
	public Address readAddress(int addressId) {
		Optional<Address> op=addressDao.findById(addressId);
		return op.orElse(null);
	}

	@Override
	public boolean deleteAddress(int addressId) {
		Address address=readAddress(addressId);
		if(address!=null) {
			addressDao.deleteById(address.getAddressId());
			return true;
		}
		return false;
	}

	@Override
	public List<Address> getAddressByConsumer(int consumerId) {
		return addressDao.getAddressByConsumer(consumerId);
	}
}
