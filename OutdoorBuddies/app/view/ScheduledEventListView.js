// This view is used to display scheduled events that user is associated with. It is navigated via HomeScreen when Scheduled Events button is clicked
Ext.define('OutdoorBuddies.view.ScheduledEventListView',{
	extend: 'Ext.List',
	xtype: 'scheduledeventlistview',
	id: 'scheduledeventlistview',
	
	config: {
		title: 'Events',
		navigationBar: true,
		fullscreen: true,
		//scrollable: false,
		title: 'Challenges',
		itemCls: 'challengelist',
		disclosure: false,
		xtype: 'list',
		id: 'eventlist',
		itemCls: 'challengelist',
		disclosure: false,
		itemTpl:'<h1><b>{gametype:ellipsis(20)}</b><h3>{eventPlace:ellipsis(30)}</h3></h1> <h3>{eventAddress:ellipsis(30)}</h3>',
		
		listeners: {
			itemtap: function(self,index,target,record,e,eopts){
				var eventdata = self.getStore().getAt(index).data;
				var eventdetails = Ext.Viewport.add({
                    xtype: 'panel',
                    id: 'eventdetails',
                    modal: true,
                    hideOnMaskTap: false,
                    showAnimation: {
                        type: 'popIn',
                        duration: 250,
                        easing: 'ease-out'
                    },
                    hideAnimation: {
                        type: 'popOut',
                        duration: 250,
                        easing: 'ease-out'
                    },
                    centered: true,
                    width: Ext.os.deviceType == 'Phone' ? "100%" : "80%",
                    height: Ext.os.deviceType == 'Phone' ? "70%" : "50%",
                    styleHtmlContent: true,
                    //html: content,
                    items: [
                        {
                            docked: 'top',
                            xtype: 'toolbar',
                            title: 'Event Details',
                            items:[
                                {   
                                    xtype: 'spacer'
                                },
                                {
                                    iconCls: 'delete',
                                    itemId: 'hideit',
                                    ui: 'plain',
                                    align: 'right',
                                    handler: function(){
                                        this.getParent().getParent().destroy();
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Event Details',
                            disabled: true,
                            data: eventdata,
                            defaults: {
                               labelWidth: '35%',
                               margin: '2px'
                            },
                            items: [
                                {
									xtype: 'textfield',
									label: 'Game',
									name: 'gametype',
									value: eventdata.gametype
								},
								{
									xtype: 'textfield',
									label: 'Date',
									name: 'eventDate',
									value: eventdata.eventDate
								},
								{
									xtype: 'textfield',
									label: 'Start Time',
									name: 'eventStartTime',
									value: eventdata.eventStartTime
								},
								{
									xtype: 'textfield',
									label: 'End Time',
									name: 'eventEndTime',
									value: eventdata.eventEndTime
								},
								{
									xtype: 'textfield',
									label: 'Place',
									name: 'eventPlace',
									value: eventdata.eventPlace
								},
                                {
									xtype: 'textareafield',
									label: 'Address',
									name: 'eventAddress',
									value: eventdata.eventAddress
								}
                            ]
                        },
                    ],
                    scrollable: true
                });
				eventdetails.getAt(1).setData(eventdata);
				eventdetails.show();
			},
		},
		items:[
		{
			xtype:'titlebar',
			docked: 'top',
			items:[
				{
					xtype: 'button',
					ui: 'back',
					text: 'Back',
					handler: function(){
						//Ext.getCmp('scheduledeventlistview').destroy();
						this.getParent().getParent().getParent().destroy();
					},
				},
			]
				
		},

		
		
		//{ xtype: 'challengelist', },
		],
	}
});
