var script = document.createElement('script');
script.src = 'jasonconverttable.js';
document.head.appendChild(script);


function newsearchtable(){

      var searchpattern = document.getElementById('searchtext').value; 
	  

	  
      $.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script

        contentType: "application/json; charset=utf-8",
        dataType: "json",
		
        // send string pattern in search box to the Perl script
	
        data: "search=" + searchpattern,
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
/*           $('div#topdiv').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#topdiv').addClass("error"); */
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
        success: function(data){
			
			
          if (data.error) { // script returned error
  /*           $('div#topdiv').text("data.error: " + data.error);
            $('div#topdiv').addClass("error"); */
          } // if
          else { //  successful
 
	
			var temp = convertjsonobj( parseInt(data["iTotalRecords"]) , data["aaData"]); 

			
			var vtext = JSON.stringify(temp.data);

/* 			$('div#topdiv').addClass("success"); */

			var numberofrecord = JSON.stringify(data["iTotalRecords"]);
		
			if (document.getElementById('table1') !== null) 
			{
			    removeElement('table1'); 
			}
			
			//Only first parameter is required
            var jsonHtmlTable = ConvertJsonToTable(JSON.parse(vtext), "table1", null, 'Download');

			document.getElementById('seconddiv').innerHTML+= jsonHtmlTable;
			
			
          } //else
        } // success
      }); // ajax
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

function addElement(parentId, elementTag, elementId, html) 

 {

// Adds an element to the document

    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) 

{

    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function cancelclick()
{

		$.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script
		
		
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: "Date=" + " " + "&Time=" + " ",
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
  
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
		
		beforeSend: function () {
 
        },
		
		complete: function () {
            $("div#Content1").show();
			
			 
            $("div#Content2").hide();
			
        },
		
        success: function(data){
          if (data.error) { // script returned error
 
          } // if
          else { //  successful
 	


          } //else
		} // success	  
      }); // ajax

	 
}

function newbutclick()
{

		$.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script
		
		
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: "Date=" + " " + "&Time=" + " ",
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
  
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
		
		beforeSend: function () {
 
        },
		
		complete: function () {
            $("div#Content1").hide();
			
			 
            $("div#Content2").show();
			
        },
		
        success: function(data){
          if (data.error) { // script returned error
 
          } // if
          else { //  successful
 	


          } //else
		} // success	  
      }); // ajax

	 
}

function myFunction()
{

		$.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script
		
		
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: "Date=" + " " + "&Time=" + " ",
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
  
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
		
		beforeSend: function () {
 
        },
		
		complete: function () {
            $("div#Content1").show();
			
			 
            $("div#Content2").hide();
			
        },
		
        success: function(data){
          if (data.error) { // script returned error
 
          } // if
          else { //  successful
 	
			var numberofrecord = JSON.stringify(data["iTotalRecords"]);

			var temp = convertjsonobj( parseInt(data["iTotalRecords"]) , data["aaData"]); 
			
			var vtext = JSON.stringify(temp.data);
			
			//Only first parameter is required
            var jsonHtmlTable = ConvertJsonToTable(JSON.parse(vtext), "table1", null, 'Download');

	        document.getElementById('Content3').innerHTML+= jsonHtmlTable;
			

          } //else
		} // success	  
      }); // ajax

	 
}
		
function newtable(){

var searchpattern = document.getElementById('searchtext').value; 

      $.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
         data: "search=" + searchpattern,
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
 
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
        success: function(data){
          if (data.error) { // script returned error
 
          } // if
          else { // successful
            $('div#Content3').hide();
			
			
			var temp = convertjsonobj( parseInt(data["iTotalRecords"]) , data["aaData"]); 
			
			var vtext = JSON.stringify(temp.data);
			
			var numberofrecord = JSON.stringify(data["iTotalRecords"]);
	
			removeElement('table1'); 
			
			//Only first parameter is required
            var jsonHtmlTable = ConvertJsonToTable(JSON.parse(vtext), "table1", null, 'Download');

			document.getElementById('Content3').innerHTML+= jsonHtmlTable;
			
			$('div#Content3').fadeIn();
			
			
          } //else
        } // success
      }); // ajax
	  
	  
	  
}
	
$(document).ready(function(){
	
 
  
  $("form#Search").submit(function() { // loginForm is submitted
    var username = $('#Date').attr('value'); // get username
    var password = $('#Time').attr('value'); // get password
 
      $.ajax({
        type: "GET",
        url: "/cgi-bin/login.pl", // URL of the Perl script
		
		
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // send username and password as parameters to the Perl script
        data: "Date=" + " " + "&Time=" + " ",
        // script call was *not* successful
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
          $('div#loginResult').text("responseText: " + XMLHttpRequest.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('div#loginResult').addClass("error");
        }, // error 
        // script call was successful 
        // data contains the JSON values returned by the Perl script
        success: function(data){
          if (data.error) { // script returned error
            $('div#loginResult').text("data.error: " + data.error);
            $('div#loginResult').addClass("error");
          } // if
          else { // login was successful
            $('form#loginForm').hide();
			
            $('div#loginResult').text("data.success: " +  JSON.stringify(data["aaData"]));
			

			$('div#loginResult').addClass("success");
	
			var numberofrecord = JSON.stringify(data["iTotalRecords"]);

			//Only first parameter is required
            var jsonHtmlTable = ConvertJsonToTable(data["iTotalRecords"], "body", null, 'Download');
	
	      
          } //else
        } // success
      }); // ajax
  
    $('div#loginResult').fadeIn();
	
	
    return false;
  });
	
});

