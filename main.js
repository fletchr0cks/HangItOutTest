
var deviceInfo = function() {
    //document.getElementById("platform").innerHTML = device.platform;
    //document.getElementById("version").innerHTML = device.version;
    try {
        document.getElementById("uuid").innerHTML = device.uuid;
        document.getElementById("uuidi").innerHTML = device.uuid;
        document.getElementById("name").innerHTML = device.name;
    } catch (Error) {
        document.getElementById("uuid").innerHTML = "PC";
    }
    //document.getElementById("width").innerHTML = screen.width;
    //document.getElementById("height").innerHTML = screen.height;
    //document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        //alert(p.coords.latitude + " " + p.coords.longitude);
        return (p.coords.latitude + "," + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

function SaveGPSLocation(lat,lng) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'loc_data',
        lat: lat,
        longval: lng
    };

    // save it
    store.save(me);
    return 1;
}

var getGPSLocation = function() {
    var suc = function(p) {
        alert("GPS1= " + p.coords.latitude + " " + p.coords.longitude);
        var GPS_saved = SaveGPSLocation(p.coords.latitude, p.coords.longitude);
        if (GPS_saved == 1) {
            $("#data_status").append("<br /> saved GPS");
            return 1;
        } else {
            return 0;
        }
    };
    var locFail = function() {
        alert("GPS fail");
        $("#data_status").append("<br /> GPS fail");
        return 0;
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};


var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function check_network() {
try {
    var networkState = navigator.network.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'NONE';

    //confirm('Connection type:\n ' + states[networkState]);
    
} catch (Error) {
//alert(Error);
     return "PC";
    }
return states[networkState];
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function setPC(postcode) {
    //$("setloc").dialog("close");
    //var postcode = $("set_pc").val();
    var postcode = document.getElementById("postcode").value;
    var pc_uri = encodeURI(postcode);
    
    getLatLng(pc_uri);
}

function saveName() {
    //$("setloc").dialog("close");
    //var postcode = $("set_pc").val();
    var username = document.getElementById("username1").value;
    //alert(username);
 
    $('#my_details').dialog('close')
//    $.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}

function GetGPSData() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Getting location</p>"
    });
    var GPS_state = getGPSLocation;
    if (GPS_state == 1) {
        var position = getPosition();
        //should be get locatin from gps then save
        var latlng = position.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        getPlace(lat, lng);
    } else {
    $.mobile.loading('hide');
    $("#loc_here").html("Click here to set manually");
    }
    
}


var start = function() {
alert("ready");
    
    $("#showmaplink").removeClass("ui-disabled");
    $("#showmaplink").addClass("ui-enabled");

    $("#my_details_link").removeClass("ui-disabled");
    $("#my_details_link").addClass("ui-enabled");

    $("#add_site_link").removeClass("ui-disabled");
    $("#add_site_link").addClass("ui-enabled");

    $("#my_sites_link").removeClass("ui-disabled");
    $("#my_sites_link").addClass("ui-enabled");

    //startmap();
    //document.getElementById("uuidi").innerHTML = device.uuid;
    var network = check_network();
    //alert(network);
    $('#connection').html(network);
    if (network == "NONE" || network == null) {
        checkCache(0, network);
    } else {
        checkCache(1, network);
    }
};


function init() {
    //  $("#set_pc").buttonMarkup({ inline: true });
    document.addEventListener("deviceready", save_id, false);
        //save_id();
  
}

function save_id() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Checking connection id</p>"
    });
    try {
        var phoneid = device.uuid;
        $("#uuid").html(phoneid);
} catch (Error) {
    var phoneid = "laptop2";
    }
    $.ajax({
        type: "POST",
        url: "http://washingapp.apphb.com/Home/Save",
        //url: "http://localhost:3192/Home/Save",
        data: "lat=22&lval=37&city=nb&country=uk&comment=" + phoneid,
        dataType: "text/plain",
        success: function(response) {
            //alert("posted" + lat + ":" + lval);
            //var json = eval('(' + response + ')');
            //alert("out=" + json);
        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

            //alert("save error" + data);
        },
        complete: function(xhr, status) {

            load_data();
        }
    });

}

//get name + userID, API calls #
function load_data() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Loading data</p>"
    });

    $.ajax({
        type: "GET",
        url: "http://washingapp.apphb.com/Home/GetAllUsersNew",
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
            $.each(json, function(i, markers) {
                var siteLatLng = new google.maps.LatLng(markers.latitude, markers.longitude);
            });

        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            GetGPSData();
            $("#data_status").html("Almost done...");

        }
    });
    
}

function setMarkers(map,bounds_map) {
    //loop through and place markers
    //$.mobile.changePage("#myDialog", { role: "dialog", overlayTheme: "e" });
    
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    $('#map_markers').html("Details here");
    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
        url: "http://washingapp.apphb.com/Home/GetAllUsersNew",
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
            $.each(json, function(i, markers) {
                console.log(markers.latitude, markers.longitude, markers.title, i);
                var siteLatLng = new google.maps.LatLng(markers.latitude, markers.longitude);
                var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable:true });
                markers_array.push(markerp);
                marktxt = marktxt + "<p>" + markers.title + i + "</p>";

                //attach infowindow on click
                google.maps.event.addListener(markerp, "click", function() {
                    $('#map_markers').fadeOut().html("<p>Click: " + markers.title + "</p>").fadeIn();
                });

                google.maps.event.addListener(markerp,"drag", function() {
                $('#map_msg').html(markerp.position.lat());
                });


           });
            var mcOptions = { gridSize: 100, maxZoom: 15 };
            //$("#popupPadded").popup("close");
            $("#map_overlay").fadeOut();
            var markerCluster = new MarkerClusterer(map, markers_array, mcOptions);
            //console.log(markers_array);
            // $('#map_markers').html(marktxt);

        },
        error: function(xhr, error) {
            console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            $("#map_msg").html("Done.");
        }
    });

}

function setMarker_site(map, bounds_map,lat,lng) {
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    var siteLatLng = new google.maps.LatLng(lat,lng);
    var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map:map });
   //             markers_array.push(markerp);

                //attach infowindow on click
                google.maps.event.addListener(markerp, "drag", function() {
                    $('#marker_coords').html(markerp.position.lat());
                });

 //           var mcOptions = { gridSize: 100, maxZoom: 15 };
            //$("#popupPadded").popup("close");
            $("#set_map_overlay").fadeOut();
   //         var markerCluster = new MarkerClusterer(map, markers_array, mcOptions);
            //console.log(markers_array);
            // $('#map_markers').html(marktxt);

}

function getPosition() {
    var lat = "";
    var longval = "";
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('loc_data', function(theJsonData) {
        lat = theJsonData.lat;
        longval = theJsonData.longval;
       // $("#loc").html("lat " + lat + "long " + longval);

    });

    var loc = lat + "," + longval;
   
    return loc;

}
   


function GoogleMap(lat,lng) {
    $("#map_overlay").fadeIn();
    alert(lat + lng);
    this.initialize = function() {

        var map = showMap();
    }
    var showMap = function() {
        var mapOptions = {
        zoom: 10,
            center: new google.maps.LatLng(parseFloat(lat),parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', function() {
            bounds = map.getBounds();
            $("#map_msg").html(bounds + "bds");
        });
        setMarkers(map, bounds);
        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });
        $("#map_msg").html("Loading markers ... ");

        return map;
    }

}

function GoogleMap_set(lat, lng) {
    $("#set_map_overlay").fadeIn();
    var siteLatLng = lat + "," + lng;
    this.initialize = function() {

        var map = showMap();
    }
    var showMap = function() {
        var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("set_map_canvas"), mapOptions)
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', function() {
            bounds = map.getBounds();
        });
        setMarker_site(map, bounds, lat, lng);
       
        var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
        $("#set_map_overlay").fadeOut();
        
        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

        return map;
    }

}

function startmarkers() {
    var map = new google.maps.Map(document.getElementById("map_canvas"))
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-33, 155),
        title: "Hello World!"
    });
    marker.setMap(map);
}

// To add the marker to the map, call setMap();

function initsocial() {
    var network = check_network();
    alert(network);
    if (network == "PC") {
        startmap();
    } else {
        document.addEventListener("deviceready", startmap, false);
    }


}

function getPlace(lat,lng) {
    var town;
    $.ajax({
        type: "GET",
        //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
        url: "http://api.geonames.org/findNearbyPlaceNameJSON?lat=" + lat + "&lng=" + lng + "&username=fletch1",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.geonames, function(i, geo) {
                town = geo.toponymName;

            });
            $("#loc_here").html(town);
            //SaveNewLocation(lat, lng, town);

        },
        error: function(xhr, error) {
            $("#loc_here").html("No town listed for: " + lat + "," + lng);

        },
        complete: function(xhr, status) {
        $.mobile.loading('hide');
            start();
            
            //$("#map_msg").html("Done.");
        }

    });
}

function getLatLng(postcode) {
    var lat;
    var lng;
    var town;
    alert(postcode);
    $.ajax({
        type: "GET",
        url: "http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=" + postcode + "&country=GB&username=fletch1",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.postalCodes, function(i, geo) {
                town = geo.placeName;
                lat = geo.lat;
                lng = geo.lng;
            });
            $("#pc_results").html("<h4>" + town + "</h4><h4>Lat: " + lat + "</h4><h4>Long: " + lng + "</h4>");
            SaveNewLocation(lat, lng, town);
            $("#loc_here").html(town);
            $("#showmaplink").removeClass("ui-disabled");
            $("#showmaplink").addClass("ui-enabled");

        },
        error: function(xhr, error) {
            $("#pc_results").html("No town listed for: " + lat + "," + lng);
            alert("fail");

        },
        complete: function(xhr, status) {
            //$("#map_msg").html("Done.");
        }

    });
}

function SaveNewLocation(lat, lng, town) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'loc_data',
        lat: lat,
        longval: lng
    };

    // save it
    store.save(me);
}
//pc_results = <h3>lat lng here</h3><h3>34343 343444433</h3>

var timera;
var timerb;
function startmap() {
    clearTimeout(timera);
    var position = getPosition();

    var latlng = position.split(',');
    var lat = latlng[0];
    var lng = latlng[1];
    var map = new GoogleMap(lat,lng);
    map.initialize();
    //google.maps.event.trigger(map, 'resize');

}

function startmap_set() {
    clearTimeout(timerb);
    var position = getPosition();

    var latlng = position.split(',');
    var lat = latlng[0];
    var lng = latlng[1];
    var map = new GoogleMap_set(lat, lng);
    map.initialize();
    //google.maps.event.trigger(map, 'resize');

}

function showmap() {
    timera = setInterval(function() { startmap() }, 1000);
}

function add_site_map() {
    timerb = setInterval(function() { startmap_set() }, 1000);
}


function checkCache(data,network) {
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
});

if (data == 1) {

    store.exists('app_data', function(available) {

        if (available) {
            //check data age, get epoch, have location
            checkDataAge();

        } else {
            //no stored data, first time login
            $("#loc_result").append('<br />no stored data, first time login:');
            var loc = checkLocation(network);
            if (loc == 1) {
                getDatalocalNew();
            } else {
            $("#loc_result").append('<br />cant get location');
            }

        }
    });
} else {
//no data, check cache
store.exists('app_data', function(available) {

    if (available) {
        //check data age, get epoch, have location
        getCacheNew("olddata");

    } else {
        //no data, first time login
    var loc = checkLocation(network);
    if (loc == 1) {
        $("#loc_result").append('<br />no data, can get location');
    } else {
        $("#loc_result").append('<br />no data, cant get location');
    }

    }
});


//quit

}
}

function checkDataAge() {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
});

store.get('app_data', function(theJsonData) {
    var epochdata = theJsonData.epoch;
    $("#loc_result").append('<br />stored:' + epochdata + 'now: ' + Math.round(new Date().getTime() / 1000));
    var diff = Math.round(new Date().getTime() / 1000) - epochdata;
    if (diff > 600) {
        $("#loc_result").append('<br />' + diff + ' exp data, get new');
        var network = check_network();
        //alert(network);
        $('#connection').html(network);
        if (network == "NONE" || network == null) {
            $("#loc_result").append('<br />' + diff + ' old data, get cache anyway');
            getCacheNew("olddata");
        } else {
            getDatalocalNew();
            
        }    
        
    } else {
    $("#loc_result").append('<br />' + diff + ' recent data, get cache');
    getCacheNew("olddata");
    }
});



    return 1;

}


function checkLocation(network) {
    if (network == "PC") {
        var store = new Lawnchair({
            adapter: "dom",
            name: "data_store"
        }, function(store) {
        });

        var me = {
            key: 'loc_data',
            lat: "56.058168",
            longval: "-2.719811"
        };

        // save it
        store.save(me);

        return 1;
    } else {
      
      var suc = function(p) {
            //alert(p.coords.latitude + " " + p.coords.longitude);
            var store = new Lawnchair({
                adapter: "dom",
                name: "data_store"
            }, function(store) {
            });

            var me = {
                key: 'loc_data',
                lat: p.coords.latitude,
                longval: p.coords.longitude
            };

            // save it
            store.save(me);
            return 1;
        };
        var locFail = function() {

            return 0;
        };
        navigator.geolocation.getCurrentPosition(suc, locFail);


    }
  
}

function checkDataMain() {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.exists('loc', function(available) {

        if (available) {
            store.get('loc', function(me) {
            $("#loc_result").append('<br />Found loc:' + me.value);
                //checkData();
            });
        } else {
        $("#loc_result").append('<br />no location');

          
        }
    });



}