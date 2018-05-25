var script = document.createElement('script');
script.src = 'jasonconverttable.js';
document.head.appendChild(script);

function validateForm() {
    var x = document.getElementById("datepicker").value;
	var y = document.getElementById("timepicker").value;
	var z = document.getElementById("description").value;
	
    if (x == "") {
        alert("Date must be filled out");
        return false;
    } else if (y == "") {
        alert("Time must be filled out");
        return false;
    } else if (z == "") {
        alert("Description must be filled out");
        return false;
    }
	else
		return true; 
	
}

function newelement(){

  if ( validateForm() == true ) {
	  
	  var strDate = document.getElementById("datepicker").value;
	  var strTime = document.getElementById("timepicker").value;
	  var strDesc = document.getElementById("description").value;
	  var param = "'Date'=" +  strDate + "&'Time'=" + strTime + "&'Desc'=" + strDesc ;

      $.ajax({
        type: "GET",
        url: "/cgi-bin/add.pl", // URL of the Perl script

        contentType: "application/json; charset=utf-8",
     /*    dataType: "json", */
		
        // send string pattern in search box to the Perl script
	
        data: param,
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
          $('div#topdiv').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#topdiv').addClass("error");
		  return false; 
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
        success: function(data){
			
			
          if (data.error) { // script returned error
            $('div#topdiv').text("data.error: " + data.error);
            $('div#topdiv').addClass("error");
			return false; 
          } // if
          else { // insertion was successful
            
			document.getElementById("datepicker").value="";
	        document.getElementById("timepicker").value="";
	        document.getElementById("description").value="";
			
			return true; 
          } //else
        } // success
      }); // ajax  
  } else {
	  return false; 
  }	  
}
	

function assert(condition, message) {
   /*  if (!condition) {
        throw message || "Assertion failed";
    } */
}

function removeElement(elementId) 
{

    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function item(Date,Time, Desc) {
  this.Date = Date;
  this.Time = Time;
  this.Desc = Desc;
}

function convertjsonobj(count, Data ){

var i, n = count;
var tmp = new Array();
var vDate = "Date";
var vTime = "Time";
var vDesc = "Desc";
var mObj = new Object;
var dataitem = Object;
 
    for (i=0; i<n; i++)
    {
		dataitem = new item(Data[i][0],Data[i][1],Data[i][2]);

        tmp[i] = dataitem;
		
    }
	
   
     mObj.data = tmp; 
	
	return mObj; 
	
}






function todayDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return yyyy+'-'+mm+'-'+dd;
}


function myDate() {
  $( this ).next( "span" ).css( "display", "inline" ).fadeOut( 1000 );
  $().attr('min', todayDate());
  $('#datepicker').datepicker({ minDate: 0, maxDate: "+60D" });
};

function myTime() {
	$( "#timepicker" ).timepicker({
 	'minTime': '8:00am',
	'maxTime': '6:00pm',
	'disableTimeRanges': [['9:00am', '10:00am'],['10:30am', '11:30am']],
    'step': 30
    });
}; 
 
$(document).ready(function() {
	
	 
	 $().attr('min', todayDate());
	 $('#datepicker').datepicker({ minDate: 0, maxDate: "+60D" });

  
     $( "#timepicker" ).timepicker({
		'minTime': '8:00am',
	    'maxTime': '6:00pm',
	    'disableTimeRanges': [['9:00am', '10:00am'],['10:30am', '11:30am']],
        'step': 30  
	 });
	 

});

