// This view used to display registration form.
Ext.define('OutdoorBuddies.view.RegisterView',{
	extend: 'Ext.form.Panel',
	
	requires: ['Ext.field.Toggle',
				'Ext.field.Email',
				'Ext.field.Select',
				'Ext.field.DatePicker'
				],
	
	xtype: 'registerform',
	id: 'registerform',

	config:{
		layout: { 
			pack: 'center',
			/*animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            },*/
		},
		showAnimation: 'slide',
		fullscreen: true,
		
		items:[
			{
				xtype:'titlebar',
				docked: 'top',
				title: 'OutdoorBuddies',
				items:[
					{
						xtype:'button',
						ui: 'back',
						text: 'Back',
						handler: function(){
							//Ext.getCmp('loginform').destroy();

							Ext.Viewport.add(Ext.create('OutdoorBuddies.view.LoginView'));
							Ext.getCmp('registerform').destroy();						
						}
					},	
				],
			},
			{
				xtype: 'fieldset',
				title: 'Details',
				defaults: {
					labelWidth: '35%',
					required: true,
				},
				items:[
					{
						xtype: 'textfield',
						label: 'Firstname',
						placeHolder: 'Enter Firstname',
						name: 'firstname',
						autoCapitalize: true,
					},
					{
						xtype: 'textfield',
						label: 'Lastname',
						placeHolder: 'Enter Lastname',
						name: 'lastname',
						autoCapitalize: true,
					},
					{
						xtype: 'textfield',
						label: 'Username',
						placeHolder: 'Enter Username',
						name: 'username'
					},
					{
						xtype: 'passwordfield',
						label: 'Password',
						placeHolder: 'Enter Password',
						name: 'password',
					},
					{
						xtype: 'passwordfield',
						label: 'Password',
						placeHolder: 'Retype',
						name: 'password1',
					},
					{
						xtype: 'emailfield',
						label: 'Email',
						placeHolder: 'abc@xyz.com',
						name: 'email'
					},
					{
						xtype: 'textfield',
						label: 'Mobile',
						placeHolder: 'xxx-xxx-xxxx',
						name: 'mobile',
						maxLength: 10,
					},
					{
						xtype: 'selectfield',
						label: 'Gender',
						name: 'gender',
						options:[
							{
								text: 'Male',
								value: 'M'
							},
							{
								text: 'Female',
								value: 'F'
							},
						],
					},
					{
						xtype: 'datepickerfield',
						destroyPickerOrHide: true,
						name: 'dob',
						label: 'Date of Birth',
						value: new Date(),
						picker:{
							yearFrom: 1980,
						},
					},
					{
						xtype: 'togglefield',
						name: 'location',
						label: 'Location',
						required: false,
						itemId: 'location',
					}
				],
			},
			{
				xtype: 'button',
				text: 'Register',
				margin: '0 10px',
				ui: 'confirm',
				action: 'registerAction',
			},
		],
	}
});