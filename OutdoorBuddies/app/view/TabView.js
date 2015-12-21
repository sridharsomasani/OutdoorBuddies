// This is the main tabview displayed when user logs in. HomeView is the active view of the tabview.
Ext.define('OutdoorBuddies.view.TabView',{
extend: 'Ext.tab.Panel',

	xtype: 'tabview',
	id: 'tabview',
	config:{
		activeTab: 1,
		fullscreen: true,
		showAnimation: 'slide',
		scrollable: false,
		//layout: 'fit',
		tabBar:{
			layout: {
				pack: 'center',
				align: 'center',
			},
			docked: 'bottom',
		},
		//defaults:{
			//scrollable: true,
		//},
		items:[
			{
				xtype: 'titlebar',
				title: 'OutdoorBuddies',
				docked: 'top', 
				items: [
					{
						iconCls: 'settings',
						iconMask: true,
						ui: 'plain',
						action: 'menuaction',
					},
					/*{
						iconCls: 'action',
						iconMask: true,
						ui: 'plain',
						align: 'right',
						action: 'logoutAction',
					}*/
				],//titlebar items end
			},
			{ xtype: 'homeview',},
			{ xtype: 'schedulegameview',},
			//{ xtype: 'mapview',},
			//{ xtype: 'homeview',},
			//{ xtype: 'registerform',},
		
		]
		
		
	}

});