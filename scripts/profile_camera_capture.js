/**
 * Camera capture for profile picture taking.
 */
function CameraCapture(){}

CameraCapture.isAvailable = function(){
    return true;
}

/**
 * Asks for permissions if required and sets up camera capturing.
 */
CameraCapture.setup = function(){
    const target = $('#camera_capture .target')[0];
    navigator.getUserMedia({
        video: true
    }, function(stream) {
        //  Camera stream update
        target.src = window.URL.createObjectURL(stream);
        
    }, function(e){
        console.log(e);
    });
}

CameraCapture.showDialog = function(){
    ModalDialog.show($('#camera_capture'));

    if (!CameraCapture.isSetup && CameraCapture.isAvailable()) {
        CameraCapture.setup();
        CameraCapture.isSetup = true;
    }
}

$(function(){
});