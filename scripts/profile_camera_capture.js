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
    const target$ = $('#camera_capture .target');
    const target = target$[0];
    
    navigator.getUserMedia({
        video: true,
        width: target$.width(),
        height: target$.height()
    }, function(stream) {
        //  Camera stream update
        CameraCapture.stream = stream;
        target.src = window.URL.createObjectURL(stream);

    }, function(e){
        if (e.name == 'DevicesNotFoundError'){
            //  No device
        }
    });
}

CameraCapture.showDialog = function(){
    ModalDialog.show($('#camera_capture'));

    if (CameraCapture.isAvailable()){
        CameraCapture.setup();
    }
}

/* Captures a screenshot from the camera stream. */
CameraCapture.capture = function(){
    let stream = $('#camera_capture .target');
    let canvas = $('#camera_img_target');
    let context = canvas[0].getContext('2d');
    context.drawImage(stream[0], 0, 0, canvas.width(), canvas.height());
    
    stream.hide();
    canvas.show();
}

/* Uses the captured photo for profile picture change. */
CameraCapture.useCaptured = function(){
    let uri = $('#camera_img_target')[0].toDataURL();
    let asBlob = Utils.uriToBlob(uri);
    Profile.uploadProfilePicture(asBlob);
}

/* Stops the camera stream */
CameraCapture.stop = function(){
    let stream = CameraCapture.stream;
    if (stream){
        for (let track of stream.getTracks()){
            track.stop();
        }
    }

    //  Pause video stream
    $('#camera_capture .target')[0].pause();
}

$(function(){

    $('#camera_capture_snap').click(CameraCapture.capture);
    $('#camera_capture_accept').click(CameraCapture.useCaptured);

    //  Listen for dialog hiding
    ModalDialog.hideListeners.push(function(dialogId){
        if (dialogId == 'camera_capture'){
            CameraCapture.stop();
        }
    });
});