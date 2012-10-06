/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var deviceInfo = function() {
    //document.getElementById("platform").innerHTML = device.platform;
    //document.getElementById("version").innerHTML = device.version;
    try {
        document.getElementById("uuid").innerHTML = device.uuid;
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
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
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

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
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

var timer1;

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    //var network = check_network();
   
        document.addEventListener("deviceready", start, false);
       
    $('#calc').html("Calculating ...");
    
    //timer1 = setTimeout(start, 500);
 //   var store = new Lawnchair({
 //       adapter: "dom",
 //       name: "data_store"
 //   }, function(store) {
 //   });
    //store.nuke();

}

function initsocial() {
        document.addEventListener("deviceready", startmap, false);
}

function startmap() {
        alert("one");
    $('#map_canvas').gmap().bind('init', function(event, map) {
        $.ajax({
            type: "GET",
            //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            url: "http://washingapp.apphb.com/Home/GetAllUsersNew",
            dataType: "jsonp",
            success: function(json) {
                var jsontext = JSON.stringify(json);
                alert(jsontext);
                $.each(json, function(i, marker) {
                    alert(marker);
                    $('#map_canvas').gmap('addMarker', {
                        'position': new google.maps.LatLng(marker.latitude, marker.longitude),
                        'bounds': true

                    }).click(function() {
                        $('#map_canvas').gmap('openInfoWindow', { 'content': '<div class=strong_blue>' + marker.title + '</div><div class=strong_blue_sml>' + marker.content + '</div><div class=strong_blue_sml>' + marker.timestamp + '</div>' }, this);
                    });
                });
            },
            error: function(xhr, error) {
                //.debug(xhr); console.debug(error);

            },
            complete: function(xhr, status) {

            }
        });
    });
}

var start = function() {
    //function start() {
    alert("ready");
   startmap();
    var network = check_network();
    //alert(network);
    $('#connection').html(network);
    if (network == "NONE" || network == null) {
        checkCache(0, network);
    } else {
        checkCache(1, network);
    }
};

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
            alert(p.coords.latitude + " " + p.coords.longitude);
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