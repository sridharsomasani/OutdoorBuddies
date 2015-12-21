package com.outdoor.buddies.model;

import java.util.List;

/**
 * Model to store list of users
 * @author Sridhar Somasani
 *
 */
public class UserList {
	private List<User> users;
	private int status;
	private String message;
	
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
