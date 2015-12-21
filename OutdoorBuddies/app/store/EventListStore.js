// event list store to hold list of events data
Ext.define('OutdoorBuddies.store.EventListStore',{
	extend: 'Ext.data.Store',
	config:{
		model: 'OutdoorBuddies.model.EventList',
		autoLoad: false,
	}
});