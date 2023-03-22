package com.threec.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.threec.beans.Bid;
import com.threec.beans.Consumer;

public interface BidDao extends JpaRepository<Bid, Integer>{

	@Query("select bid from Bid bid where bid.serviceProvider.serviceProviderId=:n")
	List<Bid> getBySP(@Param("n") int spid);

	@Query("select bid from Bid bid where bid.post.postId=:n")
	List<Bid> getByPost(@Param("n")int postId);

	@Query("select new Consumer(bid.post.consumer.fullname, bid.post.consumer.phone) from Bid bid where bidId=:n")
	Consumer getContact(@Param("n")int bidId);

	@Query("select b.serviceProvider.fullname from Bid b where b.bidId=:n")
	String getSPbyBid(@Param("n") int bidId);

}
