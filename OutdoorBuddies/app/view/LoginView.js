// This view displays login screen of the app.
Ext.define("OutdoorBuddies.view.LoginView", {
    extend: 'Ext.form.Panel',
	
	requires: [
		'Ext.field.Password',
		'Ext.form.FieldSet',
		'Ext.TitleBar',
		'Ext.Label',
	],
	
	xtype: 'loginform',
	id: 'loginform',
	config : {
		layout: {
			//pack: 'center',
			align: 'stretch',
			layout: 'fit',
			type: 'vbox',
		},
		fullscreen: true,
		showAnimation: 'pop',
		scrollable: true,
		//html: ["<div id= 'forgot' align='center'><u>Forgot Password ? </u></div>"].join(''),
		items :[
			{
				xtype:'titlebar',
				docked: 'top',
				title: 'OutdoorBuddies',
				items:[
					{
						iconCls: 'info',
						iconMask: true,
						ui: 'plain',
						action: 'aboutAction',
					}
				]
			},
			{
				xtype: 'fieldset',
				title: 'Login',
				defaults: {
					labelWidth: '40%',
				},
				items:[
					{
						xtype: 'textfield',
						label: 'Username',
						placeHolder: 'Enter Username',
						name: 'username',
						value: localStorage.getItem('username'),
					},
					{
						xtype: 'passwordfield',
						label: 'Password',
						placeHolder: 'Enter Password',
						name: 'password',
						value: localStorage.getItem('password'),
					},
					{
						xtype: 'togglefield',
						label: 'Remember',
						name: 'remember',
						scope: this,
						value: true,
					}
				]
			},
			{
				xtype: 'panel',
				layout:{
					type: 'vbox',
					align: 'stretch',
					layout: 'fit',
				},
				items:[
					{
						//xtype: 'panel',
						//flex: 1,
						layout:{
							type: 'hbox',
							align: 'stretch',
						},
						defaults:{
							margin: 10,
						},
						items: [
							{
								xtype: 'button',
								ui: 'confirm',
								text: 'Submit',
								flex: 1,
								action: 'submitAction',
							},
							{
								xtype: 'button',
								text: 'Reset',
								scope: 'this',
								flex: 1,
								handler: function(){
									//localStorage.setItem('username','');
									//localStorage.setItem('password','');
									Ext.getCmp('loginform').setValues({
										username:'',
										password:'',
									});
								}
							},
						]
					},
					
				],
				
			},
			{
				xtype:'button',
				text: 'Forgot Password ?',
				ui: 'plain',
				iconMask: true,
				margin: '20',
				
			},
			{
				xtype:'toolbar',
				docked: 'bottom',
				items: [
					{
						xtype: 'spacer',
					},
					{
						xtype:'button',
						ui: 'forward',
						text: 'Register',
						handler: function(){
							Ext.Viewport.add(Ext.create('OutdoorBuddies.view.RegisterView'));
							Ext.getCmp('loginform').destroy();
							//Ext.Viewport.setActiveItem(2);						
						}
					}	
				],
			},
			
		]
	}
});