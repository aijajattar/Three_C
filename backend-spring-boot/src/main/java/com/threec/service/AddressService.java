package com.threec.service;

import java.util.List;

import com.threec.beans.Address;

public interface AddressService {

	Address createAddress(Address address);

	List<Address> readAddresses();

	Address readAddress(int addressId);

	boolean deleteAddress(int addressId);

	List<Address> getAddressByConsumer(int consumerId);

}
