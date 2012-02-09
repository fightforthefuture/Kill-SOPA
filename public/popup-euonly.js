/* Copyright 2011 Fight for the Future. Licensed under the MIT license. http://www.opensource.org/licenses/mit-license.php Source available at http://americancensorship.org/modal/client.js */

//IPInfoDB jQuery JSON query example
//Tested with FF 3.5, Opera 10, Chome 5 and IE 8
//Geolocation data is stored as serialized JSON in a cookie
//Bug reports : http://forum.ipinfodb.com/viewforum.php?f=7
function geolocate(timezone, cityPrecision) {
  var key = 'a809ea57ae42411b030ca10dafd412b9653886d6fc4859f7ef6d924b1d8e2b2d';
  var api = (cityPrecision) ? "ip-city" : "ip-country";
  var domain = 'api.ipinfodb.com';
  var version = 'v3';
  var url = "http://" + domain + "/" + version + "/" + api + "/?key=" + key + "&format=json" + "&callback=?";
  var geodata;
  var JSON = JSON || {};

  // implement JSON.stringify serialization
  JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
      // simple data type
      if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    } else {
    // recurse array or object
      var n, v, json = [], arr = (obj && obj.constructor == Array);
      for (n in obj) {
        v = obj[n]; t = typeof(v);
        if (t == "string") v = '"'+v+'"';
        else if (t == "object" && v !== null) v = JSON.stringify(v);
        json.push((arr ? "" : '"' + n + '":') + String(v));
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
  };

  // implement JSON.parse de-serialization
  JSON.parse = JSON.parse || function (str) {
    if (str === "") str = '""';
      eval("var p=" + str + ";");
      return p;
  };

  //Check if cookie already exist. If not, query IPInfoDB
  this.checkcookie = function(callback) {
    geolocationCookie = getCookie('geolocation');
    if (!geolocationCookie) {
      getGeolocation(callback);
    } else {
      geodata = JSON.parse(geolocationCookie);
      callback();
    }
  }

  //Return a geolocation field
  this.getField = function(field) {
    try {
      return geodata[field];
    } catch(err) {}
  }

  //Request to IPInfoDB
  function getGeolocation(callback) {
    try {
      $.getJSON(url,
      function(data){
        if (data['statusCode'] == 'OK') {
          geodata = data;
          JSONString = JSON.stringify(geodata);
          setCookie('geolocation', JSONString, 365);
          callback();
        }
      });
    } catch(err) {}
  }

  //Set the cookie
  function setCookie(c_name, value, expire) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expire);
    document.cookie = c_name+ "=" +escape(value) + ((expire==null) ? "" : ";expires="+exdate.toGMTString());
  }

  //Get the cookie content
  function getCookie(c_name) {
    if (document.cookie.length > 0 ) {
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start != -1){
        c_start=c_start + c_name.length+1;
        c_end=document.cookie.indexOf(";",c_start);
        if (c_end == -1) {
          c_end=document.cookie.length;
        }
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
    return '';
  }
}




function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}

if (typeof global_displayAmericanCensorshipModal == 'undefined') {
    var global_displayAmericanCensorshipModal = 0;
}

displayAmericanCensorshipModal = function() {
  // Inject CSS
  if (!global_displayAmericanCensorshipModal) {
      global_displayAmericanCensorshipModal = 1;
      var css = '#signupmodal-overlay{display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#444;z-index:1001;-moz-opacity:.8;opacity:.8;filter:alpha(opacity=80);}#signupmodal-lightbox{display:block;position:absolute;left:15%;top:15%;width:862px;height:347px;padding:0;margin:0;background-color:#fff;z-index:1500;overflow:hidden;box-shadow:0px 0px 25px #171717;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;overflow:hidden;}#signupmodal-lightbox iframe{border:0;width:862px;height:527px;overflow:hidden;}#signupmodal-close{color:white;font-family:"Helvetica","Arial",sans-serif;float:right;vertical-align:10px;z-index:100;position:absolute;margin-left:800px;vertical-align:50px;}';
      var style = document.createElement('style');
      style.type = "text/css";
      style.innerHTML = css;
      document.body.appendChild(style);

      // Inject HTML
      var html = '<a id="signupmodal-overlay" href="javascript:void(0)" onclick="javascript:document.getElementById(\'signupmodal-overlay\').style.display=\'none\';document.getElementById(\'signupmodal-lightbox\').style.display=\'none\';"></a>'
               + '<div id="signupmodal-lightbox">'
               + '<a id="signupmodal-close" href="javascript:void(0)" onclick="javascript:document.getElementById(\'signupmodal-overlay\').style.display=\'none\';document.getElementById(\'signupmodal-lightbox\').style.display=\'none\';">'
               + '<img src="http://americancensorship.org/modal/images/close.png" title="Close"/>'
               + '</a>'
               + '<iframe src="http://killacta.org/embed.html"></iframe>'
               + '</div>';

      var injector = document.createElement('div');
      injector.innerHTML = html;
      document.body.appendChild(injector);
  } else {
      document.getElementById('signupmodal-overlay').style.display='block';
      document.getElementById('signupmodal-lightbox').style.display='block';
  }
}


var euCountries=["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "IT", "CY", "LV", "LT", "LU",  "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "UK", "US", "GB"];


if (getCookie('acta-letterzEU')) {
    ;
} else {
		//function geolocate(timezone, cityPrecision)
		var visitorGeolocation = new geolocate(false, true);

		//Check for cookie and run a callback function to execute after geolocation is read either from cookie or IPInfoDB API
		//$(document).ready(function(){alert(visitorGeolocation.getField('countryCode'))}) doesnt work with google Chrome, this is why a callback is used instead
		var callback = function(){

			// $('#country').text(visitorGeolocation.getField('countryCode'));
			$("#country").val(visitorGeolocation.getField('countryCode'));
	};
		visitorGeolocation.checkcookie(callback);

			
		if (jQuery.inArray(visitorGeolocation.getField('countryCode'), euCountries) == -1) {
			setTimeout("displayAmericanCensorshipModal()", 10);
		    setCookie('acta-letterzEU', 'beenthere', 1);
		}   
}