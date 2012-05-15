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
        
        //navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
        
        //checkCacheDate();
    }
    
    // onSuccess: Display the current acceleration
    //Get the current Acceleration data if Successful
    
        
        
function checkCacheDate() {
alert("start");
// Open local DB connection

var lawnchair = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
});
//lawnchair.save({key:'my_data_key', lastSync: currentTime, dataList: someData});

//var lawnchair = new Lawnchair('data');

// Getting some data out of the lawnchair database
lawnchair.get('data', function(obj) {
    if (obj !== null) {
    var hsaved = obj.hoursaved;
    alert("have data " + hsaved);
    getCache('olddata');
        
    } else {
    alert("no data" + obj);
    getData();
    }
    
});

// Saving to the database
//lawnchair.save({key:'my_data_key', lastSync: currentTime, dataList: someData});         
    
}

function resultsClick() {
//alert("show results");
//getCache('olddata');
$('#map').show();

}

function tryData() {
alert("trying");
getData();
}



function moveBox() { 
 var canvas = document.getElementById('canvasElement'); 
var context = canvas.getContext('2d'); 
var canvasWidth = "300"; 
var canvasHeight = "50"; 
var x = 10; 
var y = 10; 
context.font = '16px Arial';
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

context.fillStyle = '#FFF';
//context.fillText("Drying time: " + dt + " hours", 15, 26);
//context.clearRect(0,0, 300, 50);
}

	
 function getCache(age) {
 

 
 //var theData = new Lawnchair('data');
 var lawnchairc = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
});
 //var jsondata;
 alert(age);
 lawnchairc.get('data', 
 		function(theJsonData) { // Test we actually got a settings object
 			if (theJsonData) { // We did, so put the values in to the form fields 
 				var jsondata = theJsonData.json;
                 var epochdata = theJsonData.epoch;				
 				alert("cached");
 				    var cutoff = parseInt("16");				
                				var parsed_json = eval('(' + jsondata + ')');
				                var location = parsed_json['location']['city'];
				                //var theDatas = new Lawnchair('data');
						var timenow = new Date();
						var hour_now  = timenow.getHours();
						var today = timenow.getDate();
						 if (age == "olddata") {
           $('#status').html("cached data from: " + epochdata + " seconds ago");
 }
						var country = parsed_json['location']['country'];
					        //alert("saved= " + json_data);
				                 var posy = 14;
                var posyt = 25;
                var example = document.getElementById('canvhere');
                var ctx2d = example.getContext('2d');
                var ni = 1;
                var done_dt = 0;                        
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
                        //alert(dt_ct);
                        
                        if (total_score > 120) {
                        var res = dt_ct;
                        if (done_dt == 0) {
                        
                        $('#calc').html(" time: " + res + " hours");
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
                    
               // moveBox();

	});
    
  
            
           
                

 				
 			} else {
 				alert("No cached data found");
 				navigator.app.exitApp();
 			}
 			
 		} // function(theSettings)		
 			
	);
        
        

        
        }

 function getData() {
 var deviceID = device.uuid;
  alert("get data " + deviceID);
  //navigator.geolocation.getCurrentPosition(function (position) {
  //var loc = position.coords.latitude + "," + position.coords.longitude;
  
  //}, function () {
    //            $('#loc_result').html("Location not available. Using North Berwick.");
                var loc = "56.058168,-2.719811";
      //      });
  
  var data_success = 0;
        $.ajax({
            url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            dataType: "jsonp",
            success: function(json) {
 //               var parsed_json = eval('(' + json + ')');
           var jsontext =  JSON.stringify(json);
           data_success = 1;
                var location = json['location']['city'];
               
            alert("got data " + data_success);
            $('#loc_result').html("Location from data " + location + " (" + loc + ")");
               // var json_data = json.toString();
                
                var epoch = Math.round(new Date().getTime() / 1000)
		var timenow = new Date();
		var hour_now  = timenow.getHours();
        var minute_now = timenow.getMinutes();
		var today = timenow.getDate();
        
        var lawnchaird = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
        });
        lawnchaird.save({key:'data', json:jsontext, hoursaved:hour_now, minsaved:minute_now, datesaved:today, epoch:epoch});
        
        //var theDatas = new Lawnchair('data');		
		//var theSettings = {key:'data', json:jsontext, hoursaved:hour_now, minsaved:minute_now, datesaved:today, epoch:epoch};
        //theDatas.save(theSettings);
        
	        },
            error: function(json) {
            alert("data error");
             } 
                          
        });
      
        
        }
        