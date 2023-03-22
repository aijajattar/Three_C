package com.threec.beans;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
public class Bid {
	@Id
	@GeneratedValue
	private int bidId;
	@OneToOne(fetch = FetchType.EAGER)
	@JsonProperty(access = Access.WRITE_ONLY)
	private Post post;
	@OneToOne(fetch = FetchType.LAZY)
	@JsonProperty(access = Access.WRITE_ONLY)
	private ServiceProvider serviceProvider;
	private double amount;
	private String note;
	private boolean accepted;
}
