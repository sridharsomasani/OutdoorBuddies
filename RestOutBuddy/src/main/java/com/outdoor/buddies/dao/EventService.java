package com.outdoor.buddies.dao;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.outdoor.buddies.model.ScheduleEvent;
import com.outdoor.buddies.model.Event;
import com.outdoor.buddies.model.EventList;
import com.outdoor.buddies.utility.DBUtility;

public class EventService {
	private Connection connection;

	public EventService() {
		connection = DBUtility.getConnection();
	}
	
	/**
	 * @param userid
	 * @return {@link EventList} events that user is associated with.
	 */
	public EventList getScheduledEvents(Integer userid){
		EventList events = new EventList();
		events.setStatus(510);
		int status = 510;
		events.setMessage("Success");
		if(userid != null){
			try {
				CallableStatement cs = connection.prepareCall("{CALL usp_GetScheduleEvents(?)}");
				cs.setInt(1, userid);
				ResultSet rs = cs.executeQuery();
				while(rs.next()){
					status = 200;
					events.getEvents().add(getEventResultSet(rs));
				}
				rs.close();
				cs.close();
				events.setStatus(status);
			} catch (SQLException e) {
				events.setMessage("Invalid Arguments to Database in ScheduleEvent Service");
				events.setStatus(501);
				e.printStackTrace();
			}
		}else{
			events.setMessage("Invalid Arguments to ScheduleEvent Service");
			events.setStatus(502);
		}
		return events;
	}
	
	/**
	 * @param resultSet extract {@link Event} model from the ResultSet
	 * @return {@link Event} model
	 */
	private Event getEventResultSet(ResultSet resultSet){
		Event event = new Event();
		try {
			event.setEvent_id(resultSet.getInt("event_id"));
			event.setGametype(resultSet.getInt("game_id"));
			event.setIsCompleted(resultSet.getInt("isCompleted"));
			event.setEventStartTime(resultSet.getString("event_start_time"));
			event.setEventEndTime(resultSet.getString("event_end_time"));
			event.setEventDate(resultSet.getString("event_date"));
			event.setEventPlace(resultSet.getString("event_place"));
			event.setEventAddress(resultSet.getString("event_address"));
			event.setIsAccepted(resultSet.getInt("accept"));
			event.setIsAttended(resultSet.getInt("is_attended"));
		} catch (SQLException e) {
			event.setStatus(510);
			e.printStackTrace();
		}
		return event;
	}
	
	/**
	 * @param eventdata JSON string containing fields required to schedule an event
	 * @return  JSON string containing status and message
	 */
	public String scheduleEvent(String eventdata){
		ScheduleEvent event = getEventModel(eventdata);
		String message = "{\"status\": \"200\", \"message\": \"Event Scheduled Successfully!\"}";
		if(event != null){
			try {
				CallableStatement cs = connection.prepareCall("{CALL usp_AddNewEvent(?, ?, ?, ?, ?, ?)}");
				cs.setString(1, event.getDate());
				cs.setString(2, event.getStarttime());
				cs.setString(3, event.getEndtime());
				cs.setString(4, event.getGametype());
				cs.setString(5, event.getPlace());
				cs.setString(6, event.getAddress());
				ResultSet rs = cs.executeQuery();
				int event_id = -1;
				while(rs.next()){
					event_id = rs.getInt("LAST_INSERT_ID()");
				}
				rs.close();
				cs.close();
				ArrayList<String> userlist = event.getUserlist();
				String query = "INSERT INTO EventParticipants(event_participant_id,event_id,user_id,accept,is_attended ,feedback ,expertise) VALUES (?,?,?,?,?,?,?)";
				PreparedStatement ps = connection.prepareStatement(query);
				for(int i=0;i<userlist.size(); i++){
					ps.setString(1, null);
					ps.setInt(2, event_id);
					ps.setInt(3, Integer.parseInt(userlist.get(i)));
					ps.setInt(4, 0);
					ps.setInt(5, 0);
					ps.setString(6, "feedback");
					ps.setInt(7,0);
					ps.addBatch();
				}
				ps.executeBatch();
			} catch (SQLException e) {
				message = "{\"status\": \"501\", \"message\": \"Invalid Arguments to Database in ScheduleEvent Service\"}";
				e.printStackTrace();
			}
		}else{
			message = "{\"status\": \"502\", \"message\": \"Invalid Arguments to ScheduleEvent Service\"}";
		}
		return message;
	}
	
	/**
	 * @param data JSON string
	 * @return {@link ScheduleEvent} model containing attributes required to schedule an event
	 */
	private ScheduleEvent getEventModel(String data){
		ObjectMapper mapper = new ObjectMapper();
		ScheduleEvent eve = null;
		try {
			eve = mapper.readValue(data, ScheduleEvent.class);
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return eve;
	}
}
