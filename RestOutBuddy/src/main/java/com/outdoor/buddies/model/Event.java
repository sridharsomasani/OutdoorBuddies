package com.outdoor.buddies.model;

import com.outdoor.buddies.utility.Constants;

/**
 * The Event class holds all the attributes related to an event
 * @author Sridhar Somasani
 *
 */
public class Event {
	
	private int event_id;
	private String gametype;
	private int isCompleted;
	private String eventStartTime;
	private String eventEndTime;
	private String eventDate;
	private String eventPlace;
	private String eventAddress;
	private int isAccepted;
	private int isAttended;
	private int status;
	
	public int getEvent_id() {
		return event_id;
	}
	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	public String getGametype() {
		return gametype;
	}
	public void setGametype(int gametype) {
		String game = "Unknown";
		if(Constants.gameMap.containsKey(gametype)){
			game = Constants.gameMap.get(gametype);
		}
		this.gametype = game;
	}
	public int getIsCompleted() {
		return isCompleted;
	}
	public void setIsCompleted(int isCompleted) {
		this.isCompleted = isCompleted;
	}
	public String getEventStartTime() {
		return eventStartTime;
	}
	public void setEventStartTime(String eventStartTime) {
		this.eventStartTime = eventStartTime;
	}
	public String getEventEndTime() {
		return eventEndTime;
	}
	public void setEventEndTime(String eventEndTime) {
		this.eventEndTime = eventEndTime;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	public String getEventPlace() {
		return eventPlace;
	}
	public void setEventPlace(String eventPlace) {
		this.eventPlace = eventPlace;
	}
	public String getEventAddress() {
		return eventAddress;
	}
	public void setEventAddress(String eventAddress) {
		this.eventAddress = eventAddress;
	}
	public int getIsAccepted() {
		return isAccepted;
	}
	public void setIsAccepted(int isAccepted) {
		this.isAccepted = isAccepted;
	}
	public int getIsAttended() {
		return isAttended;
	}
	public void setIsAttended(int isAttended) {
		this.isAttended = isAttended;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}

}
