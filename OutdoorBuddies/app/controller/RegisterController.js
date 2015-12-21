Ext.define('OutdoorBuddies.controller.RegisterController',{
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.util.Geolocation',
		'Ext.device.Geolocation'
	],

	config:{
		
		views: ['RegisterView'],
		
		refs: {
			registerForm: '#registerform',
		},
		
		control: {
			'button[action=registerAction]': {
				tap: 'submitRegisterForm',
			},
			'registerform #location':{
				change: 'onAllowLocation',
			}
		},
	},
	
	// onAllowLocation: function(self,newval){
	// 	if(newval == 1){
	// 		this.location = Ext.create('Ext.util.Geolocation', {
 //            	autoUpdate: false,
	//             listeners: {
	//                 locationupdate: 'onLocationUpdate',
	//                 locationerror: 'onLocationError',
	//                 scope: this
	//             }
	//         });

 //        	this.location.updateLocation();

	// 	}else {
	// 		localStorage.setItem('location', ' ');
	// 	}
		
	// },

	// onAllowLocation: function(self, newval, callback_handler){
	// 	if (newval == 1){
	// 		Ext.Viewport.setMasked({
	// 			xtype: 'loadmask',
	// 			message: 'Loading',
	// 		});
	// 		Ext.device.Geolocation.getCurrentPosition({
	// 			scope: this,
	// 			timeout: 10000,
	// 			maximumAge : 1000 * 60 * 60 * 60,
	// 			success: function(position){
	// 				console.log(position.coords);
	// 				//console.log(this.getName());
	// 				Ext.Viewport.setMasked(false);
	// 				var loc = '{ "lat":' + position.coords.latitude + ',"lng":' + position.coords.longitude + '}'
	// 				localStorage.setItem('location', loc);
	// 				var geoloc = new google.maps.Geocoder()
	// 				var latlang = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// 				//console.log(latlang);
	// 				geoloc.geocode({'latLng':latlang},function(result,status){
	// 					if(status == google.maps.GeocoderStatus.OK){
	// 						if(result[0]){
	// 							console.log(result[0].formatted_address);
	// 							localStorage.setItem('Location', result[0].formatted_address);
	// 						}else {
	// 							console.log('No results found');
	// 							localStorage.setItem('Location', ' ');
	// 						}
	// 					}else {
	// 						console.log('Geocoder failed : '+ status);
	// 						localStorage.setItem('Location',' ');
	// 					}
	// 				});
	// 				if(callback_handler){
	// 					callback_handler();
	// 				}
	// 			},
				
	// 			failure: function(position){
	// 				Ext.Viewport.setMasked(false);
	// 				Ext.Msg.alert('Error','Cannot Access Location',Ext.emptyFn);
	// 				localStorage.setItem('location', ' ');
	// 			},
	// 		});
	// 	}else{
	// 		localStorage.setItem('location',' ');
	// 	}
	// },


	// called whenever application is given permission to access location information

	onAllowLocation: function(self, newval, callback_handler){
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading',
		});
		
		// called when location is pin pointed
		function onLocation(position){
			Ext.Viewport.setMasked(false);
			var loc = '{"lat":' + position.coords.latitude + ',"lng":' + position.coords.longitude + '}'
			localStorage.setItem('location', loc);
			if(callback_handler){
				callback_handler();
			}
			
		}

		// called when failed to pin point location
		function onErrorLoc(error){
			Ext.Viewport.setMasked(false);
			console.log(error);
			Ext.Msg.alert("Error",error.message,Ext.emptyFn);
		}
		if(newval == 1){
			navigator.geolocation.getCurrentPosition(onLocation,onErrorLoc);
		}
		
	},

	// called whenevr location is updated
	onLocationUpdate: function(geo){
		console.log(geo.getLatitude() + " : " + geo.getLongitude());
		localStorage.setItem("location", '{ "lat":' + geo.getLatitude() + ',"lng":' + geo.getLongitude() + '}');
	},

	// failed to get permission to access location or location unavailable
	onLocationError: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message){
		console.log(bTimeout);
		Ext.Viewport.setMasked(false);
		Ext.Msg.alert('Error','Cannot Access Location',Ext.emptyFn);
		localStorage.setItem('location', ' ');
	},


	// called when user clicks register button
	submitRegisterForm: function(){
		// get register form data and form fields
		var data = this.getRegisterForm().getValues();
		var fields = this.getRegisterForm().getFields();
		var empty,field,name,gempty=false;
		// validate if all fields contain data
		for(name in fields){
			field = fields[name];
			empty = (!field.getValue() || field.getValue() == "");
			if(empty){
				if(!field.getRequired()){
					empty=false;
				}
			}
			if(empty){
				field.setCls('updateColor');
				gempty=empty;
			}else {
				field.removeCls('updateColor');
			}
		}
		if(gempty){
			Ext.Msg.alert('Error','Please Fill Required Fields',Ext.emptyFn);
		}
		var pwd = data.password;
		var pwd1 = data.password1;
		// check for password mismatch
		if((!(pwd===pwd1)) && !gempty){
			gempty= true;
			Ext.Msg.alert('Error','Password Mismatch',Ext.emptyFn);
		}
		console.log(data);

		if(!gempty){

			var fname = data.firstname;
			var lname = data.lastname;
			var uname = data.username;
			var email = data.email;
			var dob = Ext.util.Format.date(data.dob, 'Y-m-d');
			var base_url = localStorage.getItem('Base-URL');
			var loc = localStorage.getItem('location');
			base_url = base_url + 'user/register?username='+uname + '&password=' + pwd;
			base_url = base_url + '&firstname='+fname+'&lastname='+lname + '&email='+email;
			base_url = base_url + '&location='+loc+ '&dob=' + dob + '&mobile=' + data.mobile + '&gender=' + data.gender;
			console.log(base_url);
			// call register web service
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: 'Loading',
			});
			Ext.Ajax.request({
				url:base_url,
				timeout: 50000,
				method: 'POST',
				noCache: false,
				startParam: '',
				pageParam: '',
				limitParam: '',
				headers: {
							'Access-Control-Allow-Origin':'*',
						},
				success: function(response,opts){
					var resp_obj = Ext.decode(response.responseText);
					Ext.Viewport.setMasked(false);
					console.log(resp_obj);
					if(resp_obj.status == 200){
						//console.log(resp_obj.message);

						// on successful registration destroy register form and initialize login form to login
						Ext.Msg.alert('Registration Successful!',resp_obj.message,Ext.emptyFn);
						Ext.Viewport.setActiveItem('loginform');
						Ext.getCmp('registerform').destroy();
					}else if (resp_obj.status == 505)
					{
						//console.log(resp_obj.message);
						Ext.Msg.alert('Error',resp_obj.address,Ext.emptyFn);
						
					}else if(resp_obj.status == 501){
						Ext.Msg.alert('Error',resp_obj.address,Ext.emptyFn);
					}
				},

				failure: function(response,opts){
					Ext.Viewport.setMasked(false);
					console.log(response);
					console.log(opts);
					Ext.Msg.alert('Error','Something Went Wrong, Try Again !',Ext.emptyFn);
				}
			});
		}/*else {
			Ext.Msg.alert('Error','Please Fill Required Fields',Ext.emptyFn);
		}*/
	},

});