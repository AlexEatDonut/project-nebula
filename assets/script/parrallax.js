jQuery.extend({
  percentage: function (a, b) {
    return Math.round((a / b) * 100);
  },
});

// TESTING TO SEE IF THERE IS A GYROSCOPE

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

//DEFINITION VARIABLES

let $layer_0 = $(".layer-0"),
  $layer_1 = $(".layer-1"),
  $layer_2 = $(".layer-2"),
  $x_axis = $("#x-axis"),
  $y_axis = $("#y-axis"),
  $ball = $(".ball"),
  $container = $("body"),
  container_w = $container.width(),
  container_h = $container.height(),
  p_left = 0,
  p_top = 0;

let winWidth = $(window).width();
let winHeight = $(window).height();

alert($.percentage(100, winWidth));

// let s_pos_x = winWidth / (100 / toPercentage(x, 1));
// let s_pos_y = winHeight / (100 / toPercentage(y, 1));

let s_pos_x = $.percentage(100, winWidth);
let s_pos_y = $.percentage(100, winWidth);

$(window).on("mousemove.parallax", function (event) {
  if ($(window).width() < 580) {
    p_left = container_w / 2 - s_pos_x;
    p_top = container_h / 2 - s_pos_y;
    console.log(s_pos_x, s_pos_y);
  } else {
  }
  let p_pos_x = event.pageX,
    p_pos_y = event.pageY,
    p_left = container_w / 2 - p_pos_x;
  p_top = container_h / 2 - p_pos_y;
  console.log(p_pos_x, p_pos_y);
  TweenMax.to($x_axis, 1, {
    css: {
      transform: "translateX(" + p_left * -1 + "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($y_axis, 1, {
    css: {
      transform: "translateY(" + p_top * -1 + "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_2, 1, {
    css: {
      transform:
        "translateX(" + p_left / 12 + "px) translateY(" + p_top / 6 + "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_1, 1, {
    css: {
      transform:
        "translateX(" + p_left / 8 + "px) translateY(" + p_top / 4 + "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_0, 10, {
    css: {
      transform: "rotate(" + p_left / 200 + "deg)",
    },
    ease: Expo.easeOut,
    overwrite: "none",
  });
});

function accelerationHandler(acceleration, targetId) {
  let info,
    xyz = "[X, Y, Z]";
  x_acceleration = acceleration.x && acceleration.x.toFixed(2);
  y_acceleration = acceleration.y && acceleration.y.toFixed(2);
  z_acceleration = acceleration.z && acceleration.z.toFixed(2);

  // info = xyz.replace("X", s_pos.x);
  // info = info.replace("Y", s_pos.y);
  // info = info.replace("Z", z);
  info = xyz.replace("X", x_acceleration);
  info = info.replace("Y", y_acceleration);
  info = info.replace("Z", y_acceleration);
  document.getElementById(targetId).innerHTML = info;
  console.log(s_pos_x, s_pos_y);
  TweenMax.to(ball, 1, {
    css: {
      transform: "translateX(" + s_pos_x * -1 + "px)",
      right: s_pos_x,
      top: s_pos_y,
    },
  });
}

function rotationHandler(rotation) {
  let info,
    xyz = "[X, Y, Z]";
  x_rotation = rotation.alpha && rotation.alpha.toFixed(2);
  y_rotation = rotation.beta && rotation.beta.toFixed(2);
  z_rotation = rotation.gamma && rotation.gamma.toFixed(2);
  info = xyz.replace("X", x_rotation);
  info = info.replace("Y", y_rotation);
  info = info.replace(
    "Z",
    (z_rotation = rotation.gamma && rotation.gamma.toFixed(2))
  );
  document.getElementById("moRotation").innerHTML = info;
  TweenMax.to($y_axis, 1, {
    css: {
      transform: "translateY(" + y_rotation * -1 + "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_2, 1, {
    css: {
      transform:
        "translateX(" +
        x_rotation / 12 +
        "px) translateY(" +
        y_rotation / 6 +
        "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_1, 1, {
    css: {
      transform:
        "translateX(" +
        x_rotation / 8 +
        "px) translateY(" +
        y_rotation / 4 +
        "px)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_0, 10, {
    css: {
      transform: "rotate(" + z_rotation / 200 + "deg)",
    },
    ease: Expo.easeOut,
    overwrite: "none",
  });
}

function intervalHandler(interval) {
  document.querySelector("#moInterval").innerHTML = interval;
}
