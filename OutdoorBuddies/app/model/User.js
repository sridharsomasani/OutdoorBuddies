// model containing user attributes. This model is used in UserStore to store user information
Ext.define('OutdoorBuddies.model.User',{
	extend: 'Ext.data.Model',
	config: {
		fields: [
			
			{name: 'userid', type: 'string'},
			{name: 'firstname', type : 'string'},
			{name: 'lastname', type : 'string'},
			{name: 'email', type : 'string'},
			{name: 'username', type : 'string'},
			{name: 'dob', type : 'string'},
			{name: 'gender', type : 'string'},
			{name: 'mobile', type : 'string'},
			{name: 'address', type : 'string'},
			{name: 'imgurl', type : 'string'},
		]
	}
});