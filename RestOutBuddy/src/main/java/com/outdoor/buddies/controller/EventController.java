package com.outdoor.buddies.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.outdoor.buddies.dao.EventService;
import com.outdoor.buddies.model.EventList;


 
/**
 * This class handles all the event related services
 * 
 * @author Sridhar Somasani
 *
 */
@RestController
@RequestMapping("/service/event")
public class EventController {
	
	EventService eventService = new EventService();

	
	
	/**
	 * @param data It is JSON string containing fields required to schedule a task
	 * @return returns JSON string with status and message <br>
	 * 	status 200 - Ok <br>
	 * 	status 501 - Invalid Arguments to Database in ScheduleEvent Service	<br>
	 * 	status 502 - Invalid Arguments to ScheduleEvent Service	<br>
	 */
	@RequestMapping(value = "/schedule", method = RequestMethod.POST)
	public String scheduleEvent(@RequestParam String data){
		System.out.println( data);
		
		return eventService.scheduleEvent(data); 
	}
	
	
	/**
	 * Returns scheduled events for the given userid
	 * 
	 * @param userid to get information about scheduled events
	 * @return returns list of scheduled events which user accepted <br>
	 * 	status 200 - Ok <br>
	 * 	status 501 - Invalid Arguments to Database in ScheduleEvent Service	<br>
	 * 	status 502 - Invalid Arguments to ScheduleEvent Service	<br>
	 */
	@RequestMapping(value = "/getSchedule", method = RequestMethod.GET)
	public EventList getScheduledEvent(@RequestParam("userid") int userid){
		return eventService.getScheduledEvents(userid); 
	}
}
