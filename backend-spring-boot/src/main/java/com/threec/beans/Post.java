package com.threec.beans;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int postId;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "consumerId")
	@JsonProperty(access = Access.WRITE_ONLY)
	private Consumer consumer;
	private String title;
	private String description;
	@OneToOne(fetch = FetchType.EAGER)
	private Expertise category;
	private Date date;
	private String status;//bids open 2. close 3.pending work 4. work completed 
	@OneToOne(fetch = FetchType.EAGER)
	private Address address;
	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Bid> bids;
}
