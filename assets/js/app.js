// 
//  --- our app behavior logic ---
//


    function checkConnection() {
    alert("con check");
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
        
        startProg();
    }
    
    // onSuccess: Display the current acceleration
    //Get the current Acceleration data if Successful
        function onSuccess(acceleration){
            alert('Acceleration X: ' + acceleration.x + '\n' +
              'Acceleration Y: ' + acceleration.y + '\n' +
              'Acceleration Z: ' + acceleration.z + '\n' +
              'Timestamp: '      + acceleration.timestamp + '\n');
        }
 
        // alert if there is an error
        function onError(){
            alert("Error");
        }
        
var theData = new Lawnchair('settings');

function doSave() {
	// Retrieve the values from the form elements
	theUsername = document.getElementById('Username').value;
	thePassword = document.getElementById('Password').value;
	theAge = document.getElementById('Age').value;
	var theSettings = {key:'settings', Username:theUsername, Password:thePassword, Age:theAge};// Construct an object with them
	theData.save(theSettings);// Send them to the data store
	alert("Saved!");
}

function doRecall() {// Call the get function, giving it the key we used to save with and a return function to populate the form with the values of the object
	theData.get('settings', 
		function(theSettings) { // Test we actually got a settings object
			if (theSettings) { // We did, so put the values in to the form fields 
				document.getElementById('Username').value = theSettings.Username;
				document.getElementById('Password').value = theSettings.Password;
				document.getElementById('Age').value = theSettings.Age;
			} else {
				alert("No settings found!");
			}
		} // function(theSettings)
	);
	alert("Recalled!");
}

function doDelete() { // Tell the data store to delete the record with a key of 'settings'
	theData.remove('settings');
	alert("Deleted!");
}

function doNuke() { // Delete all records
	theData.nuke();
	alert("Nuked!");
}


function startProg(){
            //alert("We can reach Google! Trying location");
            $('#data_result').html("Connected to Weather Underground API.");
            navigator.geolocation.getCurrentPosition(function (position) {
                var loc = "" + position.coords.latitude + "," + position.coords.longitude;
                //cutoff
                 $.ajax({
		url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/56.058168,-2.719811.json",
		dataType: "jsonp",
		success: function(parsed_json) {
			var location = parsed_json['location']['city'];
            //alert(location + loc);
            $('#loc_result').html("Location is " + loc + ": " + location);
      
                var posy = 14;
                var posyt = 25;
                var example = document.getElementById('canvhere');
                var ctx2d = example.getContext('2d');
                var ni = 1;
           
             $.each(parsed_json.hourly_forecast, function (i, zone) {
            
          
                    var ws = (parseInt(zone.wspd.metric) * 3) + 5;
                    var temp = (parseInt(zone.temp.metric) * 4) + 5;
                    var hour = zone.FCTTIME.civil;
                    var sky = parseInt(zone.sky);
                    var rain = parseInt(zone.qpf.metric);
                    var hour_bg_bk = "9F9F9F";
                    var wind_bg = "51D251";
                    var temp_bg = "FFB336";
                    var wind_txt = "FFF";
                    var temp_txt = "FFF";
                    var cond = zone.condition;
                    var humid = parseInt(zone.humidity);
                    var score = ((parseInt(zone.wspd.metric) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2;
                    var yday = parseInt(zone.FCTTIME.yday);
                    var hour_padded = parseInt(zone.FCTTIME.hour);
                    var civil = parseInt(zone.FCTTIME.civil);

                    
                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText(hour, 5, posyt);



                        posy = posy + 15;
                        posyt = posyt + 15;
          
	});
    
      $('#chart').html("<img src=\"http://chart.apis.google.com/chart?chxt=y&chs=300x150&cht=gm&chl=Do%20it&chtt=Washing-O-Meter%20Says:&chts=DE613F,20,c&chco=FF9900&chd=t:70\" />");
    
    
   
        }
            
            });
                

            }, function () {
                $('#loc_result').html("Location not available. Using North Berwick.");
            });
            
            
  
          // a little inline controller
    when('#welcome');
    when('#settings', function() {
    doRecall();
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
    doSave();
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
}