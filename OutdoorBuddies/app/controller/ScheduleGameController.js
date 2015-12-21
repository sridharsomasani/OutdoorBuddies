Ext.define('OutdoorBuddies.controller.ScheduleGameController',{
	extend: 'Ext.app.Controller',
	
	config:{
		views: ['ScheduleGameView'],
		
		refs:{
			scheduleGameView: '#schedulegameview',
			//showUser: '#schedulegameview panel list[itemId=showUsers]',
			showUser: '#userlist',
			selectedUser: "schedulegameview fieldset[itemId=selectedUser]",
			eventDetails: "schedulegameview fieldset[itemId=eventdetails]",

		},

		control:{
			'searchfield[itemId=usersearch]': {
				clearicontap : 'clearSearch',
				keyup: 'onUserSearchKeyUp',
			},
			'#userlist': {
				itemtap: 'addUser',
			},
			'button[action=searchUser]': {
				tap: 'searchUser',
			},
			'button[action=scheduleAction]': {
				tap: 'scheduleGame',
			},
		},
	},

	// called when user clicks schedule game button
	scheduleGame: function(){
		// get schedule form data and fields
		var userfields = this.getSelectedUser().getItems().items;
		var eventfields = this.getEventDetails().getFieldsAsArray();
		var userdata = [];
		var eventdata = {};
		var emptyuser = true;
		var emptyevent = true;

		// validate entered data
		for(var i=0; i< userfields.length; i++){
			if(!(userfields[i].xtype == 'title')){
				userdata.push(userfields[i].getData().userid);
				emptyuser = false;
			}	
		}
		for(var i=0; i<eventfields.length; i++){
			var value = eventfields[i].getValue().trim();
			var empty = (!value || value == "");
			
			if(!empty){
				eventdata[eventfields[i].getName()] = value;
				emptyevent = false;
			}else{
				emptyevent = true;
				break;
			}
			
		}
		if(emptyuser){
			Ext.Msg.alert('Error',"Please Invite Atleast One User To Schedule A Game",Ext.emptyFn);
		}else if(emptyevent){
			Ext.Msg.alert('Error',"Please Choose All Event Details",Ext.emptyFn);
		}

		var gEmpty = !emptyuser && !emptyevent;
		eventdata["userlist"] = userdata;

		if(gEmpty){
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: 'Loading',
			});
			base_url = localStorage.getItem("Base-URL");
			base_url += "event/schedule"
			console.log(eventdata);

			// call schedulegame service
			Ext.Ajax.request({
				url: base_url,
				method: 'POST',
				noCache: false,
				params:{
					data: Ext.JSON.encode(eventdata),
				},
				startParam: '',
				pageParam: '',
				limitParam: '',
				timeout: 40000,
				//headers:{
				//		'Access-Control-Allow-Origin':'*',
				//		},
				success: function(response,opts){
					var resp_obj = Ext.decode(response.responseText);
					console.log(resp_obj);
					Ext.Viewport.setMasked(false);
					//reset schedule event data on successful submission
					if(resp_obj.status == 200){
						// reset schedule fields
						for(var i=0; i<eventfields.length; i++){
							eventfields[i].reset();
						}
						//reset date picker
						Ext.ComponentQuery.query("#scheduledatepicker")[0].reset();
						// reset invited user list view
						var userSelect = Ext.ComponentQuery.query('schedulegameview fieldset[itemId=selectedUser]')[0];
						//var tmp = userSelect.getAt(0);
						//console.log(tmp);
						userSelect.removeAll();
						//userSelect.add(tmp);
						//userSelect.update();	
						userSelect.setTitle('Invited Users');
						for(var i=0; i< userfields.length; i++){
							userSelect.removeAt(i);
						}
						Ext.Msg.alert('Success',resp_obj.message,Ext.emptyFn);
					}else{
						Ext.Msg.alert('Error',resp_obj.message,Ext.emptyFn);
					}
				},
				
				failure: function(response,opts){
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Error','Something Went Wrong',Ext.emptyFn);
				}
			});
		}

	},

	// search user to invite for game. called when user clicks invite user button
	searchUser: function(){	
		if(!this.overlay){
			this.overlay = Ext.Viewport.add({
				xtype: 'list',
				id: 'userlist',
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
                // adjust popup width based on device
                width: Ext.os.deviceType == 'Phone' ? "100%" : "80%",
                height: Ext.os.deviceType == 'Phone' ? "70%" : "50%",
                //width: Ext.os.deviceType == 'Phone' ? 500 : '100%',
                //height: Ext.os.deviceType == 'Phone' ? 400 : '80%',
                styleHtmlContent: true,
                itemCls: 'userlist',
                itemTpl: '<img src=' + localStorage.getItem('Base-URL-Img') + '{imgurl}></img> {firstname:ellipsis(40)} {lastname:ellipsis(40)}<br>{mobile:ellipsis(40)}',
                items: [
                    {
                        docked: 'top',
                        xtype: 'toolbar',
                        items:[
                        	{
                        		xtype: 'searchfield',
                        		placeHolder: 'Search by Username',
                        		itemId: 'usersearch',
                        	},
                        	{ xtype: 'spacer'},
                        	{
                        		iconCls: 'delete',
                        		itemId: 'hideit',
                        		ui: 'plain',
                        		align: 'right',
                        		handler: function(){
                        			this.getParent().getParent().hide();
                        		},
                        	},
                        ]
                    },
                ],
			});
		}else { 
			this.overlay.show();
		}
	},

	// adds user to list of invited users from searched list of users. called wheneve user record is tapped on list view of search users popup

	addUser: function(self,index,target,record,e,eopts){
		var udata = self.getStore().getAt(index).data;
		var fields = Ext.ComponentQuery.query('schedulegameview fieldset[itemId=selectedUser]')[0].getItems().items;
		var isAdded = true;
		for(i=1; i< fields.length; i++){
			if(fields[i].getData().userid == udata.userid){
				isAdded = false;
			}
		}
		self.getStore().removeAt(index);
		// merge search user list and already invited users
		if(isAdded){
			var currentUser = Ext.create('Ext.Button',{
				text: udata.firstname + " " + udata.lastname,
				data: udata,
				ui: 'plain',
				iconCls: 'user',
				listeners:{
					tap: function(self, one, two, three){
						Ext.ComponentQuery.query('schedulegameview fieldset[itemId=selectedUser]')[0].remove(self);
					},
				},
				
			});

			this.getSelectedUser().add(currentUser);
		}
	},

	clearSearch: function(){
		this.getShowUser().setStore("");
	},

	//called whenever user types a letter in the searchbox and populates the data in list view in a popup
	onUserSearchKeyUp: function(search){
		var searchquery = search.getValue();
		if(searchquery){
			var showUserStore = Ext.create('OutdoorBuddies.store.User');
			showUserStore.setId('showUserStore');
			storeUrl = localStorage.getItem('Base-URL') + 'user/search?username=' + searchquery;
			showUserStore.setProxy({
				type: 'ajax',
				url: storeUrl,
				method: 'POST',
				noCache: false,
				startParam: '',
				pageParam: '',
				limitParam: '',
				reader:{
					type: 'json',
					rootProperty: 'users',
					successProperty: 'success',
				},

			});
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: 'Loading',
			});
			showUserStore.load(function(records,msg,success){
				Ext.Viewport.setMasked(false);
				if(records.length > 0){
					this.getShowUser().setHtml('');
					this.getShowUser().setStore(showUserStore);
				}else{
					this.getShowUser().setStore("");
					this.getShowUser().setHtml('<div align= "center">No Users Found with Username!!</div>')
				}
			}, this);
		}else {
			this.getShowUser().setStore("");
		}
	}
});