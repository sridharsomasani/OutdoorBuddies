// user store to hold user information
Ext.define('OutdoorBuddies.store.User',{
	extend: 'Ext.data.Store',
	config:{
		model: 'OutdoorBuddies.model.User',
		autoLoad: false,
	}
});