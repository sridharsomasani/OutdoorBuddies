Ext.define('OutdoorBuddies.controller.HomeController',{
	extend: 'Ext.app.Controller',

	view: ['HomeView', 'TabView', 'UserInfoView'],
	config:{
		refs:{
			//userImage: 'homepanel #userimage',
			infoPanel: 'homeview #userinfopanel',
			updateInfo: '#userinfoview',
		},
		control:{
			'button[action=aboutAction]': {
				tap : 'aboutApp',
			},
			'button[action=logoutAction]': {
				tap: 'logoutApp',
			},
			'button[action=menuaction]':{
				tap: 'toggleMenu',
			},
			'button[action=selectPic]':{
				tap: 'selectPicture',
			},
			'button[action=scheduledevents]':{
				tap: 'getScheduledEvents',
			},
			infoPanel:{
				userinfotap: 'userInfo',
			},
			
		},
	},

	// initialize user profile view when clicked on user image/details in home view

	userInfo: function(){
		var data = this.getInfoPanel().getData();
		var infopanel = Ext.create('OutdoorBuddies.view.UserInfoView');
		infopanel.setValues(data);
		// disable editing user information
		infopanel.disable();
		infopanel.getAt(1).getAt(0).setSrc(localStorage.getItem('Base-URL-Img')+data.imgurl);
		/*if( data.visibility == 'public'){
			infopanel.setValues({ visibility : true});
		}else {
			infopanel.setValues({ visibility : false});
		}*/
		Ext.Viewport.add(infopanel);
		Ext.Viewport.setActiveItem('userinfoview');
		//infopanel.
	},

	// called when user clicks scheduled events button
	// gets upcoming scheduled events that user is participating and shows them on home tab view

	getScheduledEvents: function(){
		var events = Ext.create('OutdoorBuddies.store.EventListStore');
		events.setStoreId('eventlist');
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading',
		});
		var url = localStorage.getItem('Base-URL');
		var userid = localStorage.getItem('user_id');
		url = url + 'event/getSchedule?userid=' + userid;
		console.log(url);
		events.setProxy({
				type: 'ajax',
				url: url,
				noCache: false,
				startParam: '',
				pageParam: '',
				limitParam: '',
				reader: {
					type: 'json',
					//successProperty: 'success',
					rootProperty : 'events',
					//record: 'challenges',
				},
			});

			// loads store and populates the view with the data
			events.load(function(records,msg,success){
				if(success){
					console.log('EVents Store loaded');
					var temp = Ext.create('OutdoorBuddies.view.ScheduledEventListView');
					Ext.Viewport.setMasked(false);
					temp.setStore(events);
					Ext.Viewport.add(temp);
					Ext.Viewport.setActiveItem('scheduledeventlistview');
					//var one = Ext.getCmp('challengenavigation');
					//one.push(temp);
					//one.getNavigationBar().show();
					//Ext.getCmp('challengetype').hide();
					if(records.length == 0){
						temp.setHtml('<div align= "center">No Events Found !!</div>');
					}
				}
			});
	},

	// called when user logs out of the app by pressing logout button left side menu

	logoutApp: function(){
		Ext.Viewport.toggleMenu('left');
		// instantiates login view
		Ext.Viewport.add(Ext.create('OutdoorBuddies.view.LoginView'));
		var maps = Ext.getCmp('mapview');
		if(maps){
			maps.destroy();
		}
		Ext.getCmp('tabview').destroy();
		
	},

	// toggle menu display on left
	toggleMenu: function(){
		Ext.Viewport.toggleMenu('left');
	},

	// called when user clicks to upload profile pic
	// user can either browse albums or take a picture using camera

	selectPicture: function(selectbtn){
		console.log('in select Pic');
		if(!this.sheet){
			this.sheet = Ext.Viewport.add({
			xtype: 'actionsheet',
			//docked: 'top',
			modal: false,
			items: [
				{
					text: 'Album',
					margin: 10,
					handler: function(btn){
            			btn.getParent().hide();
            			OutdoorBuddies.app.getController('HomeController').getImage(2,selectbtn);
            			
            		}
				},
				{
					text: 'Camera',
					margin: 10,
					handler: function(btn){
            			btn.getParent().hide();
            			OutdoorBuddies.app.getController('HomeController').getImage(1,selectbtn);
            		}
				},
				{
					text: 'Cancel',
					ui: 'decline',
					margin: 10,
					handler: function(btn){
            			btn.getParent().hide();
            		}
				}
			],

			});
		}
		this.sheet.show();
	},


	// PhoneGap API to get image from either gallery or take a picture from camera using native API access.

	getImage: function(srctype,btn){
		navigator.camera.getPicture(onSuccess,onFail,{
			quality: 50,
			//destinationType: Camera.DestinationType.FILE_URI,
			destinationType: 1,
			sourceType: srctype,
			correctOrientation: true,
			mediaType: 0,
			targetWidth:500,
			targetHeight:500,
		});
		
		function onSuccess(imageURI){
			alert(imageURI);
			imagesrc = imageURI;
			//btn.getParent().getParent().getAt(0).setSrc(imageURI);
			//btn.getParent().getComponent('upload').enable();

			window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
      			alert(fileEntry.fullPath);
      			imagesrc = fileEntry.fullPath;
      		}, onFail);

			if(btn.getItemId()== 'selectprof'){
				btn.getParent().getAt(1).enable();
			}else if(btn.getItemId() == 'imageclick'){
				infopanel.getAt(1).getAt(0).setSrc(imagesrc);
				btn.getParent().getAt(1).enable();
			}
			

		}
		function onFail(message){
			alert(message);
		}
	},

	// called when about icon is pressed on Login view. Gets static data from server and displays in a pop up

	aboutApp: function(){
		var bb= localStorage.getItem('Base-URL');
		bb = bb + 'user/aboutApp';
		console.log(bb);
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: 'Loading',
		});
		Ext.Ajax.request({
			url:bb,
			method: 'GET',
			noCache: false,
			startParam: '',
			pageParam: '',
			limitParam: '',
			timeout:40000,
			headers: {
						'Access-Control-Allow-Origin':'*',
					},
			success: function(response,opts){
				Ext.Viewport.setMasked(false);
				var responseObj = Ext.decode(response.responseText);
				console.log(responseObj);
				if(responseObj.status == 200){
					//start if

					//if (!this.overlay) {
                        this.overlay = Ext.Viewport.add({
                            xtype: 'panel',
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

                            // adjust width of the popup based on the device
							width: Ext.os.deviceType == 'Phone' ? "100%" : "80%",
               				height: Ext.os.deviceType == 'Phone' ? "70%" : "50%",
                            styleHtmlContent: true,
                            html: responseObj.message,
                            items: [
                                {
                                    docked: 'top',
                                    xtype: 'toolbar',
                                    title: 'About OutdoorBuddies',
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
                                }
                            ],
                            scrollable: true
                        });
                   // }
                    //this.overlay.hide();
                    this.overlay.show();
                

					//end if
				}else {
					Ext.Msg.alert('Error',responseObj.message,Ext.emptyFn);
				}
			},
			
			failure: function(response,opts){
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert('Error','Error in About Info',Ext.emptyFn);
			}
		});
	},

});

