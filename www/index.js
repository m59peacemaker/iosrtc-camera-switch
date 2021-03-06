var vid = document.getElementById('video');
vid.muted = true;

document.addEventListener("deviceready", function() {
  window.shouldRotateToOrientation = function(degrees) {
    return true;
  };
  cordova.plugins.iosrtc.debug.enable('iosrtc*');
  cordova.plugins.iosrtc.registerGlobals();
  document.getElementById('one').addEventListener('click', function() {
    view(0);
  });
  document.getElementById('two').addEventListener('click', function() {
    view(1);
  });
});

function view(idx) {
  getCameraIds().then(function(cameras) {
    var source = cameras[idx];
    navigator.getUserMedia({
      audio: true,
      video: {
        optional: [{
          sourceId: source
        }]
      }
    }, function(stream) {
      vid.src = URL.createObjectURL(stream);
    }, function(err) {
      console.log(err);
    });
  });
}

function getCameraIds() {
  return navigator.mediaDevices.enumerateDevices().then(function(devices) {
    return devices.filter(function(device) {
      return device.kind === 'videoinput' || device.kind === 'video' ? device.deviceId : null;
    }).map(function(camera) {
      return camera.deviceId;
    });
  });
}
