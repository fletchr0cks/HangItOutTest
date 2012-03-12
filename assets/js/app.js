// 
//  --- our app behavior logic ---
//


    function checkConnection() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        alert('Connection type: ' + states[networkState] + networkState);
        
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    }
    
    // onSuccess: Display the current acceleration
    function onSuccess(acceleration) {
        var element = document.getElementById('accelerometer');
        element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                            'Acceleration Y: ' + acceleration.y + '<br />' +
                            'Acceleration Z: ' + acceleration.z + '<br />' +
                            'Timestamp: '      + acceleration.timestamp + '<br />';
                            
                            }


run(function () {
    // immediately invoked on first run
    var init = (function () {
    var networkState = navigator.network.connection.type;
    alert(networkState);
     navigator.geolocation.getCurrentPosition(function (position) {
    var loctest = "" + position.coords.latitude + "," + position.coords.longitude;
    alert(loctest);
        if (networkState == "undefined") {
            //alert("No internet connection - we won't be able to show you any maps");
            $('#data_result').html("No network connection. In demo mode");
        $.ajax({
        type: "GET",
		url: "json.txt",
		dataType: "text/plain",
		success: function(parsed_json) {
            var json = eval('(' + parsed_json + ')');
			var location = json['location']['city'];
            //alert(location + loc);
            $('#loc_result').html("Location (demo) is: " + location);
    
           
             $.each(json.hourly_forecast, function (i, zone) {
            
            var sky = parseInt(zone.sky);
            
            var userhtml = "<table style=\"width: 100%\"><tr><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.FCTTIME.hour + "</div></td><td style\"width: 20%\"><div class=\"normal_small\">" + zone.temp.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.wspd.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.sky + "</div></td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.qpf.metric + "</div></td></tr></table>";

            
            $('#results2').append(userhtml);
            $('#chart').html("<img src=\"assets/img/chart.png\" />");
            
           
            

	});
            }
            
            });
            
            
            
        } else {
            //alert("We can reach Google! Trying location");
            $('#data_result').html("Connected to Weather Underground API.");
            navigator.geolocation.getCurrentPosition(function (position) {
                var loc = "" + position.coords.latitude + "," + position.coords.longitude;
                                
                 $.ajax({
		url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/56.058168,-2.719811.json",
		dataType: "jsonp",
		success: function(parsed_json) {
			var location = parsed_json['location']['city'];
            //alert(location + loc);
            $('#loc_result').html("Location is " + loc + ": " + location);
    
           
             $.each(parsed_json.hourly_forecast, function (i, zone) {
            
            var sky = parseInt(zone.sky);
            
            var userhtml = "<table style=\"width: 100%\"><tr><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.FCTTIME.hour + "</div></td><td style\"width: 20%\"><div class=\"normal_small\">" + zone.temp.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.wspd.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.sky + "</div></td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.qpf.metric + "</div></td></tr></table>";

            
            $('#results2').append(userhtml);
          
            
            $('#latest').html("<div class=\"normal_small\">" + zone.FCTTIME.hour + "</div>");
            

	});
      $('#chart').html("<img src=\"http://chart.apis.google.com/chart?chxt=y&chs=300x150&cht=gm&chl=Do%20it&chtt=Washing-O-Meter%20Says:&chts=DE613F,20,c&chco=FF9900&chd=t:70\" />");
    
    
            }
            
            });
                

            }, function () {
                $('#loc_result').html("Location not available. Using North Berwick.");
            });
            
            
               

        }
    })();
    
    // a little inline controller
    when('#welcome');
    when('#settings', function() {
		// load settings from store and make sure we persist radio buttons.
		store.get('config', function(saved) {
			if (saved) {
				if (saved.map) {
					x$('input[value=' + saved.map + ']').attr('checked',true);
				}
				if (saved.zoom) {
					x$('input[name=zoom][value="' + saved.zoom + '"]').attr('checked',true);
				}
			}
		});
	});
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            }, function () {
                x$('img#static_map').attr('src', "assets/img/gpsfailed.png");
            });
        });
    });
    when('#save', function () {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
});
