// This view is used to display Schedule game form
Ext.define('OutdoorBuddies.view.ScheduleGameView',{
extend: 'Ext.form.Panel',
	
	requires: ['Ext.field.Search',
		'Ext.form.Text',
	],

	xtype: 'schedulegameview',
	id: 'schedulegameview',
	
	config:{
		title: 'Schedule',
		iconCls: 'compose',
		styleHtmlContent: true,
		layout:{
			type: 'vbox',
			pack: 'start',
			align: 'stretch',
		},
		defaults:{
			margin: '5px',
		},
		items:[
			{
				xtype: 'fieldset',
				title: 'Invited Users',
				itemId: 'selectedUser'
			},
			{
				xtype: 'fieldset',
				title: 'Event Details',
				itemId: 'eventdetails',
				disabled: true,
				items:[
					{
						label: 'Date',
						xtype: 'textfield',
						name: 'date'
					},
					{
						label: 'Start Time',
						xtype: 'textfield',
						name: 'starttime'
					},
					{
						label: 'End Time',
						xtype: 'textfield',
						name: 'endtime'
					},
					{
						label: 'Game',
						xtype: 'textfield',
						name: 'gametype'
					},
					{
						label: 'Place',
						xtype: 'textfield',
						name: 'place'
					},
					{
						label: 'Address',
						xtype: 'textareafield',
						name: 'address'
					}
				]
			},
			{
				xtype: 'panel',
				layout: {
					type: 'hbox',
					align: 'center',
				},
				defaults:{
					margin: '10px',
				},
				items:[
					{	
						flex: 1,
						xtype: 'datepickerfield',
						destroyPickerOrHide: true,
						name: 'scheduledate',
						placeHolder: 'Schedule Date',
						cls: 'borde',
						itemId: 'scheduledatepicker',
						picker:{
							yearFrom: 2014,
						},
						listeners:{
							change: function( self, newDate, oldDate, eOpts){
								var dateformat = Ext.util.Format.date(newDate, 'Y-m-d');
								Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(0).setValue(dateformat);
							}
						}
					},
					{
						flex: 1,
						xtype: 'button',
						text: 'Select Place',
						name: 'selectplace',
						itemId: 'selectplace',
						iconCls: 'maps',
						handler: function() {
							// var maps = Ext.getCmp('mapview');
							// if(maps){
							// 	maps.destroy();
							// }
							// initialize mapview
							var maps = Ext.getCmp('mapview') || Ext.create('OutdoorBuddies.view.MapView');
							Ext.Viewport.add(maps);
							Ext.Viewport.setActiveItem('mapview');
						}
					}
				]
			},
			{
				xtype: 'panel',
				layout: {
					type: 'hbox',
					align: 'center',
				},
				defaults:{
					margin: '10px',
				},
				items:[
					{
						flex: 1,
						xtype: 'button',
						text: 'Start Time',
						name: 'gamestarttime',
						itemId: 'starttime',
						iconCls: 'add',
						//ui: 'plain',
						handler: function(){
							if(!this.timepickerstart){
								this.timepickerstart = Ext.Viewport.add({
									xtype: 'picker',
									slots: [
										{
											name: 'timeslot',
											title: 'Start Time',
											data:[
												{ text: '9AM', value: '9' },
												{ text: '10AM', value: '10' },
												{ text: '11AM', value: '11' },
												{ text: '12PM', value: '12' },
												{ text: '1PM', value: '13' },
												{ text: '2PM', value: '14' },
												{ text: '3PM', value: '15' },
												{ text: '4PM', value: '16' },
												{ text: '5PM', value: '17' },
												{ text: '6PM', value: '18' },
												{ text: '7PM', value: '19' },
												{ text: '8PM', value: '20' },
											]
										}
									]
									
								});
								this.timepickerstart.on('change', function(self, value, opts){
									var time = value.timeslot > 11 ? value.timeslot-12 + " PM" : value.timeslot +" AM";
									if(value.timeslot == 12){
										time = "12 PM";
									}
									var startbutton = Ext.ComponentQuery.query('schedulegameview button[itemId=starttime]')[0];
									startbutton.setData(value);
									Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(1).setValue(time);
								});
							}else{
								this.timepickerstart.show();
							}
						}
					},
					{
						flex: 1,
						xtype: 'button',
						text: 'End Time',
						iconCls: 'add',
						name: 'gameendtime',
						itemId: 'endtime',
						//ui: 'plain',
						handler: function(){
							if(!this.timepickerend){
								this.timepickerend = Ext.Viewport.add({
									xtype: 'picker',
									slots: [
										{
											name: 'timeslot',
											title: 'Select Time',
											data:[
												{ text: '9AM', value: '9' },
												{ text: '10AM', value: '10' },
												{ text: '11AM', value: '11' },
												{ text: '12PM', value: '12' },
												{ text: '1PM', value: '13' },
												{ text: '2PM', value: '14' },
												{ text: '3PM', value: '15' },
												{ text: '4PM', value: '16' },
												{ text: '5PM', value: '17' },
												{ text: '6PM', value: '18' },
												{ text: '7PM', value: '19' },
												{ text: '8PM', value: '20' },
											]
										}
									]
								});
								this.timepickerend.on('change', function(self, value, opts){
									var time = value.timeslot > 11 ? value.timeslot-12 + " PM" : value.timeslot +" AM";
									if(value.timeslot == 12){
										time = "12 PM";
									}
									var starttime = Ext.ComponentQuery.query('schedulegameview button[itemId=starttime]')[0].getData();
									if(starttime){
										starttime = parseInt(starttime.timeslot);
										value = parseInt(value.timeslot);
										if(value > starttime ){
											var startbutton = Ext.ComponentQuery.query('schedulegameview button[itemId=endtime]')[0];
											//startbutton.setValue(time);
											Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(2).setValue(time);
										} else{
											Ext.Msg.alert('Error','End Time Should be Greater Than Start Time',Ext.emptyFn);
										}
									}else{
										Ext.Msg.alert('Error','Please Select Start Time',Ext.emptyFn);
									}
								});
							}else{
								this.timepickerend.show();
							}

						}
					},
				]
			},
			{
				xtype: 'panel',
				layout: {
					type: 'hbox',
					align: 'center',
				},
				defaults:{
					margin: '10px',
					padding: '5px',
				},
				items:[
					{
						flex: 1,
						xtype: 'button',
						text: 'Select Game',
						iconCls: 'settings',
						name: 'gametype',
						itemId: 'gametype',
						handler: function(){
							if(!this.gamepicker){
								this.gamepicker = Ext.Viewport.add({
									xtype: 'picker',
									slots: [
										{
											name: 'gamelist',
											title: 'Select Game',
											data:[
												{ text: 'Football', value: 'Football' },
												{ text: 'Basketball', value: 'Basketball' },
												{ text: 'Cricket', value: 'Cricket' },
												{ text: 'Tennis', value: 'Tennis' },
											]
										}
									]
								});
								this.gamepicker.on('change', function(self, value, opts){
									var startbutton = Ext.ComponentQuery.query('schedulegameview button[itemId=gametype]')[0];
									startbutton.setData(value);
									Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(3).setValue(value.gamelist);
								});
							}else{
								this.gamepicker.show();
							}
						}
						
					},
					{
						flex: 1,
						xtype: 'button',
						text: 'Invite Users',
						iconCls: 'team',
						action: 'searchUser',
					},
				]
				
			}, // second panel
			{
				xtype:'button',
				ui:'confirm',
				text: 'Schedule Game',
				action: 'scheduleAction'
			}
		]
	}
});