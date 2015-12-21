// This view displays Google Maps and nearby Outdoor game clubs
Ext.define('OutdoorBuddies.view.MapView', {
    extend: 'Ext.Container',
    requires: ['Ext.Map'],
    xtype: 'mapview',
    id: 'mapview',
    config: {
        title: 'Maps',
        iconCls: 'maps',
        styleHtmlContent: true,
        showAnimation: 'pop',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items:[
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back',
                        align: 'left',
                        handler: function(){
                            //Ext.getCmp('mapview').destroy();
                            Ext.Viewport.setActiveItem('tabview');
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'textfield',
                        name: 'map_text_input',
                    }
                ]
            },
            {
                xtype: 'map',
                mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 12,
                },
                useCurrentLocation: false,
            }
        ]
    },
 
    initialize: function(){
        // initializes Map view and access user current location
       var me = this;
        me.callParent(arguments);
        OutdoorBuddies.app.getController('RegisterController').onAllowLocation(0,1, function(){
            var mapPanel = me.down('map');
            var gMap = mapPanel.getMap();
            var latlong = JSON.parse(localStorage.getItem('location'));
            var latlng = new google.maps.LatLng(latlong.lat, latlong.lng);
            console.log("in callback");
            //mapPanel.setMapOptions({center: latlng});
            //console.log("In callback");
            mapPanel.setMapCenter(latlng);
            var marker = new google.maps.Marker({
                map: gMap,
                animation: google.maps.Animation.DROP,
                position: latlng,
            });
            setTimeout(function(){
                gMap.panTo(latlng);
            }, 1000);
        });
        Ext.Function.defer(this.initMap, 100, this);
        //this.initMap();
    },
 
    initMap: function(){
        var mapPanel = this.down('map');
        var gMap = mapPanel.getMap();

        if (gMap == null) {
           Ext.Function.defer(this.initMap,250,this);
        }else {
            var latlong = JSON.parse(localStorage.getItem('location'));
            var latlng;
            if(latlong){
                latlng = new google.maps.LatLng(latlong.lat, latlong.lng);
                //console.log(latlng);
                //mapPanel.setMapOptions({center: latlng});

                // mapPanel.setMapCenter(latlng);
                // var marker = new google.maps.Marker({
                //     map: gMap,
                //     animation: google.maps.Animation.DROP,
                //     position: latlng,
                // });
                // setTimeout(function(){
                //     gMap.panTo(latlng);
                // }, 1000);
            }

            // binding search field as google maps search field
            
            var map_input = document.getElementsByName('map_text_input')[0];
            var searchBox = new google.maps.places.SearchBox(map_input);

            // google.maps.event.addListener(marker,'mousedown', function(mapEvent){
            //     console.log("CLicked");
            //     console.log(mapEvent);
            //     console.log(mapEvent.latLng);
            // });

            // display markers based on the search resutls.

            var markers = [];
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(searchBox, 'places_changed', function(){
                var places = searchBox.getPlaces();
                console.log(searchBox);
                if(places.length == 0){
                    return;
                }

                for (var i = 0, marker; marker = markers[i]; i++) {
                    marker.setMap(null);
                }
                 markers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(100, 100),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(35, 35)
                    };
                    var marker = new google.maps.Marker({
                        map: gMap,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location
                    });

                    marker.placedata = place;
                    // event listner whenever marker is pressed. It displays popup button with the place details.
                    google.maps.event.addListener(marker,'mousedown', function(mapEvent){
                        var content = this;

                        Ext.Viewport.add({
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
                            width: Ext.os.deviceType == 'Phone' ? "100%" : "80%",
                            height: Ext.os.deviceType == 'Phone' ? "70%" : "50%",
                            styleHtmlContent: true,
                            //html: content,
                            items: [
                                {
                                    docked: 'top',
                                    xtype: 'toolbar',
                                    title: 'Select Sports Club',
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
                                },
                                {
                                    xtype: 'fieldset',
                                    title: 'Place Details',
                                    defaults: {
                                        margin: '5px',
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<b>Name: </b>' + content.placedata.name,
                                        },
                                        {
                                            xtype: 'label',
                                            html: '<b>Address: </b>' + content.placedata.formatted_address,
                                        },
                                        {
                                            xtype: 'label',
                                            //html: 'Unknown',
                                            html: '<b>Distance from current position: </b>' + (latlng ? ((google.maps.geometry.spherical.computeDistanceBetween (latlng,content.placedata.geometry.location)/1000).toFixed(2)) : 'Unknown') + ' kms',
                                        }
                                        
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    text: 'Confirm Place',
                                    ui: 'confirm',
                                    handler: function(){
                                        Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(4).setValue(content.placedata.name);
                                        Ext.ComponentQuery.query('schedulegameview #eventdetails')[0].getAt(5).setValue(content.placedata.formatted_address);
                                        this.getParent().destroy();
                                        // Ext.getCmp('mapview').destroy();
                                        Ext.Viewport.setActiveItem('tabview');
                                        for (var i = 0, marker; marker = markers[i]; i++) {
                                            marker.setMap(null);
                                            map_input.value = "";
                                        }
                                    }
                                }
                            ],
                            scrollable: true
                        }).show();
                    });
                    markers.push(marker);

                    bounds.extend(place.geometry.location);
                }
                gMap.fitBounds(bounds);
            });
 

        }
        
    }
});