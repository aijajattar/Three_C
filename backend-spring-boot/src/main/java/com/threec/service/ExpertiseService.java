package com.threec.service;

import java.util.List;

import com.threec.beans.Expertise;

public interface ExpertiseService {

	Expertise createExpertise(Expertise expertise);

	Expertise readExpertise(int expertiseId);

	List<Expertise> readAllExpertises();

	boolean deleteExpertise(int expertiseId);

}
