package com.threec.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threec.beans.Address;
import com.threec.service.AddressService;

@RestController
@RequestMapping("/address")
@CrossOrigin("*")
public class AddressController {
	@Autowired
	AddressService addressService;
	
	// <======== CRUD OPERATIONS ========>
	
	// CREATE
	@PostMapping("/addresses")
	public ResponseEntity<Address> createAddress(@RequestBody Address address){
		
		Address created=addressService.createAddress(address);
		
		if(created!=null) return ResponseEntity.ok(created);
		
		return new ResponseEntity<Address>(HttpStatus.BAD_REQUEST);
	}
	
	// READ ONE
	@GetMapping("/addresses/{addressId}")
	public ResponseEntity<Address> readAddress(@PathVariable int addressId){
		
		Address address=addressService.readAddress(addressId);
		
		if(address!=null) return ResponseEntity.ok(address);
		
		return new ResponseEntity<Address>(HttpStatus.NOT_FOUND);
	}
	
	// READ ALL
	@GetMapping("/addresses")
	public ResponseEntity<List<Address>> readAllAddresses(){
		
		List<Address> alist=addressService.readAddresses();
		
		if(alist!=null) return ResponseEntity.ok(alist);
		
		return new ResponseEntity<List<Address>>(HttpStatus.BAD_REQUEST);
	}
	
	// UPDATE
	@PutMapping("/addresses/{addressId}")
	public ResponseEntity<Address> updateAddress(@PathVariable int addressId){
		return null;
	}
	
	// DELETE
	@DeleteMapping("/addresses/{addressId}")
	public ResponseEntity<String> deleteAddress(@PathVariable int addressId){
		
		boolean status=addressService.deleteAddress(addressId);
		
		if(status) return ResponseEntity.ok("Deleted successfully!");
		
		return new ResponseEntity<String>("Address not present", HttpStatus.NOT_FOUND);
	}
	
	// <======== SPECIAL OPERATIONS ========>
	
	// LIST OF ADDRESSES BY CONSUMER ID
	@GetMapping("/consumer/{consumerId}")
	public ResponseEntity<List<Address>> getAddressByConsumer(@PathVariable int consumerId){
		
		List<Address> alist=addressService.getAddressByConsumer(consumerId);
		
		if(alist!=null) return ResponseEntity.ok(alist);
		
		return new ResponseEntity<List<Address>>(HttpStatus.NOT_FOUND);
	}
	
}
