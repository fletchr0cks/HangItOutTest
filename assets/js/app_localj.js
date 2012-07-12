 
 function checkCacheDate() {

  var store = new Lawnchair({
         adapter: "dom",
         name: "hiost"
     }, function(store) {
     });


 store.exists('loc', function(available){
 	     
 	        if(available){
 	            store.get('loc', function(me) {
 		    $("#loctxt").append('<br />Found loc:' + me.value);
 		    checkData();
         });
 	        }else{
 	        $("#loctxt").append('<br />no location');
 	            
 	        getLoc();    
         }
     });
     
     
     function getLoc() {
     $("#loctxt").append('<br />getting loc');
     var me = {
      	                key: 'loc',
      	                value: 'hihi'
      	            };
      	
      	            // save it
      	            store.save(me);
 	             $("#loctxt").append('<br />Saved:' + JSON.stringify(me));
 	             $("#loctxt").append('<br />on to checking data');
     checkData();
     }
 
 function checkData() {
 $("#loctxt").append('<br />checking data');
  store.exists('wu_data', function(available){
  	     
  	        if(available){
  	            store.get('wu_data', function(me) {
  		    $("#loctxt").append('<br />Found epoch:' + me.epoch);
  		    //compare
          });
  	        }else{
  	        $("#loctxt").append('<br />no wu data, getting');
  	            
  	        getData();    
          }
      });

 
 }
 
 
 function getData() {
 $("#loctxt").append('<br />getting epoch');
  var epochnow = Math.round(new Date().getTime() / 1000);
  var me = {
       	                key: 'wu_data',
       	                jsondata: 'json here',
       	                epoch: epochnow
       	            };
       	
       	            // save it
       	            store.save(me);
 	             $("#loctxt").append('<br />Saved:' + JSON.stringify(me));
 
 }
 
 $("#nuke").click(function () {
     alert("nuke");
     store.nuke();
     });

    $("#databtn_y").click(function () {
    alert("yes data");
    
     });
    
    $("#databtn_n").click(function () {
    alert("no data");
        
     });
     
     
     

    $("#locbtn_y").click(function () {
    alert("yes loc");
    store.get('location', function(me) {
                $("#data").append('<br />Found:' + JSON.stringify(me));
        });
     });
    
    $("#locbtn_n").click(function () {
    alert("no loc");
        store.exists('location', function(available){
	        var preStr = "";
	
	        // check whether required data is available, if not create it
	        if(available){
	            store.get('location', function(me) {
		    $("#data").append('<br />Found no:' + JSON.stringify(me));
        });
	        }else{
	            //preStr = "data is not available, ";
	            var me = {
	                key: 'location'
	            };
	
	            // save it
	            store.save(me);
	             $("#data").append('<br />Saved:' + JSON.stringify(me));
        }
     });
     });
     
     
       $("#wubtn_y").click(function () {
         alert("yes wu");
         
          });
         
       $("#wubtn_n").click(function () {
         alert("no wu");
             
     });
     
     

 

     
     
     
     
     
    
    
    }