// This view is the home view in the Tabview. It contains user information and scheduled events. It is main screen shown after user logs in.
Ext.define('OutdoorBuddies.view.HomeView',{
extend: 'Ext.Panel',
	
	requires:['Ext.Img'],

	xtype: 'homeview',
	id: 'homeview',
	config:{
		title: 'Home',
		iconCls:'home',
		styleHtmlContent: true,
		items:[
			/*{
				xtype:'titlebar',
				title:'OutdoorBuddies',
				docked: 'top',
				//scrollable:false,
					items: [
					{
						iconCls: 'action',
						iconMask: true,
						ui: 'plain',
						align: 'right',
						action: 'logoutAction',
					},
					{
						iconCls: 'info',
						iconMask: true,
						ui: 'plain',
						action: 'aboutAction',
					},
				],//titlebar items end
			},*/
			{
				xtype: 'fieldset',
				title: 'User Info',
				items:[
					{
						xtype: 'panel',
						itemId: 'userinfopanel',
						styleHtmlContent: true,
						//html: 'This is user Info Page',
						cls: 'userinfo',
						//data: '{"username": "username", "firstname": "Firstname"}',
						tpl: ['<tpl><img src=' + localStorage.getItem('Base-URL-Img') + '{imgurl}></img>',
							'<b>Display Name :{username}<br>Firstname : {firstname}<br>Lastname : {lastname}</b></tpl>'].join(''),
						listeners:{
							element: 'element',
							tap: function(){
								this.fireEvent('userinfotap',this);
								//console.log('In User Info tap func');
							},
						},
					},

				],
			},
			{
				xtype: 'button',
				text: 'Scheduled Events',
				ui: 'forward confirm',
				action: 'scheduledevents'
			}	
		],//home items end
	}
});