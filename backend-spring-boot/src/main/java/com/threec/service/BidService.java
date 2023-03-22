package com.threec.service;

import java.util.List;

import com.threec.beans.Bid;
import com.threec.beans.Consumer;

public interface BidService {

	Bid createBid(Bid bid);

	Bid readBid(int bidId);

	List<Bid> readAllBids();

	boolean deleteBid(int bidId);

	List<Bid> getBySP(int spid);

	List<Bid> getByPost(int postId);

	Bid acceptBid(int bidId);

	Consumer getContact(int bidId);

	String getSPbyBid(int bidId);

}
