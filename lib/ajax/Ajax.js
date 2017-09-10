//--------------------------------------------------------------------------
// Ajax - Public class
//--------------------------------------------------------------------------

/**
 *  @version    0.5
 *  @copyright  No
 *  @license    No
 *  @updated    2017-09
 *  @author     Andreas Poulsen <Littlemeister_@hotmail.com>
 */

function Ajax(method, url, params, callback) {
//method = ex. Post, Get --- url = If you send url with parameters you can use GET to get them. ---- Parameters = use POST to get the parameters.
  this.method = method || "post";
  this.url = url || null;
  this.params = params || null;
  this.callback = callback || null;
}// End CallAjaxs

Ajax.prototype = Object.create(AddE.prototype);
Ajax.prototype.constructor = Ajax;

Ajax.prototype.send = function(){
  if(this.params){
    this.ajaxMethod(this.method, this.url, this.params, this.callback).send(this.params); // Send request to server
  }else{
    this.ajaxMethod(this.method, this.url, this.params, this.callback).send(null); // Send request to server
  }
}

Ajax.prototype.ajaxMethod = function(){
  var _this = this;
  //Following alows you to comunicate asyncrinous
  this.request; 	// Object for Ajax-call
  if (XMLHttpRequest) { this.request = new XMLHttpRequest(); } // Different objekt (XMLHttpRequest eller ActiveXObject), depending on webbbrowser
  else{
    var version = ["MicrosoftXmlHttp","MSXML2.XmlHttp","MSXML2.XmlHttp3.0","MSXML2.XmlHttp4.0","MSXML2.XmlHttp5.0", "createXMLhttpRequestObject()"]; //IE versions, even before IE 6
    for(var i = 0, len = version.length; i < len; i++){
      try{
        this.request = new ActiveXObject(version[i]); //FRÅGA ÄR DEM BARA FÖR EXPLORER ActiveXObject
      }
      catch(e){console.log("Tyvärr inget stöd för AJAX, så data kan inte läsas in"); return false;}
    }//end forloop
  }//end else if

  if(this.method == "post"){
    this.request.open(this.method,this.url,this.params,true); // What to get/post from the source (from XMLHttpRequest))
    /*The request.setRequestHeader() method sets the value of an HTTP request header. You must call setRequestHeader()after open(), but before send(). If this method is called several times with the same header, the values are merged into one single request header.*/
    this.request.setRequestHeader("content-type", "application/x-www-form-urlencoded"); //The data sent is in a form submition. Call setRequestHeader() and set its content type to "application/x-www-form-urlencoded". This is needed for any POST request made via Ajax.
  }else{
    this.request.open(this.method,this.url,true); // What to get/post from the source.
  } // {RESTful riktlinjer/regelverk -stringified string} //ResponseText = JSON, ResponseXML = XML !!!!!!!!!!!

//Test using request.onload() instead of readystate && status
  this.request.onreadystatechange = function () { // Function to read status in communikationen
    if ( (this.readyState === 4) && (this.status === 200) ) {
      //what to do
      if(_this.callback){
        _this.callback(this.responseText, _this.callbackParam); //JSON.parse(this) ---> typeof=(Object)
      }
      else{
        console.log("!no callback was sent!");
      }
      if(_this.success){
        _this.success(this.responseText);
      }else{}
    }
    else { // waiting for result
      //console.log("loading", this.readyState);
      //document.getElementById(container_id).innerHTML = loading_text;
    }
  };
    //"NN!Ö#"N Lägg in Notice the use of encodeURIComponent() to encode any special characters within the parameter values.
  return this.request;
};// end ajaxMethod

//Send method, url, params)
/*CallAjax("GET","test.txt", function(){
  console.log(arguments);
});
*/













/*

var resetData;
function _ajax(a,b,c,d) {
    var x;
    var y = navigator.onLine;
    if(!y) {_alert("Ingen anslutning."); return;}
    if(XMLHttpRequest){
        x = new XMLHttpRequest();
    } else if (ActiveXObject){
        x = new ActiveXObject("Microsoft.XMLHTTP");
    } else{
        _alert("Denna webbläsare saknar stöd för kunna att köra denna sida."); return false;
    }
    _loader(); _hide();

    x.open(a,b,true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	(c) ? x.send(c) : x.send(null);
	x.onreadystatechange = function (){
	    if ((x.readyState == 4) && (x.status == 200))
	  	{
				_loader(); _hide();

				var z = JSON.parse(x.responseText);
				resetData = z;

				if(z===1) {_get();}
		    	else if(!d) content(z);
					else if(d) d(z);
		    	else return;

			}
	};
}

function _hide() {
	if(!_id("category")) return;
	_id("category").classList.toggle("hide");
}
function _loader() {
	if(!_class("loader")[0]) return;
	_class("loader")[0].classList.toggle("loading");
}

*/
