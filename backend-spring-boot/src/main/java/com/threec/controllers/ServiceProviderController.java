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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threec.beans.ServiceProvider;
import com.threec.service.ServiceProviderService;

@RestController
@RequestMapping("/serviceprovider")
@CrossOrigin("*")
public class ServiceProviderController {
	@Autowired
	ServiceProviderService serviceProviderService;
	
	// CREATE
	@PostMapping("/serviceproviders")
	public ResponseEntity<ServiceProvider> createServiceProvider(@RequestBody ServiceProvider sp){
		System.out.println(sp.getExpertise());
		
		ServiceProvider created=serviceProviderService.createServiceProvider(sp);
		if(created!=null) return ResponseEntity.ok(created);
		return new ResponseEntity<ServiceProvider>(HttpStatus.BAD_REQUEST);
	}
	
	// READ ONE
	@GetMapping("/serviceProviders/{serviceProviderId}")
	public ResponseEntity<ServiceProvider> readServiceProvider(@PathVariable int serviceProviderId){
		ServiceProvider sp=serviceProviderService.readServiceProvider(serviceProviderId);
		if(sp!=null) return ResponseEntity.ok(sp);
		return new ResponseEntity<ServiceProvider>(HttpStatus.NOT_FOUND);
	}
	
	// READ ALL
	@GetMapping("/serviceproviders")
	public ResponseEntity<List<ServiceProvider>> readAllSP(){
		List<ServiceProvider> splist=serviceProviderService.readAll();
		if(splist!=null) return ResponseEntity.ok(splist);
		return new ResponseEntity<List<ServiceProvider>>(HttpStatus.NOT_FOUND);
	}
	
	// UPDATE
	
	// DELETE
	@DeleteMapping("/serviceProviders/{spid}")
	public ResponseEntity<String> deleteSP(@PathVariable int spid){
		boolean status=serviceProviderService.deleteSP(spid);
		if(status) return ResponseEntity.ok("Deleted Successfully!");
		return new ResponseEntity<String>("Service Provider not present!", HttpStatus.NOT_FOUND);
	}
	
	// LOGIN
	@PostMapping("/login")
	public ResponseEntity<ServiceProvider> login(@RequestBody ServiceProvider sp){
		System.out.println(sp.getUsername());
		System.out.println(sp.getPassword());
		ServiceProvider valid=serviceProviderService.getLogin(sp);
		if(valid!=null) return ResponseEntity.ok(valid);
		return new ResponseEntity<ServiceProvider>(HttpStatus.NOT_FOUND);
	}
	
}
