	// Wait for PhoneGap to load 
    document.addEventListener("deviceready", onDeviceReady, false); 
	
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    function onDeviceReady() {            	
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
 
        var checkBtn = $('#checkConnection');
        checkBtn.click(function(){
        	checkConnection();
        });
        
        var offline = $('#offline');
	    var online = $('#online');
        online.hide();
        offline.hide();		
    }
    
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

        alert('Connection type: ' + states[networkState]);
    }
	
	function onOffline() {
	    // Handle the offline event
	    alert("You are offline!");
	    var offline = $('#offline');
	    var online = $('#online');
        offline.show();
        online.hide();	    	    
	}
	
	function onOnline() {
	    // Handle the online event
	    alert("You are online!");
  		var online = $('#online');
  		var offline = $('#offline');
        online.show();
        offline.hide(); 
	}