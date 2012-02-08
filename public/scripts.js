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
	
	
	
	
$(document).ready(function() {
    $('input[placeholder],textarea[placeholder]').placeholder();
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-26978317-4']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Setup tracking for form submisison on #censor
    var trackingFn = function() {
      window.optimizely = window.optimizely || [];
      window.optimizely.push(["trackEvent", "SubmittedForm"]);
    }

    $('#write-congress').submit(function() {
      trackingFn();
    });		
// pick a country


	//function geolocate(timezone, cityPrecision)
	var visitorGeolocation = new geolocate(false, true);

	//Check for cookie and run a callback function to execute after geolocation is read either from cookie or IPInfoDB API
	//$(document).ready(function(){alert(visitorGeolocation.getField('countryCode'))}) doesnt work with google Chrome, this is why a callback is used instead
	var callback = function(){

		// $('#country').text(visitorGeolocation.getField('countryCode'));
		$("#country").val(visitorGeolocation.getField('countryCode'));
};
	visitorGeolocation.checkcookie(callback);

	var EUText = "I urge you to vote no on ACTA and to communicate its severe problems to your colleagues. ACTA's vague language locks us into obsolete copyright and patent laws, preventing democracies from updating their laws to unlock new economic and social opportunities.\r\rIt criminalizes harmless remixes by ordinary users if they achieve \"a commercial scale\" (art 2.14.1) which many amateur videos do on sites like Youtube. And it criminalizes legitimate websites by making them responsible for user behavior (\"aiding and abetting\" art 2.14.4).\r\rWorse, it permanently bypasses the democratic process by empowering the \"ACTA Committee\" to \"propose amendments to [ACTA]\" without your approval. (art 6.4) In other words, it's impossible to know what you're voting for.\r\rThe global movement against the US law SOPA showed that internet freedom is a crucial issue which belongs in the legislative process of each country. You should view ACTA as an attempt by a handful of companies to circumvent the democratic process, and you should vote against it.\r\rThank you. Please reply if you have any questions."
	var nonEUText = "I am very concerned about the Trans-Pacific Partnership Agreement currently being negotiated by the Office of the United States Trade Representative.\r\rIn an internet age, changes to copyright enforcement or online commerce can have devastating effects on individual freedom and the prosperity of entire industries. The resounding defeat of SOPA &amp; PIPA in Congress show that the public demands a say in any new policy that impacts the future of the internet.\r\rWhen Congress listens to the people and rejects one-sided tech policy, it&#x27;s wrong and anti-democratic for unelected officials to move forward with similar policy in trade agreements, especially when these trade agreements are negotiated in secret, giving special access to politically-connected industries while public interest groups are locked out.\r\rAny changes in these areas should only be made by Congress, with vigorous public debate. You should drop any changes to copyright, online commerce, or information policy from TPP immediately.\r\rPlease reply with any questions.";
	
	var euCountries=["BE", "BG", "CZ", "DK", "DE", "EE", "IE", "EL", "ES", "FR", "IT", "CY", "LV", "LT", "LU",  "HU", "MT", "NL", "AT", "PL", "PT", "RO", "SI", "SK", "FI", "SE", "UK", "US", "GB"];

	function notEuro() {
		$("#custom-316").text(nonEUText);
		$("button.green").text("Sign the Petition!");
	}
	
	function Euro() {
		$("#custom-316").text(EUText);
		$("button.green").text("Write Them Now!");
	}


	// Set euro to be true if our visitor is in Europe (or the US for this form)
	var euro;
	function EUorNO(countryID){				
		if (jQuery.inArray(countryID, euCountries) == -1) {
			euro = "False";
			notEuro();

			return "GOT IT";
			 } else {
				euro = "True"; 
				Euro();

				return "NOPE";};
		
	}
	
	EUorNO(visitorGeolocation.getField('countryCode'));
	
	$('#country').change(function() {

		EUorNO($('#country').val());
	});
