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

import com.threec.beans.Expertise;
import com.threec.service.ExpertiseService;

@RestController
@RequestMapping("/expertise")
@CrossOrigin("*")
public class ExpertiseController {
	@Autowired
	ExpertiseService expertiseService;
	
	// CREATE
	@PostMapping("/expertises")
	public ResponseEntity<Expertise> createExpertise(@RequestBody Expertise expertise){
		Expertise created=expertiseService.createExpertise(expertise);
		if(created!=null) return ResponseEntity.ok(created);
		return new ResponseEntity<Expertise>(HttpStatus.BAD_REQUEST);
	}
	
	// READ ONE
	@GetMapping("/expertises/{expertiseId}")
	public ResponseEntity<Expertise> readExpertise(@PathVariable int expertiseId){
		Expertise read=expertiseService.readExpertise(expertiseId);
		if(read!=null) return ResponseEntity.ok(read);
		return new ResponseEntity<Expertise>(HttpStatus.NOT_FOUND);
	}
	
	// READ ALL
	@GetMapping("/expertises")
	public ResponseEntity<List<Expertise>> readAllExpertises(){
		List<Expertise> elist=expertiseService.readAllExpertises();
		if(elist!=null) return ResponseEntity.ok(elist);
		return new ResponseEntity<List<Expertise>>(HttpStatus.NOT_FOUND);
	}
	
	// UPDATE
	
	// DELETE
	@DeleteMapping("/expertises/{expertiseId}")
	public ResponseEntity<String> deleteExpertise(@PathVariable int expertiseId){
		boolean status=expertiseService.deleteExpertise(expertiseId);
		if(status) return ResponseEntity.ok("Deleted successfully!");
		return new ResponseEntity<String>("Expertise not present!", HttpStatus.NOT_FOUND);
	}
}
