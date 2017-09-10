function AddE() {
}

AddE.prototype.click = function(elem,callback,param){
  elem.addEventListener("click",function() {
    callback(param);
});}
