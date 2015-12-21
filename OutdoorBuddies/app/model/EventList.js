// model containing event attributes. This model is used in EventStore to store scheduled events
Ext.define('OutdoorBuddies.model.EventList',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			
			{name: 'event_id', type: 'string'},
			{name: 'gametype', type : 'string'},
			{name: 'isCompleted', type : 'string'},
			{name: 'eventStartTime', type : 'string'},
			{name: 'eventEndTime', type : 'string'},
			{name: 'eventDate', type : 'string'},
			{name: 'eventPlace', type : 'string'},
			{name: 'eventAddress', type : 'string'},
			{name: 'isAccepted', type : 'string'},
			{name: 'isAttended', type : 'string'},
			{name: 'status', type : 'string'},
		]
	}
});