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

        function canvcheck(canvas, context) {
            

        }
        
        
function checkCacheDate() {
	
	var now = new Date();
	var hour_now = now.getHours();
	hour_now = hour_now + 1
	alert(hour_now);
	
var theData = new Lawnchair('data');
var hoursaved;
var datesaved;
var hourdiff = 0;

theData.get('data', 
		function(theJsonData) { // Test we actually got a settings object
			if (theJsonData) { // We did, so put the values in to the form fields 
				hoursaved = theJsonData.hoursaved;
				datesaved = theJsonData.datesaved;
				hourdiff = hour_now - hoursaved;
				alert("diff" + hourdiff);
				
				if (hourdiff >= 2) {
				
					getData();
				
				} else {
				
					getCache();
				}
				
			} else {
				alert("No settings found!");
			}
			
		} // function(theSettings)		
			
	);
	

	
}
	
 function getCache() {
 
 var theData = new Lawnchair('data');
 //var jsondata;
 
 theData.get('data', 
 		function(theJsonData) { // Test we actually got a settings object
 			if (theJsonData) { // We did, so put the values in to the form fields 
 				var jsondata = theJsonData.json;
 				
 				alert(jsondata);
 				    var cutoff = parseInt("16");
				
                				var parsed_json = eval('(' + jsondata + ')');
				           
				                var location = parsed_json['location']['city'];
				            
				                var theDatas = new Lawnchair('data');
						var timenow = new Date();
						var hour_now  = timenow.getHours();
						var today = timenow.getDate();
						
						var country = parsed_json['location']['country'];
					        //alert("saved= " + json_data);
				                var posy = 14;
				                var posyt = 25;
				                var example = document.getElementById('canvhere');
				                var ctx2d = example.getContext('2d');
				                var ni = 1;
				
				                $.each(parsed_json.hourly_forecast, function(i, zone) {
				
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
				
				                    if (hour_padded > cutoff || hour_padded < 8) {
				
				
				                       
				                        if (ni == 1) {
				
				                            ctx2d.fillStyle = hour_bg_bk;
				                            ctx2d.fillRect(2, posy, 50, 14);
				                            ctx2d.font = '9px Arial';
				                            ctx2d.fillStyle = '#FFF';
				                            ctx2d.fillText("night", 5, posyt);
				                            posy = posy + 15;
				                            posyt = posyt + 15;
				                            ni = ni + 1;
				
				                        }
				
				                    } else {
				
				                        ctx2d.restore();
				
				                        // if (hour_padded > cutoff) {
				
				                        // } else {
				
				                        //if (hour_padded < 5) {
				
				                        //} else {
				
				                        //discount sky if it is dark!
				                        if (rain >= 1 && rain < 5) {
				                            wind_bg = "67BC67";
				                            temp_bg = "D7AA5F";
				
				                        } else if (rain > 4) {
				                            wind_bg = "7DA77D";
				                            temp_bg = "B8A27D";
				
				                        } else {
				                            if (sky < 25) {
				                                hour_bg_bk = "437AFA";
				                            }
				
				                            if (sky < 50 && sky > 26) {
				                                hour_bg_bk = "5682E7";
				                            }
				
				                            if (sky < 75 && sky > 51) {
				                                hour_bg_bk = "6A8AD4";
				                            }
				
				                            if (sky < 101 && sky > 76) {
				                                hour_bg_bk = "8695B7";
				                            }
				
				                        }
				
				                        var userhtml = "<table style=\"width: 100%\"><tr><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.FCTTIME.hour + "</div></td><td style\"width: 20%\"><div class=\"normal_small\">" + zone.temp.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.wspd.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.sky + "</div></td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.qpf.metric + "</div></td></tr></table>";
				
				                        ctx2d.fillStyle = hour_bg_bk;
				                        ctx2d.fillRect(2, posy, 50, 14);
				                        ctx2d.font = '9px Arial';
				                        ctx2d.fillStyle = '#FFF';
				                        ctx2d.fillText(hour, 5, posyt);
				
				
				                        ctx2d.fillStyle = wind_bg;
				                        ctx2d.fillRect(52, posy, ws, 14);
				                        ctx2d.font = '9px Arial';
				                        ctx2d.fillStyle = wind_txt;
				                        ctx2d.fillText(zone.wspd.metric, 40 + ws - 2, posyt);
				
				                        ctx2d.fillStyle = temp_bg;
				                        ctx2d.fillRect(52 + ws, posy, temp, 14);
				                        ctx2d.font = '9px Arial';
				                        ctx2d.fillStyle = temp_txt;
				                        ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);
				
				                        ctx2d.fillStyle = "FFF";
				                        ctx2d.fillRect(52 + ws + temp, posy, 20, 14);
				                        ctx2d.font = '9px Arial';
				                        ctx2d.fillStyle = "#868686";
				                        ctx2d.fillText(cond + (100 - humid) + " " + hour_padded, 52 + ws + temp + 3, posyt);
				
				                        ctx2d.fillStyle = temp_bg;
				                        ctx2d.fillRect(350, posy, 20, 14);
				                        ctx2d.font = '9px Arial';
				                        ctx2d.fillStyle = temp_txt;
				                        ctx2d.fillText(score, 352, posyt);
				
				                        ctx2d.save();
				
				                        ni = 1;
				
				                        //$('#results2').append(userhtml);
				
				                        //$('#latest').html("<div class=\"normal_small\">" + zone.FCTTIME.hour + "</div>");
				
				
				                    }
				
				                    if (ni == 1) {
				
				                        posy = posy + 15;
				                        posyt = posyt + 15;
				
				                    }
				
				
				                });
				                
				                
				
				           // }
				            
				            
				
        //});
 				
 			} else {
 				alert("No settings found!");
 			}
 			
 		} // function(theSettings)		
 			
	);
        
        

        
        }

 function getData() {
        
        
    var cutoff = parseInt("16");

        $.ajax({
            type: "GET",
            url: "json.txt",
            dataType: "text/plain",
            success: function(json) {
                var parsed_json = eval('(' + json + ')');
                var location = parsed_json['location']['city'];
                var json_data = json.toString();
                var theDatas = new Lawnchair('data');
		var timenow = new Date();
		var hour_now  = timenow.getHours();
		var today = timenow.getDate();
		
		var country = parsed_json['location']['country'];
		var theSettings = {key:'data', json:json_data, hoursaved:hour_now, datesaved:today};// Construct an object with them
	        theDatas.save(theSettings);
	        alert("saved= " + hour_now);
                var posy = 14;
                var posyt = 25;
                var example = document.getElementById('canvhere');
                var ctx2d = example.getContext('2d');
                var ni = 1;
                //ctx2d.fillStyle = "rgb(255,255,255)";
                //ctx2d.fillRect(0, 0, 30, 14);
                //ctx2d.font = '10px Arial';
                //ctx2d.fillStyle = '#868686';
                //ctx2d.fillText("Hour", 2, 10);
                //       ctx2d.fillStyle = "rgba(64,128,77,0.5)";
                //            ctx2d.fillRect(0,0,50,14);



                $.each(parsed_json.hourly_forecast, function(i, zone) {

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

                    if (hour_padded > cutoff || hour_padded < 8) {


                       
                        if (ni == 1) {

                            ctx2d.fillStyle = hour_bg_bk;
                            ctx2d.fillRect(2, posy, 50, 14);
                            ctx2d.font = '9px Arial';
                            ctx2d.fillStyle = '#FFF';
                            ctx2d.fillText("night", 5, posyt);
                            posy = posy + 15;
                            posyt = posyt + 15;
                            ni = ni + 1;

                        }

                    } else {

                        ctx2d.restore();

                        // if (hour_padded > cutoff) {

                        // } else {

                        //if (hour_padded < 5) {

                        //} else {

                        //discount sky if it is dark!
                        if (rain >= 1 && rain < 5) {
                            wind_bg = "67BC67";
                            temp_bg = "D7AA5F";

                        } else if (rain > 4) {
                            wind_bg = "7DA77D";
                            temp_bg = "B8A27D";

                        } else {
                            if (sky < 25) {
                                hour_bg_bk = "437AFA";
                            }

                            if (sky < 50 && sky > 26) {
                                hour_bg_bk = "5682E7";
                            }

                            if (sky < 75 && sky > 51) {
                                hour_bg_bk = "6A8AD4";
                            }

                            if (sky < 101 && sky > 76) {
                                hour_bg_bk = "8695B7";
                            }

                        }

                        var userhtml = "<table style=\"width: 100%\"><tr><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.FCTTIME.hour + "</div></td><td style\"width: 20%\"><div class=\"normal_small\">" + zone.temp.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.wspd.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.sky + "</div></td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.qpf.metric + "</div></td></tr></table>";

                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText(hour, 5, posyt);


                        ctx2d.fillStyle = wind_bg;
                        ctx2d.fillRect(52, posy, ws, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = wind_txt;
                        ctx2d.fillText(zone.wspd.metric, 40 + ws - 2, posyt);

                        ctx2d.fillStyle = temp_bg;
                        ctx2d.fillRect(52 + ws, posy, temp, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);

                        ctx2d.fillStyle = "FFF";
                        ctx2d.fillRect(52 + ws + temp, posy, 20, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = "#868686";
                        ctx2d.fillText(cond + (100 - humid) + " " + hour_padded, 52 + ws + temp + 3, posyt);

                        ctx2d.fillStyle = temp_bg;
                        ctx2d.fillRect(350, posy, 20, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        ctx2d.fillText(score, 352, posyt);

                        ctx2d.save();

                        ni = 1;

                        //$('#results2').append(userhtml);

                        //$('#latest').html("<div class=\"normal_small\">" + zone.FCTTIME.hour + "</div>");


                    }

                    if (ni == 1) {

                        posy = posy + 15;
                        posyt = posyt + 15;

                    }


                });
                
                

            }
            
            

        });
        
        }


function startProg(){
            //alert("We can reach Google! Trying location");
    $('#data_result').html("Connected to Weather Underground API.");
    var cutoff = parseInt("16");
    navigator.geolocation.getCurrentPosition(function(position) {
        $.ajax({
            url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/56.058168,-2.719811.json",
            dataType: "jsonp",
            success: function(json) {
                var parsed_json = eval('(' + json + ')');

                var location = parsed_json['location']['city'];
                //alert(location + loc);
                $('#loc_result').html("Location is " + location);
                var posy = 14;
                var posyt = 25;
                var example = document.getElementById('canvhere');
                var ctx2d = example.getContext('2d');



                $.each(parsed_json.hourly_forecast, function(i, zone) {


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

                    if (rain >= 1 && rain < 5) {
                        wind_bg = "67BC67";
                        temp_bg = "D7AA5F";

                    } else if (rain > 4) {
                        wind_bg = "7DA77D";
                        temp_bg = "B8A27D";

                    } else {
                        if (sky < 25) {
                            hour_bg_bk = "437AFA";
                        }

                        if (sky < 50 && sky > 26) {
                            hour_bg_bk = "5682E7";
                        }

                        if (sky < 75 && sky > 51) {
                            hour_bg_bk = "6A8AD4";
                        }

                        if (sky < 101 && sky > 76) {
                            hour_bg_bk = "8695B7";
                        }

                    }

                    var userhtml = "<table style=\"width: 100%\"><tr><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.FCTTIME.hour + "</div></td><td style\"width: 20%\"><div class=\"normal_small\">" + zone.temp.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.wspd.metric + "</td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.sky + "</div></td><td style=\"width: 20%\"><div class=\"normal_small\">" + zone.qpf.metric + "</div></td></tr></table>";

                    ctx2d.fillStyle = hour_bg_bk;
                    ctx2d.fillRect(2, posy, 50, 14);
                    ctx2d.font = '9px Arial';
                    ctx2d.fillStyle = '#FFF';
                    ctx2d.fillText(hour, 5, posyt);


                    ctx2d.fillStyle = wind_bg;
                    ctx2d.fillRect(52, posy, ws, 14);
                    ctx2d.font = '9px Arial';
                    ctx2d.fillStyle = wind_txt;
                    ctx2d.fillText(zone.wspd.metric, 40 + ws - 2, posyt);

                    ctx2d.fillStyle = temp_bg;
                    ctx2d.fillRect(52 + ws, posy, temp, 14);
                    ctx2d.font = '9px Arial';
                    ctx2d.fillStyle = temp_txt;
                    ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);

                    ctx2d.fillStyle = temp_bg;
                    ctx2d.fillRect(400, posy, 20, 14);
                    ctx2d.font = '9px Arial';
                    ctx2d.fillStyle = temp_txt;
                    ctx2d.fillText(zone.temp.metric, 252, posyt);



                    //$('#results2').append(userhtml);

                    //$('#latest').html("<div class=\"normal_small\">" + zone.FCTTIME.hour + "</div>");
                    posy = posy + 15;
                    posyt = posyt + 15;

                });



            }

        });


    }, function() {
        $('#loc_result').html("Location not available. Using North Berwick.");
        
        checkCacheDate();
        
        
        
       
    });
            
            
  
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
}