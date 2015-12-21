package com.outdoor.buddies.model;

import java.util.ArrayList;

/**
 * The ScheduleEvent class holds all the attributes required to schedule an event.
 * @author Sridhar Somasani
 *
 */
public class ScheduleEvent {
	private String date;
	private String address;
	private String endtime;
	private String starttime;
	private String place;
	private String gametype;
	private ArrayList<String> userlist = new ArrayList<String>();
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public String getStarttime() {
		return starttime;
	}
	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getGametype() {
		return gametype;
	}
	public void setGametype(String gametype) {
		this.gametype = gametype;
	}
	public ArrayList<String> getUserlist() {
		return userlist;
	}
	public void setUserlist(ArrayList<String> userlist) {
		this.userlist = userlist;
	}
}
