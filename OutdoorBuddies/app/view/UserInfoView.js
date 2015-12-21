// This view is to display detailed user information when user clicks on image in HomeView
Ext.define('OutdoorBuddies.view.UserInfoView',{
extend: 'Ext.form.Panel',

	xtype: 'userinfoview',
	id: 'userinfoview',

	config: {
		layout: {
			pack: 'center',
		},
		showAnimation: 'slide',
		fullscreen: true,
		items:[
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'User Profile',
				items: [
					{
						xtype: 'button',
						ui: 'back',
						text: 'Back',
						handler: function(){
							Ext.Viewport.setActiveItem('tabview');
							Ext.getCmp('userinfoview').destroy();
						},
					},
				],
			},
			{
				xtype: 'fieldset',
				title: 'Profile Picture',
				layout: 'hbox',
				items: [
					{
						xtype: 'image',
						cls: 'userimage',
						mode: 'image',
						itemId: 'imageid',
						flex: 1,
					},
					{
						xtype: 'panel',
						layout: 'vbox',
						flex: 1,
						defaults: {
							xtype: 'button',
							flex: 1,
							margin: '5',
						},
						items: [
							{
								text: 'Select',
								name: 'imageurl',
								action: 'selectPic',
								itemId: 'selectprof'
							},
							{
								text: 'Upload',
								ui: 'confirm',
								disabled: true,
								id: 'uploadprof',
								action: 'uploadPic',
							},
						],
					}
				],
			},
			{
				xtype: 'fieldset',
				title: 'Profile',
				defaults: {
					labelWidth: '35%',
				},
				items: [
					{
						xtype: 'textfield',
						label: 'Username',
						name: 'username',
						placeHolder: 'Enter Displayname'
					},
					{
						xtype: 'textfield',
						label: 'Firstname',
						name: 'firstname',
						placeHolder: 'Enter Firstname'
					},
					{
						xtype: 'textfield',
						label: 'Lastname',
						name: 'lastname',
						placeHolder: 'Enter Lastname'
					},
					{
						xtype: 'textfield',
						label: 'Email',
						name: 'email',
						placeHolder: 'Enter Email',
					},
					{
						xtype: 'textfield',
						label: 'Mobile',
						name: 'mobile',
						placeHolder: 'Mobile Number'
					},
					{
						xtype: 'panel',
						layout: 'hbox',
						defaults: {
							xtype: 'button',
							flex: 1,
							margin: '10',
						},
						items: [
							{
								text: 'Edit',
								ui:'decline',
								scope: this,
								hasDisabled: true,
								handler: function(btn){
									var form = Ext.getCmp('userinfoview');
									// By default all user filds are disabled. If user needs to update his information, clicking this button makes fields editable
									if(btn.hasDisabled){
										form.enable();
										btn.getParent().getAt(1).enable();
										btn.hasDisabled = false; 
									}else {
										form.disable();
										btn.getParent().getAt(1).disable();
										btn.hasDisabled = true;
									}
								},
							},
							{
								text: 'Update',
								ui: 'confirm',
								disabled: 'true',
								action: 'updateProf',
								/*handler: function(btn){
									//Ext.getCmp('userinfoview').disable();
									//btn.disable();
									//btn.getParent().getAt(0).hasDisabled= true;

								}*/
							}
						],
					},
				],//first fieldset
			},
			
		],//main items
	},
});