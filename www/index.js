var vid = document.getElementById('video');
vid.muted = true;


document.addEventListener("deviceready", function() {
  cordova.plugins.iosrtc.debug.enable('iosrtc*');
  cordova.plugins.iosrtc.registerGlobals();
  document.getElementById('one').addEventListener('click', function() {
    view(0);
  });
  document.getElementById('two').addEventListener('click', function() {
    view(1);
  });
});

function getCameraIds() {
  return navigator.mediaDevices.enumerateDevices().then(function(devices) {
    return devices.filter(function(device) {
      return device.kind === 'videoinput' || device.kind === 'video' ? device.deviceId : null;
    }).map(function(camera) {
      return camera.deviceId;
    });
  });
}

function view(idx) {
  getCameraIds().then(function(cameras) {
    var source = cameras[idx];
    console.log(source);
    console.log(typeof source);
    navigator.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          sourceId: source
        }
      }
    }, function(stream) {
      vid.srcObject = stream;
      vid.load();
      vid.play();
    }, function(err) {
      console.log(err);
    });
  });
}
