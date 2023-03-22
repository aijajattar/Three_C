package com.threec.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.threec.beans.Expertise;
import com.threec.dao.ExpertiseDao;

@Service
public class ExpertiseServiceImpl implements ExpertiseService{
	@Autowired
	ExpertiseDao expertiseDao;

	@Override
	public Expertise createExpertise(Expertise expertise) {
		return expertiseDao.save(expertise);
	}

	@Override
	public Expertise readExpertise(int expertiseId) {
		Optional<Expertise> read=expertiseDao.findById(expertiseId);
		return read.orElse(null);
	}

	@Override
	public List<Expertise> readAllExpertises() {
		return expertiseDao.findAll();
	}

	@Override
	public boolean deleteExpertise(int expertiseId) {
		Expertise expertise=readExpertise(expertiseId);
		if(expertise==null) return false;
		expertiseDao.delete(expertise);
		return true;
	}
}