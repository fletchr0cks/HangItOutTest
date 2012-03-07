// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
        if (navigator.network.connection.type == Connection.NONE) {
            alert("No internet connection - we won't be able to show you any maps");
        } else {
            alert("We can reach Google! Trying location");
            navigator.geolocation.getCurrentPosition(function (position) {
                var loc = "" + position.coords.latitude + "," + position.coords.longitude;
                $('#results2').html(loc);

            }, function () {
                $('#results2').html("fail");
            });
            
            
            
            $('#results').html("Loading results ...");
             $.ajax({
		url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/"+ loc + ".json",
		dataType: "jsonp",
		success: function(parsed_json) {
			var location = parsed_json['location']['city'];
            alert(location);
            $('#results').html(location);
             $.each(parsed_json.hourly_forecast, function (i, zone) {
            
            var sky = zone.sky;
            $('#results2').append("<p>" + sky + "</p>");

	});
            }
            
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
