var Main = {
  init: function(){
  },

  pagecheck: function(){ //Checkes what the Url contains.
    this.emptyUrl = location.href.split('/').pop(); //Check url and changes for example css and other content depending on url.
    }
  },//end pagecheck

}//END Main

window.onload = function() {
  Main.init();
}//END ONLOAD Function
