package com.outdoor.buddies.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.outdoor.buddies.utility.DBUtility;
import com.outdoor.buddies.model.User;
import com.outdoor.buddies.model.UserList;

/**
 * The UserService class performs all the User related database operations. 
 * @author Sridhar Somasani
 *
 */
public class UserService {
	
	private Connection connection;

	public UserService() {
		connection = DBUtility.getConnection();
	}
	
	
	/**
	 * @param username of the user
	 * @param password of the user
	 * @return
	 */
	public User authenticateUser(String username, String password){
		User user = new User();
		user.setStatus(500); // Invalid Credentails
		user.setAddress("Invalid Credentials");
		try{
			Statement statement = connection.createStatement();
			String query = "select * from userprofile where username='" + username + "' and passwd='" + password +"'";
			ResultSet rs = statement.executeQuery(query);
			while (rs.next()) {
				user = getUserFromResultSet(rs);
			}
		}catch(SQLException ex){
			ex.printStackTrace();
			user.setStatus(510);
			user.setAddress(ex.getMessage());
		}
		return user;
	}
	
	/**
	 * @param searchField map of search fields to be used
	 * @return {@link UserList} of matched users. It returns only 10 users
	 */
	public UserList searchUsers(Map<String, String> searchField) {
		// search users based on username
		// extend search on other fields in the future by sending the attribute in map
		String username = searchField.get("username");
		UserList users = new UserList();
		List<User> userlist = new ArrayList<User>();
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery("select * from userprofile where username like '%" + username +"%' limit 10");
			while (rs.next()) {
				userlist.add(getUserFromResultSet(rs));
			}
			statement.close();
			users.setUsers(userlist);
			users.setStatus(200);
			users.setMessage("Success");
		} catch (SQLException e) {
			e.printStackTrace();
			users.setStatus(510);
			users.setMessage(e.getMessage());
		}
		
		return users;
	}
	
	
	/**
	 * @param resultSet to build User model
	 * @return {@link User} with user information
	 */
	public User getUserFromResultSet(ResultSet resultSet){
		User user = new User();
		try{
			user.setStatus(200);
			user.setUserid(resultSet.getInt("user_id"));
			user.setFirstname(resultSet.getString("firstname"));
			user.setLastname(resultSet.getString("lastname"));				
			user.setEmail(resultSet.getString("email"));
			user.setAddress(resultSet.getString("address"));
			user.setDob(resultSet.getString("dob"));
			user.setGender(resultSet.getString("gender"));
			user.setMobile(resultSet.getString("mobile"));
			user.setUsername(resultSet.getString("username"));
			user.setImgurl(resultSet.getString("imageurl"));
		}catch(SQLException ex){
			ex.printStackTrace();
			user.setStatus(510);
			user.setAddress(ex.getMessage());
		}
		return user;
	}
	
	/**
	 * @param registerFields contains fields required for registering
	 * @return {@link User} information of present registered user
	 */
	public User registerUser(Map<String, String> registerFields){
		User user = new User();
		if(!isRegisteredUser(registerFields.get("username"), registerFields.get("email"))){
			try{
				
				CallableStatement cs = connection.prepareCall("{CALL usp_AddNewUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
				cs.setString(1, registerFields.get("firstname"));
				cs.setString(2, registerFields.get("lastname"));
				cs.setString(3, registerFields.get("username"));
				cs.setString(4, registerFields.get("password"));
				cs.setString(5, registerFields.get("email"));
				cs.setString(6, registerFields.get("dob"));
				cs.setString(7, registerFields.get("gender"));
				cs.setString(8, registerFields.get("mobile"));
				String loc = registerFields.get("location");
				// insert default location if location is null
				if(loc != null && !loc.isEmpty() && !loc.equals("null")){
					cs.setString(9,loc);
				}else{
					cs.setString(9, "No Clue");
				}
				String imgurl = "images/female.jpg";
				// assigning default image based on gender if no image is uploaded
				if(registerFields.get("gender").equals("M")){
					imgurl = "images/male.jpg";
				}
				cs.setString(10, imgurl);
				ResultSet rs = cs.executeQuery();
				while(rs.next()){
					user = getUserFromResultSet(rs);
				}
				
			}catch(SQLException ex){
				ex.printStackTrace();
				user.setAddress(ex.getMessage());
				user.setStatus(510);
			}catch(Exception ex){
				user.setStatus(501); // Malformed Arguments
				user.setAddress(ex.getMessage());
			}
		}else {
			user.setStatus(505); // User Already Exists
			user.setAddress("Username or Email Already Exists");
		}
		return user;
	}
	
	/**
	 * @param username of the user
	 * @param email of the user
	 * @return true if user is already registered, false if no user is present with username and email id
	 */
	public boolean isRegisteredUser(String username, String email){
		try{
			Statement statement = connection.createStatement();
			//String query = "SELECT * FROM USERPROFILE WHERE username='" + params.get("username") + "' OR email='" + params.get("email") + "'";
			String query = "SELECT * FROM USERPROFILE WHERE username='" + username + "' OR email='" + email + "'";
			ResultSet rs = statement.executeQuery(query);
			boolean hasRows = rs.next();
			rs.close();
			statement.close();
			return hasRows;
		}catch(SQLException ex){
			ex.printStackTrace();
		}
		return false;
	}
}
