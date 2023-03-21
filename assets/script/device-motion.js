if ("LinearAccelerationSensor" in window && "Gyroscope" in window) {
  document.getElementById("moApi").innerHTML = "Generic Sensor API";

  let lastReadingTimestamp;
  let accelerometer = new LinearAccelerationSensor();
  accelerometer.addEventListener("reading", (e) => {
    if (lastReadingTimestamp) {
      intervalHandler(
        Math.round(accelerometer.timestamp - lastReadingTimestamp)
      );
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, "moAccel");
  });
  accelerometer.start();

  if ("GravitySensor" in window) {
    let gravity = new GravitySensor();
    gravity.addEventListener("reading", (e) =>
      accelerationHandler(gravity, "moAccelGrav")
    );
    gravity.start();
  }

  let gyroscope = new Gyroscope();
  gyroscope.addEventListener("reading", (e) =>
    rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z,
    })
  );
  gyroscope.start();
} else if ("DeviceMotionEvent" in window) {
  document.getElementById("moApi").innerHTML = "Device Motion API";

  var onDeviceMotion = function (eventData) {
    accelerationHandler(eventData.acceleration, "moAccel");
    accelerationHandler(eventData.accelerationIncludingGravity, "moAccelGrav");
    rotationHandler(eventData.rotationRate);
    intervalHandler(eventData.interval);
  };

  window.addEventListener("devicemotion", onDeviceMotion, false);
} else {
  document.getElementById("moApi").innerHTML =
    "No Accelerometer & Gyroscope API available";
}

function accelerationHandler(acceleration, targetId) {
  var info,
    xyz = "[X, Y, Z]";
  let x = acceleration.x && acceleration.x.toFixed(0);
  let y = acceleration.y && acceleration.y.toFixed(0);
  let z = acceleration.z && acceleration.z.toFixed(0);

  let ball = $(".ball");

  let winWidth = $(window).width();
  let winHeight = $(window).height();

  let s_pos = {
    x: winWidth / (100 / toPercentage(x, 1)),
    y: winHeight / (100 / toPercentage(y, 1)),
  };

  $(ball).css({
    right: s_pos.x,
    top: s_pos.y,
  });

  info = xyz.replace("X", s_pos.x);
  info = info.replace("Y", s_pos.y);
  info = info.replace("Z", z);
  // info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  // info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  // info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
  let info,
    xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.querySelector("#moInterval").innerHTML = interval;
}
