
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

function format_bounds(bds) {
  
var bds2 = bds.replace("((","");
var bds3 = bds2.replace("))","");
var bds4 = bds3.replace("), (",",");
var bds5 = bds4.replace(" ","");
var bds6 = bds5.replace(" ","");
return(bds6);
}

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

function SaveLoginDetails(APIcalls,phonename,userID) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    var me = {
        key: 'login_data',
        APIcalls: APIcalls,
        phonename: phonename,
        userID: userID
    };

    // save it
    store.save(me);
   
}

var getGPSLocation = function() {
    
    var suc = function(p) {
        var GPS_saved = SaveGPSLocation(p.coords.latitude, p.coords.longitude);
        if (GPS_saved == 1) {
            $("#data_status").append("<br /> saved GPS:" + p.coords.latitude, p.coords.longitude);
            GPS_done(1);
        } else {
            GPS_done(0);
        }
    };
    var locFail = function() {
        alert("GPS fail");
        $("#data_status").append("<br /> GPS fail");
        GPS_done(0);
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

function nuke() {
    var storea = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(storea) {
});


storea.nuke();

alert("nuked");

}

function getFromStore(storetype,storeval) {
    var item;
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    
    return item;
    });

    store.exists(storetype, function(available) {

    if (available) {
            store.get(storetype, function(theJsonData) {
                item = theJsonData.storeval;              
            });
        } else {
            
        }
    });

    
}

function checkStore() {
    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.exists('app_data', function(available) {

        if (available) {
            store.get('app_data', function(theJsonData) {
                var epochdata = theJsonData.epoch;
                $("#data_status").append('<br />stored:' + epochdata + 'now: ' + Math.round(new Date().getTime() / 1000));
                var diff = Math.round(new Date().getTime() / 1000) - epochdata;
                if (diff < 600) {
                    $("#data_status").append('<br />' + diff + ' revent data, get cache edit');
                    getWeather(0);

                } else {
                $("#data_status").append('<br />' + diff + ' expired data, get new');
                    getWeather(1);
                }
            });
        } else {
        $("#data_status").append('<br />no app data');
        getWeather(1);


        }
    });



}

function logWeather(userid,latval,longval) {

    $.ajax({
        type: "POST",
        url: "http://localhost:3192/Home/GetWeather",
        data: "userID=" + userid + "&latval=" + latval + "&longval=" + longval,
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
        $('#data_status').append("<br /> logged: " + userid);

        }
    });

}


function getWeather(timediff) {

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
        $('#data_status').append("<br /> lat " + lat + "long " + longval);

    });

    var loc = lat + "," + longval;

    var APIcalls = getFromStore("login_data", "APIcalls");
    var userid = 11;
    //getFromStore("login_data", "userID");
    $('#data_status').append("<br /> API from store " + APIcalls);

    if (timediff == 1) {

        logWeather(userid,lat,longval);

        $.ajax({
            type: "GET",
            url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            //url: "json.txt",
            //dataType: "html",
           dataType: "jsonp",
            success: function(json) {
            //var jsontxt = eval('(' + json + ')');
                
                var jsontext = JSON.stringify(json);
                var location = json['location']['city'];
                $('#data_status').append("<br /> Location from data local new " + location);

             
                var epoch = Math.round(new Date().getTime() / 1000)
                var timenow = new Date();
                var hour_now = timenow.getHours();
                var minute_now = timenow.getMinutes();
                var today = timenow.getDate();
                $('#data_status').append("<br /> save: " + epoch);
                var me = {
                    key: 'app_data',
                    json: jsontext,
                    hoursaved: hour_now,
                    minsaved: minute_now,
                    datesaved: today,
                    epoch: epoch
                };

                store.save(me);

                //getCacheNew("newdata");
            },
            error: function(xhr, error) {
                console.debug(xhr); console.debug(error);
            },
            complete: function() {
                //load weather
                
                getCacheBW("newdata");
                $.mobile.loading('hide');
                start();


            }

        });

    } else {

    getCacheBW("olddata");
    $.mobile.loading('hide');
    start();
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
    $("#phone_name").html(username);
    $('#my_details').dialog('close')
//    $.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}

function saveSite() {
    var username = document.getElementById("usernameid").value;
    var sitename = document.getElementById("sitenameid").value;
    var comment = document.getElementById("commentid").value;
    var latval = document.getElementById("lat_coord").innerHTML;
    var longval = document.getElementById("long_coord").innerHTML;
    var userid = 11;
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/SavePlace",
        url: "http://washingapp.apphb.com/Home/SavePlace",
        data: "username=" + username + "&placename=" + sitename + "&comment=" + comment + "&latval=" + latval + "&longval=" + longval + "&userid=" + userid,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
        
        },
        error: function(xhr, error) {
        // console.debug(xhr); console.debug(error);
        $("#saveSite").html("Save Failed");

        },
        complete: function(xhr, status) {
        $("#saveSite").html("Saved");
        //$.mobile.changePage('index.html#one', { allowSamePageTransition: true, transition: "none" });
        
        }
    });
    //$.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}

function saveMovedSite() {
    var PID = document.getElementById("MPID").innerHTML;
    var latval = document.getElementById("lat_coordm").innerHTML;
    var longval = document.getElementById("long_coordm").innerHTML;
    var userid = 11;
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/MovePlace",
        url: "http://washingapp.apphb.com/Home/MovePlace",
        data: "latval=" + latval + "&longval=" + longval + "&PID=" + PID,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
        
        },
        error: function(xhr, error) {
        // console.debug(xhr); console.debug(error);
        $("#saveSitem").html("Move Failed");

        },
        complete: function(xhr, status) {
        $("#saveSitem").html("New location saved");
        //$.mobile.changePage('index.html#one', { allowSamePageTransition: true, transition: "none" });
        
        }
    });
    //$.mobile.changePage('#my_details', { allowSamePageTransition: true, transition: "none" });

}


function GetGPSData() {
    $.mobile.loading('show', {
        text: 'foo',
        textVisible: true,
        theme: 'a',
        html: "<p>Please be patient ...</p><p></p><p>Getting location</p>"
    });
    getGPSLocation();
        }


function GPS_done(retval) {
    if (retval == 1) {
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
        //checkCache(0, network);
    } else {
        //checkCache(1, network);
    }
};


function init() {
    //  $("#set_pc").buttonMarkup({ inline: true });
    document.addEventListener("deviceready", load_data, false);
    //bds = "((55.91794121734191, -3.021798358789056), (56.18635420913567, -2.443642841210931))";
    //format_bounds(bds);
    //getCacheBW("newdata");
    //load_data();

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
        $("#phone_name").html("Dave");
        GetGPSData();
        $("#data_status").html("Almost done...");
            
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
    try {
        var phoneid = device.uuid;
        $("#uuid").html(phoneid);
    } catch (Error) {
        var phoneid = "laptop3";
    }
    var userID;
    var phonename;
    var APIcalls;
    var site_ct;

    $.ajax({
    type: "POST",
        url: "http://washingapp.apphb.com/Home/SaveID",
        //url: "http://localhost:3192/Home/SaveID",
        data: "phoneID=" + phoneid,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
            userID = json['userID'];
            phonename = json['Name'];
            APIcalls = json['APIcalls'];
            site_ct = json['site_ct'];
            $('#my_sites_ct').html(site_ct);
            $('#data_status').append("API: " + userID);
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
            SaveLoginDetails(APIcalls, phonename, userID);
            $("#phone_name").html(phonename);
            GetGPSData();
            $("#data_status").append(userID + " Done 1");

        }
    });

}

var timer_m;

function setMarkers(map, bounds_map) {
    clearTimeout(timer_m);
    //var bds_fmt = "50,-4,60,4";
    var bds_fmt = format_bounds(bounds_map.toString());
    var marktxt = "";
    removeMarkers();
    var markers_array = [];
    var ct = 0;
    $.ajax({
    type: "GET",
    url: "http://washingapp.apphb.com/Home/GetSitesInRange",
        //url: "http://localhost:3192/Home/GetSitesInRange",
        data: "bounds=" + bds_fmt,
        dataType: "jsonp",
        success: function(json) {
            var jsontext = JSON.stringify(json);
            ct = json.ct;
            $.each(json.points, function(i, markers) {
                console.log(json);
                var siteLatLng = new google.maps.LatLng(markers.lat, markers.longval);
                var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true });
                markers_array.push(markerp);
                marktxt = marktxt + "<p>" + markers.name + i + "</p>";

                //attach infowindow on click
                google.maps.event.addListener(markerp, "click", function() {
                    //$('#map_markers').fadeOut().html("<p>Click: " + markers.name + markers.PID + "</p>").fadeIn();
                    ListComments(markers.PID);
                    $('#place_name').html(markers.name);
                });

                google.maps.event.addListener(markerp, "drag", function() {
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
            $("#map_msg").html(ct + " Loaded. Click to see comments ...");
        }
    });

}

function setMarker_site(map, bounds_map, lat, lng) {
    $('#lat_coord').html(lat.toString().slice(0, 9));
    $('#long_coord').html(lng.toString().slice(0, 9));
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    var siteLatLng = new google.maps.LatLng(lat, lng);
    var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
    google.maps.event.addListener(markerp, "drag", function() {
    $('#lat_coord').html(markerp.position.lat().toString().slice(0, 9));
    $('#long_coord').html(markerp.position.lng().toString().slice(0, 9));
    });
    $("#set_map_overlay").fadeOut();
}

function setMarker_move(map, bounds_map, lat, lng) {
    var latstr = lat.toString().slice(0,9);
    var lngstr = lng.toString().slice(0,9);

    $('#lat_coordm').html(latstr);
    $('#long_coordm').html(lngstr);
    var bounds = new google.maps.LatLngBounds(bounds_map);
    var marktxt = "";
    var markers_array = [];
    var siteLatLng = new google.maps.LatLng(lat, lng);
    var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
    google.maps.event.addListener(markerp, "drag", function() {
        $('#lat_coordm').html(markerp.position.lat().toString().slice(0,9));
        $('#long_coordm').html(markerp.position.lng().toString().slice(0,9));
    });
    $("#set_map_overlaym").fadeOut();
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
    });

    var loc = lat + "," + longval;

    return loc;

}

function ListSites() {
  
    var sites_html = "";
    var ct = 0;
    $.ajax({
        type: "GET",
        //url: "http://localhost:3192/Home/ListMySites",
        url: "http://washingapp.apphb.com/Home/ListMySites",
        data: "UserID=11",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.sites, function(i, result) {
                sites_html = sites_html + "<div class=\"ui-grid-b\">" +
 "<div class=\"ui-block-a\"><div class=\"ui-bar ui-bar-a\"><p></p>" + result.name + "</div></div>" +
 "<div class=\"ui-block-b\"><div class=\"ui-bar ui-bar-a\"><a href=\"index.html#move_site\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"left\" data-mini=\"true\" data-theme=\"c\" data-inline=\"true\" onclick=\"move_site_map(" + result.latitude + "," + result.longitude + "," + result.PID + ")\">Move</a></div></div>" +
"<div class=\"ui-block-c\"><div class=\"ui-bar ui-bar-a\"><a href=\"index.html#add_site\" data-role=\"button\" data-icon=\"delete\" data-iconpos=\"left\" data-mini=\"true\" data-theme=\"c\" data-inline=\"true\" onclick=\"DeleteSite(" + result.PID + ")\">Delete</a></div></div></div>" +
                "<div class=\"ui-bar ui-bar-b\" style=\"height:2px\"></div>";
                ct = json.ct;
            });
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {

        $("#sites_list").html(sites_html).trigger('create');
            $("#sites_msg").html("Sites loaded. (" + ct + ")");

        }
    });

}

function ListComments(PID) {
if (PID == 0) {
    PID = document.getElementById("hidPID").innerHTML;
    console.log(PID + "hid");
}

var comments_html = "";
var ct = 0;
$.ajax({
    type: "GET",
    //url: "http://localhost:3192/Home/ListComments",
    url: "http://washingapp.apphb.com/Home/ListComments",

    data: "PID=" + PID,
    dataType: "jsonp",
    success: function(json) {
        $.each(json.cmts, function(i, result) {
            comments_html = comments_html + "<div class=\"ui-grid-a\">" +
 "<div class=\"ui-block-a\"><div class=\"ui-bar ui-bar-a\">" + result.datetime + "</div></div>" +
 "<div class=\"ui-block-b\"><div class=\"ui-bar ui-bar-a\">" + result.username + "</div></div></div>" +
 "<div class=\"ui-bar ui-bar-a\">" + result.comment + "</div>" +
 "<div class=\"ui-bar ui-bar-b\" style=\"height:1px\"></div>";
            ct = json.ct;
        });
    },
    error: function(xhr, error) {
        // console.debug(xhr); console.debug(error);

    },
    complete: function(xhr, status) {
        if (ct == 0) {
            $("#place_comments").html("No comments");
        } else {
            $("#place_comments").html(comments_html);
            $("#comments_ct").html("Comments (" + ct + ")" + "<div style=\"display:none\" id=\"hidPID\">" + PID + "</div>");
            $("#addcomm").show();
        }
        $("#map_msg").html("Comments loaded.");

    }
});

}

function SaveComment() {

    var PID = document.getElementById("hidPID").innerHTML;
    var comment = document.getElementById("addcommentid").value;
    console.log(PID + "hid");
  
    var comments_html = "";
    var ct = 0;
    $.ajax({
        type: "POST",
        //url: "http://localhost:3192/Home/SaveComment",
        url: "http://washingapp.apphb.com/Home/SaveComment",
        data: "PID=" + PID + "&comment=" + comment + "&userID=11",
        dataType: "jsonp",
        success: function(json) {
            $.each(json.cmts, function(i, result) {
                comments_html = comments_html + "<div class=\"ui-grid-a\">" +
 "<div class=\"ui-block-a\"><div class=\"ui-bar ui-bar-a\">" + result.datetime + "</div></div>" +
 "<div class=\"ui-block-b\"><div class=\"ui-bar ui-bar-a\">" + result.username + "</div></div></div>" +
 "<div class=\"ui-bar ui-bar-a\">" + result.comment + "</div>" +
 "<div class=\"ui-bar ui-bar-b\" style=\"height:5px\"></div>";
                ct = json.ct;
            });
        },
        error: function(xhr, error) {
            // console.debug(xhr); console.debug(error);

        },
        complete: function(xhr, status) {
        document.getElementById("addcommentid").value = "";
            if (ct == 0) {
                $("#place_comments").html("No comments");
            } else {
                $("#place_comments").html(comments_html);
                $("#comments_ct").html("Comments (" + ct + ")" + "<div style=\"display:none\" id=\"hidPID\">" + PID + "</div>");
                $("#addcomm").show();
            }
            $("#map_msg").html("Comment saved.");

        }
    });

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
        $("#map_msg").append("from store: lat " + lat + "long " + longval);

    });

    var loc = lat + "," + longval;
   
    return loc;

}

var markers = [];

function removeMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers.length=0;

      }


function GoogleMap(lat,lng) {
    $("#map_overlay").fadeIn();
    //alert(lat + lng);
    this.initialize = function() {

        var map = showMap();
        $('#place_name').html("&nbsp");
        $('#place_name').html("&nbsp");
        $('#place_comments').html("&nbsp");
        $('#comments_ct').html("&nbsp");
        $("#addcomm").hide();
    }
    var showMap = function() {
    ;
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)
        var bounds;

        google.maps.event.addListener(map, 'bounds_changed', (function() {
            bounds = map.getBounds();
            $("#map_msg").html("Map moved ...");
            var timer;
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {

                    bounds = map.getBounds();
                    $("#map_msg").html("Downloading sites ...");
                    setMarkers(map, bounds);
                }, 2000);
            }
        } ()));


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

function GoogleMap_move(lat, lng, PID) {
    $("#set_map_overlaym").fadeIn();
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
        var map = new google.maps.Map(document.getElementById("set_map_canvasm"), mapOptions)
        var bounds;
        google.maps.event.addListener(map, 'bounds_changed', function() {
            bounds = map.getBounds();
        });
        setMarker_move(map, bounds, lat, lng);

        var markerp = new google.maps.Marker({ 'position': siteLatLng, draggable: true, map: map });
        $("#set_map_overlaym").fadeOut();

        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

        return map;
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
            checkStore(30);

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
var timerc;
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
    document.getElementById("usernameid").value = "myname";
    map.initialize();
}

function startmap_move(lat, lng, PID) {
    clearTimeout(timerc);
    $("#MPID").html(PID);
    $("#movePlaceName").html("name here");
    console.log(name);
    var map = new GoogleMap_move(lat, lng, PID);
    map.initialize();
}

function showmap() {
    timera = setInterval(function() { startmap() }, 1000);
}

function add_site_map() {
    timerb = setInterval(function() { startmap_set() }, 1000);
}

function move_site_map(lat, lng, PID) {
    //alert(site_name);
    timerc = setInterval(function() { startmap_move(lat, lng, PID) }, 1000);
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