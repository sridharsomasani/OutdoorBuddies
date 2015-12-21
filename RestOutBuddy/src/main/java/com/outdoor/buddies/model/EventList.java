package com.outdoor.buddies.model;

import java.util.ArrayList;

/**
 * The EventList class holds list of events
 * @author Sridhar Somasani
 *
 */
public class EventList {
	
	private int status;
	private String message;
	private ArrayList<Event> events = new ArrayList<Event>();
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
	public ArrayList<Event> getEvents() {
		return events;
	}
	public void setEvents(ArrayList<Event> events) {
		this.events = events;
	}
}
