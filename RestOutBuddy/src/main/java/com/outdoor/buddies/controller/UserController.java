package com.outdoor.buddies.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.outdoor.buddies.dao.UserService;
import com.outdoor.buddies.model.User;
import com.outdoor.buddies.model.UserList;

/**
 * This class handles all the user related services
 * @author Sridhar Somasani
 *
 */
@RestController
@RequestMapping("/service/user")
public class UserController {
	
	UserService userService = new UserService();
	
	/**
	 * @param username of the user
	 * @param passwd to login
	 * @return details of the user upon successful authentication.<br>
	 * 	status 200 - Ok <br>
	 * 	status 500 - invalid credentials<br>
	 * 	status 510 - internal error
	 */
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public User authenticateUser(@RequestParam("username") String username, @RequestParam("passwd") String passwd){
		return userService.authenticateUser(username, passwd);
	}
	
	/**
	 * @param params map of required attributes for registering user see {@link UserService#registerUser(Map)} method
	 * @return {@link User} model containing registered user information <br>
	 * 	status 200 - Ok <br>
	 * 	status 501 - Malformed Arguments <br>
	 * 	status 505 - Username already exists <br>
	 * 	status 510 - internal error
	 * 
	 */
	@RequestMapping(value = "/register", method =  RequestMethod.POST)
	public User registerUser(@RequestParam Map<String, String> params){
		
		return userService.registerUser(params);
	}
	
	/**
	 * Search by username
	 * @param match the username partially
	 * @return list of matched users. see {@link UserList} <br>
	 * 	status 200 - Ok <br>
	 * 	status 510 - internal error
	 */
	@RequestMapping(value = "/search", method =  RequestMethod.GET)
	public UserList searchUsers(@RequestParam Map<String, String> params){
		
		return userService.searchUsers(params);
	}
	
	/**
	 * @return Static description about the application<br>
	 * 	status 200 - Ok <br>
	 * 
	 */
	@RequestMapping(value = "/aboutApp", method = RequestMethod.GET)
	public String aboutApp(){
		String message = "{'status' : '200', 'message': 'OutdoorBuddies helps users to check a list of nearby facilities and enthusiastic partners willing "
				+ "			to participate in outdoor events such as sports, trekking, rafting, etc, based on his/her interests and personalizing options. "
				+ "Through this app, User will have the freedom of selecting partners and scheduling an event, monitor his recent activites.'}";
		
		return message;
	}
}
