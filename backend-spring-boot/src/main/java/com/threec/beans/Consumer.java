package com.threec.beans;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"phone", "email", "username"}))
public class Consumer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int consumerId;
	// BASIC DETAILS
	private String fullname;
	private long phone;
	private String email;
	// AUTHENTICATION DETAILS
	private String username;
	private String password;
	@JsonIgnore
	private String salt;
	// EXTRA DETAILS
	@OneToMany(mappedBy = "consumer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Address> addresses;
	@OneToMany(mappedBy = "consumer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Post> posts;

	// constructor for DAO
	public Consumer(int consumerId, String username, String password, String salt) {
		this.consumerId=consumerId;
		this.username=username;
		this.password=password;
		this.salt=salt;
	}

	// constructor for user
	public Consumer(String username, String password) {
		this.username=username;
		this.password=password;
	}
	
	// constructor for service provider
	public Consumer(String fullname, long phone) {
		this.fullname=fullname;
		this.phone=phone;
	}
}