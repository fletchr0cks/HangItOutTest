// 
//  --- our app behavior logic ---
//


    function checkConnection() {
   // alert("con check");
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        //alert('Connection type: ' + states[networkState]);
        
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
        doDelete();
        startProg();
    }
    
    // onSuccess: Display the current acceleration
    //Get the current Acceleration data if Successful
        function onSuccess(acceleration){
           // alert('Acceleration X: ' + acceleration.x + '\n' +
           //   'Acceleration Y: ' + acceleration.y + '\n' +
           //   'Acceleration Z: ' + acceleration.z + '\n' +
           //   'Timestamp: '      + acceleration.timestamp + '\n');
        }
 
        // alert if there is an error
        function onError(){
            //alert("Error");
        }
        
var theData = new Lawnchair('settings');

function doSave() {
	// Retrieve the values from the form elements
	theUsername = document.getElementById('Username').value;
	thePassword = document.getElementById('Password').value;
	theAge = document.getElementById('Age').value;
    theComment = document.getElementById('Comment').value;
    if (theComment.length > 1) {
     $.ajax({
                    type: "POST",
                    url: "http://washingapp.apphb.com/Home/save",
                    data: "lat=" + theUsername + "&lval=" + thePassword + "&city=" + theAge + "&country=uk&comment=" + theComment,
                    dataType: "text/plain",
                    success: function(data) {
                    alert("posted" + theUsername + ":" + thePassword);
                    
                    }
                 
                 });
     alert("Sent comment"); 
     }           
	var theSettings = {key:'settings', Username:theUsername, Password:thePassword, Age:theAge};// Construct an object with them
	theData.save(theSettings);// Send them to the data store
      

	
}

function doRecall() {// Call the get function, giving it the key we used to save with and a return function to populate the form with the values of the object
	theData.get('settings', 
		function(theSettings) { // Test we actually got a settings object
			if (theSettings) { // We did, so put the values in to the form fields 
				document.getElementById('Username').value = theSettings.Username;
				document.getElementById('Password').value = theSettings.Password;
				document.getElementById('Age').value = theSettings.Age;
                //document.getElementById('json').value = theSettings.jsonData;
                //document.getElementById('Comment').value = theSettings.Comment;
                //alert("recalled: " + theSettings.jsonData.toString());
			} else {
				alert("No settings found!");
			}
		} // function(theSettings)
	);
	//alert("Recalled!");
}

function doDelete() { // Tell the data store to delete the record with a key of 'settings'
	theData.remove('settings');
	//alert("Deleted!");
}

function doNuke() { // Delete all records
	theData.nuke();
	alert("Nuked!");
}

function PostDetails(){


}



function startProg(){
            //alert("We can reach Google! Trying location");
            //$('#data_result').html("Connected to Weather Underground API.");
            navigator.geolocation.getCurrentPosition(function (position) {
            var canvas = document.getElementById('canvasElement'); 
var context = canvas.getContext('2d'); 
var canvasWidth = "300"; 
var canvasHeight = "50"; 
var x = 10; 
var y = 10; 
context.font = '16px Arial';

                    

function moveBox() { 

// Clears out our canvas to redraw 
//context.clearRect(0,0, canvasWidth, canvasHeight); 
// Draws our box 
context.fillStyle = '#DE613F';
context.fillRect(x, y, 20, 20); 
var dt = 8;
// Increases our x variable by 1 each time this function is called, moving our box along the horizontal axis 
x++; 
// Calls our moveBox() every 33 milliseconds, causing the whole process to loop 
setTimeout(moveBox, 10); 
if (x == 300) {

var theDatasave = new Lawnchair('settings');
theDatasave.get('settings', 
		function(theSettings) { // Test we actually got a settings object
			if (theSettings) { // We did, so put the values in to the form fields 
                dt = theSettings.DT;
                //alert(dt);
			} else {
				alert("No settings found!");
			}
		} // function(theSettings)
	);
context.fillStyle = '#FFF';
//context.fillText("Drying time: " + dt + " hours", 15, 26);
//context.clearRect(0,0, 300, 50);
}
} 

// Call the function once to call to start things off 
 
                  var done_dt = 0;
                var loc = position.coords.latitude + "," + position.coords.longitude;
                var lat = position.coords.latitude.toFixed(6);
                var longval = position.coords.longitude.toFixed(6);
                var testlat = "2777233";
               var cutoff = parseInt("17");
                var theDataSet = new Lawnchair('settings');
                //var theSettings = {key:'settings', Username:testlat, Password:longval.toString()};// Construct an object with them
	//theDataSet.save(theSettings);
                             //  alert("saved: "+ testlat + lat.toString() + longval.toString());
                 $.ajax({
		url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
		dataType: "jsonp",
		success: function(parsed_json) {
			var location = parsed_json['location']['city'];
            //alert(location + loc);
            $('#loc_result').html("Location is " + location + " (" + loc + ")");
            	var city = parsed_json['location']['city'];
            	var theDatas = new Lawnchair('settings');
		var jsondata = parsed_json.toString();
		//JSON.stringify
		//var jsonstr = JSON.stringify(sourceObj);
        //alert(jsondata);
            var country = parsed_json['location']['country'];
      var theSettings = {key:'settings', Age:jsondata, Username:lat, Password:longval};// Construct an object with them
	theDatas.save(theSettings);
                var posy = 14;
                var posyt = 25;
                var example = document.getElementById('canvhere');
                var ctx2d = example.getContext('2d');
                var ni = 1;
              
                        
                 hour_bg_bk = "8695B7";                               
                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, 0, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText("Hour", 5, 10);
                
                 ctx2d.fillStyle = "51D251";
                 ctx2d.fillRect(54, 0, 80, 14);
                 ctx2d.font = '9px Arial';
                 ctx2d.fillStyle = 'FFF';
                 ctx2d.fillText("Wind speed (mph)", 58, 10);
                 
                 
                        ctx2d.fillStyle = "FFB336";
                        ctx2d.fillRect(136, 0, 48, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = 'FFF';
                        ctx2d.fillText("Temp (c)", 140, 10);
                        
                        
                        ctx2d.fillStyle = "FFB336";
                        ctx2d.fillRect(316, 0, 52, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = 'FFF';
                        ctx2d.fillText("Drying time", 318, 10);

                     var dt = parseInt(0);
                     var dt_ct = parseInt(0);
                    var total_score = parseInt(0);
               

                $.each(parsed_json.hourly_forecast, function(i, zone) {

                    var ws = (parseInt(zone.wspd.english) * 6) + 10;
                    var temp = (parseInt(zone.temp.metric) * 3) + 10;
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
                    var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);
                    
                   
                    var yday = parseInt(zone.FCTTIME.yday);
                    var hour_padded = parseInt(zone.FCTTIME.hour);
                    var civil = parseInt(zone.FCTTIME.civil);

                    if (hour_padded > cutoff || hour_padded < 8) {

                        dt_ct = dt_ct + 1;
                       
                        if (ni == 1) {
                        
                        
                     
                        hour_bg_bk = "8695B7";                               
                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText(hour, 5, posyt);


                        ctx2d.fillStyle = "7DA77D";
                        ctx2d.fillRect(52, posy, ws, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = wind_txt;
                        ctx2d.fillText(zone.wspd.english, 40 + ws, posyt);

                        ctx2d.fillStyle = "B8A27D";
                        ctx2d.fillRect(52 + ws, posy, temp, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);

                        ctx2d.fillStyle = "FFF";
                        ctx2d.fillRect(52 + ws + temp, posy, 20, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = "#868686";
                        ctx2d.fillText(cond, 52 + ws + temp + 3, posyt);
                        
                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(318, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText("Past cutoff", 320, posyt);


                          posy = posy + 15;
                        posyt = posyt + 15;
                        ni = ni + 1;

                        } else {
                        
                        hour_bg_bk = "8695B7";                               
                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText(hour, 5, posyt);


                        ctx2d.fillStyle = "7DA77D";
                        ctx2d.fillRect(52, posy, ws, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = wind_txt;
                        ctx2d.fillText(zone.wspd.english, 42 + ws, posyt);

                        ctx2d.fillStyle = "B8A27D";
                        ctx2d.fillRect(52 + ws, posy, temp, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);

                        ctx2d.fillStyle = "FFF";
                        ctx2d.fillRect(52 + ws + temp, posy, 20, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = "#868686";
                        ctx2d.fillText(cond, 52 + ws + temp + 3, posyt);
                        posy = posy + 15;
                        posyt = posyt + 15;
                        dt_ct = 0;

                        }

                    } else {

                        ctx2d.restore();

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

                        var userhtml = " ";

                        ctx2d.fillStyle = hour_bg_bk;
                        ctx2d.fillRect(2, posy, 50, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = '#FFF';
                        ctx2d.fillText(hour, 5, posyt);


                        ctx2d.fillStyle = wind_bg;
                        ctx2d.fillRect(52, posy, ws, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = wind_txt;
                        ctx2d.fillText(zone.wspd.metric, 40 + ws, posyt);

                        ctx2d.fillStyle = temp_bg;
                        ctx2d.fillRect(52 + ws, posy, temp, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        ctx2d.fillText(zone.temp.metric, 40 + ws + (temp - 2), posyt);

                        
                        
                        total_score = total_score + score;
                        
                        dt_ct = dt_ct + 1;
                        
                        ctx2d.fillStyle = "FFF";
                        ctx2d.fillRect(52 + ws + temp, posy, 20, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = "#868686";
                        ctx2d.fillText(cond, 52 + ws + temp + 3, posyt);
                        
                        ctx2d.fillStyle = temp_bg;
                        ctx2d.fillRect(350, posy, 18, 14);
                        ctx2d.font = '9px Arial';
                        ctx2d.fillStyle = temp_txt;
                        
                        
                        if (total_score > 120) {
                        var res = dt_ct;
                        if (done_dt == 0) {
                        var theDatas = new Lawnchair('settings');
                        var theSettings = {key:'settings', DT:res};// Construct an object with them
                        theDatas.save(theSettings);
                        $('#calc').html("Drying time: " + res + " hours");
                        //alert("dt = " + res);
                        }
                        done_dt = 1;
                        //ctx2d.fillText(dt_ct, 352, posyt - (dt_ct * 15) + 15);
                        while (dt_ct > 0) {
                        //alert(dt_ct);
                       ctx2d.fillText(res, 352, posyt - (dt_ct * 15) + 15);
                        dt_ct = dt_ct - 1;
                        }
                        
                        
                        
                        total_score = 0;
                        }

                       
                        

                        ctx2d.save();

                        ni = 1;

                      
                    }

                    if (ni == 1) {

                        posy = posy + 15;
                        posyt = posyt + 15;

                    }          
                    
               

	});
    
    
                 
      
   
        }
            
            });
            
            moveBox();
                

            }, function () {
                $('#loc_result').html("Location not available. Using North Berwick.");
            });
            
            
  
          // a little inline controller
    when('#welcome');
    when('#settings', function() {
    doRecall();
		// load settings from store and make sure we persist radio buttons.

	});
    when('#map', function () {
        
    });
    when('#save', function () {
    doSave();
        
        display('#welcome');
    });
}