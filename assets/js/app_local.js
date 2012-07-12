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
var lawnchair = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
});    
        
        
function checkCacheDate() {
var gotdata = 0;
// Getting some data out of the lawnchair database
lawnchair.get('mydata', function(obj) {
    if (obj !== null) {
    //alert("have data");
    gotdata = -1;
    } else {
    alert("no data");
    gotdata = -1
    }
    doSomething(gotdata);
});

// Saving to the database
//lawnchair.save({key:'my_data_key', lastSync: currentTime, dataList: someData});         
    
}

function doSomething(datar) {
//alert("func" + datar);
if (datar == -1) {
getData();
} else {
getCache("olddata");
}
}

function resultsClick() {
//var somedata = "hihi";
//lawnchair.save({key:'mydata', lastSync:somedata});
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


function getCacheNew(age) {

    var store = new Lawnchair({
        adapter: "dom",
        name: "data_store"
    }, function(store) {
    });

    store.get('app_data', function(theJsonData) {
        var jsondata = theJsonData.json;
        var epochdata = theJsonData.epoch;
        //alert("cached");
        var cutoff = parseInt("16");
        var parsed_json = eval('(' + jsondata + ')');
        var location = parsed_json['location']['city'];
        //var theDatas = new Lawnchair('data');
        var timenow = new Date();
        var hour_now = timenow.getHours();
        var today = timenow.getDate();
        //if (age == "olddata") {
        $('#loc_result').append("<br /> cached data from: " + age);
        // }
        var country = parsed_json['location']['country'];
        //alert("saved= " + json_data);
        var posy = 14;
        var posyt = 25;
        var example = document.getElementById('canvhere');
        var ctx2d = example.getContext('2d');
        var ni = 1;
        var done_dt = 0;
        hour_bg_bk = "8695B7";
        

        var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);

        $.each(parsed_json.hourly_forecast, function(i, zone) {

            var ws = (parseInt(zone.wspd.english) * 6) + 10;
            var temp = (parseInt(zone.temp.metric) * 3) + 10;
            var hour = zone.FCTTIME.hour;
            var sky = parseInt(zone.sky);
            var rain = parseInt(zone.qpf.metric);
            var hour_bg_bk = "9F9F9F";
            var wind_bg = "51D251";
            var temp_bg = "FFB336";
            var wind_txt = "FFF";
            var temp_txt = "FFF";
            var ampm = zone.FCTTIME.ampm;
            var cond = zone.condition;
            var humid = parseInt(zone.humidity);
            var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);


            var yday = parseInt(zone.FCTTIME.yday);
            var hour_padded = parseInt(zone.FCTTIME.hour);
            var civil = parseInt(zone.FCTTIME.civil);

            var userhtml = " ";

            ctx2d.fillStyle = "#77A3D7";
            ctx2d.fillRect(2, posy, 180, 44);
            //here
            ctx2d.font = '20px Arial';
            ctx2d.fillStyle = '#FFF';
            if (hour.length == 1) {
                ctx2d.fillText(hour, 16, posyt + 10);
            } else {
                ctx2d.fillText(hour, 6, posyt + 10);
            }

            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);


            ctx2d.fillStyle = "#FFBD35";
            ctx2d.fillRect(53, posy + 30, ws, 14);
            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = wind_txt;
            ctx2d.fillText(zone.wspd.metric, 40 + ws, posyt + 30);

            ctx2d.fillStyle = "#DD6C42";
            ctx2d.fillRect(53, posy + 16, temp, 14);
            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = temp_txt;
            ctx2d.fillText(zone.temp.metric, 40 + temp, posyt + 16);

            total_score = total_score + score;

            dt_ct = dt_ct + 1;

            ctx2d.font = '9px Arial';
            ctx2d.fillStyle = "#FFFFFF";
            ctx2d.fillText(cond, 53, posyt);

            ctx2d.font = '11px Arial Bold ';
            //ctx2d.fillStyle = temp_bg;
            //alert(dt_ct);

            if (total_score > 120) {
                var res = dt_ct;
                if (done_dt == 0) {

                    $('#calc').html("Drying time: " + res + " hours");
                    //alert("dt = " + res);
                }
                done_dt = 1;
                //ctx2d.fillText(dt_ct, 352, posyt - (dt_ct * 15) + 15);
                while (dt_ct > 0) {
                    //alert(dt_ct);
                    if (res == 1) {
                        ctx2d.fillText(res + " Hour", 4, posyt - (dt_ct * 50) + 30);
                    } else {
                        ctx2d.fillText(res + " Hours", 4, posyt - (dt_ct * 50) + 30);
                    }
                    dt_ct = dt_ct - 1;
                }



                total_score = 0;
            }


            posy = posy + 50;
            posyt = posyt + 50;

        });

    });




}
        
 function saveData(lat,lval,pid) {
  $.ajax({
                    type: "POST",
                    //url: "http://washingapp.apphb.com/Home/Save",
                    url: "http://localhost:3192/Home/Save",
                    data: "lat=22&lval=37",
                    dataType: "text/plain",
                    success: function(response) {
                    //alert("posted" + lat + ":" + lval);
                      var json = eval('(' + response + ')');
                      alert("out=" + json);
                    },
            error: function(data) {
            alert("save error");
                 }
                 });
 }

function checkLoc() {

//navigator.geolocation.getCurrentPosition(function (position) {
//  loc = position.coords.latitude + "," + position.coords.longitude;
//  alert(loc);
  return 1;
//  }, function () {
//  alert("no location");
//  return 0
//  });

}

function getDatalocalNew() {
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
        $('#loc_result').append("<br /> lat " + lat + "long " + longval);
        
    });

 var loc = lat + "," + longval;
 $.ajax({
  type: "GET",
  url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
  //dataType: "jsonp",
  //success: function(json) {
            
  
  //url: "json.txt",
  dataType: "jsonp",
  success: function(json) {
      //var json = eval('(' + jsontxt + ')');
      var jsontext = JSON.stringify(json);
      var location = json['location']['city'];

      $('#loc_result').append("<br /> Location from data local new " + location + " (" + loc + ")");

      var epoch = Math.round(new Date().getTime() / 1000)
      var timenow = new Date();
      var hour_now = timenow.getHours();
      var minute_now = timenow.getMinutes();
      var today = timenow.getDate();
      var me = {
          key: 'app_data',
          json: jsontext,
          hoursaved: hour_now,
          minsaved: minute_now,
          datesaved: today,
          epoch: epoch
      };

      // save it
      store.save(me);
      
      //lawnchair_s.save({ key: 'mydata', json: jsontext, hoursaved: hour_now, minsaved: minute_now, datesaved: today, epoch: epoch });

      getCacheNew("newdata");
  },
  error: function(xhr, error) {
      console.debug(xhr); console.debug(error);
  },
  complete: function() {

  }

});
        
}


 function getDatalocal() {
 var lawnchair_s = new Lawnchair({table:'mytable'}, function(){
    // Lawnchair setup! 
});
 //var deviceID = device.uuid;
 var loc = "56.058168,-2.719811";
 var locck = checkLoc();
 // alert("get data " + locck);
 if (locck == 1) {

        $.ajax({
            //url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            //dataType: "jsonp",
            //success: function(json) {
            
            type: "GET",
	    url: "json.txt",
	    dataType: "html",
	    success: function(jsontxt) {
           	var json = eval('(' + jsontxt + ')');
		var jsontext =  JSON.stringify(json);	
            	var location = json['location']['city'];
          
           $('#loc_result').append("<br /> Location from data local" + location + " (" + loc + ")");
           
                var epoch = Math.round(new Date().getTime() / 1000)
	        var timenow = new Date();
		var hour_now  = timenow.getHours();
                var minute_now = timenow.getMinutes();
		var today = timenow.getDate();
        
        lawnchair_s.save({key:'mydata', json:jsontext, hoursaved:hour_now, minsaved:minute_now, datesaved:today, epoch:epoch});
      
           getCache("newdata");    
       	        },
           error: function(xhr, error) {
	                      console.debug(xhr); console.debug(error);
	                  },
	                  complete: function() {
	   
               }
                          
        });
        
        } else {
        
        alert("not loc for data");
        }
      
        
        }
        