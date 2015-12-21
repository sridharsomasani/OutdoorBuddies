Ext.define('OutdoorBuddies.view.ScheduleGameView',{
extend: 'Ext.Panel',
	
	requires: ['Ext.field.Search'],

	xtype: 'schedulegameview',
	id: 'schedulegameview',

	config:{
		title: 'Schedule Game',
		iconCls: 'compose',
		styleHtmlContent: true,
		//height: '100%',
		//layout: 'fit',
		layout: {
			type: 'vbox',
			pack: 'start'
		},
		//fullscreen: true,
		items:[
			{
				xtype: 'searchfield',
				placeHolder: 'Seach by Username',
				label: 'Username',
				itemId: 'searchUser',
			},
			{
				xtype: 'panel',
				flex: 1,
				layout: 'vbox',
				margin: '10px',
				items:[
					{ flex: 1,
						xtype: 'list',
						itemCls: 'userlist',
						label: 'Search Results',
						itemId: 'showUsers',
						height: '100%',
						itemTpl: '{firstname}',
						itemTpl: '<div><img src="http://localhost:8080/RestOutBuddy/{imgurl}"></img> <p><b>{firstname:ellipsis(40)}</b></p> <p>{lastname:ellipsis(40)}</p><br><p>{mobile:ellipsis(40)}</p></div>',
						listeners: {
							itemtap: function(self,index,target,record,e,eopts){
								console.log(self.getStore().getAt(index).data);

							},
						},
					},
					{ flex: 1,
						xtype: 'list',
						height: '100%',
						itemCls: 'userlist',
						itemId: 'selectedUsers',
						label: 'Selected Users',
						itemTpl: '<img src="http://localhost:8080/RestOutBuddy/{imgurl}"></img> <h1><b>{firstname:ellipsis(40)}</b></h1> <h3>{lastname:ellipsis(40)}</h3><h3>{mobile:ellipsis(40)}</h3>',
						listeners: {
							itemtap: function(self,index,target,record,e,eopts){
								console.log(self.getStore().getAt(index).data);

							},
						},
					},
				]
				
			}
			/*{
				xtype: 'list',
				itemCls: 'userlist',
				label: 'Search Results',
				itemId: 'showUsers',
				//itemTpl: '{firstname}',
				itemTpl: '<div><img src="http://localhost:8080/RestOutBuddy/{imgurl}"></img> <h1><b>{firstname:ellipsis(40)}</b></h1> <h3>{lastname:ellipsis(40)}</h3><h3>{mobile:ellipsis(40)}</h3></div>',
				listeners: {
					itemtap: function(self,index,target,record,e,eopts){
						console.log(self.getStore().getAt(index).data);

					},
				},
			},
			{
				xtype: 'list',
				itemCls: 'userlist',
				itemId: 'selectedUsers',
				label: 'Selected Users',
				itemTpl: '<img src="http://localhost:8080/RestOutBuddy/{imgurl}"></img> <h1><b>{firstname:ellipsis(40)}</b></h1> <h3>{lastname:ellipsis(40)}</h3><h3>{mobile:ellipsis(40)}</h3>',
				listeners: {
					itemtap: function(self,index,target,record,e,eopts){
						console.log(self.getStore().getAt(index).data);

					},
				},
			},*/
		]
	}
});