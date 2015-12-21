Ext.define('OutdoorBuddies.controller.LoginController',{
	extend: 'Ext.app.Controller',
	
	config:{
		views: ['LoginView'],
		
		refs:{
			loginForm: '#loginform',
		},

		control:{
			'button[action=submitAction]': {
				tap : 'submitLoginForm',
			}
		},
	},

	init: function(){

		// init function for controller. Initialize base service url for the application

		//localStorage.setItem('Base-URL', 'http://ec2-54-148-120-29.us-west-2.compute.amazonaws.com:80/RestOutBuddy/rest/service/');
		//localStorage.setItem('Base-URL-Img', 'http://ec2-54-148-120-29.us-west-2.compute.amazonaws.com:80/RestOutBuddy/');
		//localStorage.getItem('Base-URL-Img');
		//localStorage.setItem('Base-URL-Img', 'http://ec2-54-148-120-29.us-west-2.compute.amazonaws.com:80/RestOutBuddy/');

		// create side menu
		this.createMenu();
		localStorage.setItem('Base-URL', 'http://localhost:8080/RestOutBuddy/rest/service/');
		localStorage.setItem('Base-URL-Img', 'http://localhost:8080/RestOutBuddy/');
		//localStorage.setItem('Base-URL-Img', 'http://192.168.1.11:8080/RestOutBuddy/');
		//localStorage.setItem('Base-URL', 'http://192.168.1.11:8080/RestOutBuddy/rest/service/');
	},

	// this is called when user submit the login form
	submitLoginForm: function(){
		// get login form data
		var formdata = this.getLoginForm();
		console.log(formdata.getValues());
		var username = formdata.getValues().username;
		var password = formdata.getValues().password;
		var fields = this.getLoginForm().getFields();
		var empty,field,name,gempty=false;
		// check if any fields are empty
		for(name in fields){
			field = fields[name];
			empty = (!field.getValue() || field.getValue() == "");
			if(empty && name != 'remember'){
				field.setCls('updateColor');
				gempty=empty;
			}else {
				field.removeCls('updateColor');
			}
		}
		if(gempty){
			Ext.Msg.alert('Error','Please Fill Required Fields',Ext.emptyFn);
		}

		// save or delete form fields based on remember me check box
		if(formdata.getValues().remember){
			localStorage.setItem('username',username);
			localStorage.setItem('password',password);
		}else{
			localStorage.setItem('username','');
			localStorage.setItem('password','');
		}

		if(!gempty){
			var base_url = localStorage.getItem('Base-URL');
			base_url = base_url+'user/authenticate?username=';
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: 'Loading',
			});
			base_url=base_url+username+'&passwd='+password;
			//base_url=base_url+'&content_type=json';
			console.log(base_url);

			// authenticate username and password
			Ext.Ajax.request({
				url: base_url,
				method: 'POST',
				noCache: false,
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

					// login success
					if(resp_obj.status == 200){
						localStorage.setItem('user_id',resp_obj.userid);
						Ext.getCmp('loginform').destroy();

						// initialize home tab view
						Ext.Viewport.add(Ext.create('OutdoorBuddies.view.TabView'));
						//Ext.create('OutdoorBuddies.view.MapView');
						Ext.Viewport.setMasked(false);
						Ext.Viewport.setActiveItem('tabview');

						// populate user data in user home view
						Ext.getCmp('homeview').getAt(0).getAt(0).setData(resp_obj);
						Ext.getCmp('homeview').getAt(0).setTitle('Welcome ' + resp_obj.firstname +' !');
						//Ext.getCmp('mapview').destroy();
					}else if(resp_obj.status == 500){
						Ext.Msg.alert('Error',resp_obj.address,Ext.emptyFn);
					}
				},
				
				failure: function(response,opts){
					Ext.Viewport.setMasked(false);
					Ext.Msg.alert('Error','Something Went Wrong',Ext.emptyFn);
				}
			});
		
		}
	},

	createMenu: function(){
		// create settings menu on the left
		var menu = Ext.create('Ext.Menu', {
	    items: [
	         {
	             text: 'Logout',
	             iconCls: 'action',
	             action: 'logoutAction'
	         }
	     ]
	 });

	 Ext.Viewport.setMenu(menu, {
	     side: 'left',
	     reveal: true
	 });

	 //Ext.Viewport.showMenu('left');
	}


});
