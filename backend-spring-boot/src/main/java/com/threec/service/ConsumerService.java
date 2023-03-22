package com.threec.service;

import java.util.List;

import com.threec.beans.Consumer;

public interface ConsumerService {

	Consumer createConsumer(Consumer consumer);

	Consumer readConsumer(int consumerId);

	List<Consumer> readAllConsumers();

	Consumer updateConsumer(Consumer consumer);

	boolean deleteConsumer(int consumerId);

	Consumer addPost(Consumer consumer);

	Consumer getLogin(Consumer consumer);


}
