jQuery.extend({
  percentage: function (a, b) {
    return Math.round((a / b) * 100);
  },
});

// CHECK IF ON MOBILE

let is_mobile =
  !!navigator.userAgent.match(/iphone|android|blackberry/gi) || false;
if (is_mobile == true) {
  console.log("user is on mobile");
} else {
  console.log("user is on desktop");
}

//DEFINITION VARIABLES

let $layer_0 = $(".layer-0"),
  $layer_1 = $(".layer-1"),
  $layer_2 = $(".layer-2"),
  $layer_3 = $(".layer-3"),
  $x_axis = $("#x-axis"),
  $y_axis = $("#y-axis"),
  $container = $("body"),
  isMenuOn = "false",
  loadingImg = $("#loadingImg"),
  container_w = $container.width(),
  container_h = $container.height(),
  p_left = 0,
  p_top = 0;

let winWidth = $(window).width();
let winHeight = $(window).height();

// let s_pos_x = winWidth / (100 / toPercentage(x, 1));
// let s_pos_y = winHeight / (100 / toPercentage(y, 1));

let s_pos_x = $.percentage(100, winWidth);
let s_pos_y = $.percentage(100, winWidth);

// DEV MENU
document.querySelector(".floatingLogo").addEventListener("click", function () {
  testDevMenu();
});

function testDevMenu() {
  if (isMenuOn == false) {
    document.querySelector(".dev_info").classList.add("d-none");

    isMenuOn = true;
  } else {
    document.querySelector(".dev_info").classList.remove("d-none");
    isMenuOn = false;
  }
}

// GYROSCOPE function

function gyroMovement(target, multiplier1, multiplier2) {
  TweenMax.to(target, 1, {
    css: {
      transform:
        "translateX(" +
        (x_acceleration / multiplier1).toFixed(3) +
        "vw) translateY(" +
        (y_acceleration / multiplier2).toFixed(3) +
        "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
}
// gyroMovement(layer-0, 8, 8);
// TweenMax.to($x_axis, 1, {
//   css: {
//     transform: "translateX(" + (x_acceleration / 4).toFixed(3) + "vw)",
//   },
//   ease: Expo.easeOut,
//   overwrite: "all",
// });
// TweenMax.to($y_axis, 1, {
//   css: {
//     transform: "translateY(" + y_acceleration + "vh)",
//   },
//   ease: Expo.easeOut,
//   overwrite: "all",
// });

// EVENT ON IMAGE LOADED

$(".Click-here").on("click", function () {
  $(".custom-model-main").addClass("model-open");
});
$(".close-btn, .bg-overlay").click(function () {
  $(".custom-model-main").removeClass("model-open");
});

function onLoaded() {
  alert("image is loaded successfully");
  $("#popup--loading").removeClass("popup--in");
  $("#popup--loading").addClass("popup--out");
  $("#popup--loaded").removeClass("popup--out");
  $("#popup--loaded").addClass("popup--in");
  setTimeout(() => {
    $("#popup--loaded").addClass("popup--out");
    $("#popup--loaded").removeClass("popup--in");
  }, 1500);
}
function onActivated() {
  alert("activated the parrallax !");
  $(".letterbox1").addClass("letterbox1--away");
  $(".letterbox2").addClass("letterbox2--away");
  $(".headerTop").addClass("headerTop__large");
  $("#parrallaxMagic").removeClass("standBy");
}

// window.addEventListener("load", () => {
//   setTimeout(onLoaded, 1500);
// });

let image = document.querySelector("#loading");

window.addEventListener("load", (event) => {
  setTimeout(onLoaded(), 1500);
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
    // accelerationHandler(accelerometer, "moAccel");
  });
  accelerometer.start();

  if ("GravitySensor" in window) {
    let gravity = new GravitySensor();
    gravity.addEventListener("reading", (e) =>
      accelerationHandler(gravity, "moAccelGrav", 6, 4)
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
    // accelerationHandler(eventData.acceleration, "moAccel");
    accelerationHandler(
      eventData.accelerationIncludingGravity,
      "moAccelGrav",
      6,
      4
    );
    rotationHandler(eventData.rotationRate);
    intervalHandler(eventData.interval);
  };

  window.addEventListener("devicemotion", onDeviceMotion, false);
} else {
  document.getElementById("moApi").innerHTML =
    "No Accelerometer & Gyroscope API available";
}

// PARRALLAX

document.querySelector("#parrallaxActivator").onclick = function () {
  onActivated();
  // MOUSE MOVEMENT CODE
  $(window).on("mousemove.parallax", function (event) {
    let p_pos_x = event.pageX,
      p_pos_y = event.pageY,
      p_left = container_w / 2 - p_pos_x;
    p_top = container_h / 2 - p_pos_y;
    document.querySelector("#pLeftInfo").innerHTML = p_left;
    document.querySelector("#pTopInfo").innerHTML = p_top;
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

    TweenMax.to($layer_3, 1, {
      css: {
        transform:
          "translateX(" + p_left / 20 + "px) translateY(" + p_top / 10 + "px)",
      },
      ease: Expo.easeOut,
      overwrite: "all",
    });

    TweenMax.to($layer_2, 1, {
      css: {
        transform:
          "translateX(" + p_left / 18 + "px) translateY(" + p_top / 9 + "px)",
      },
      ease: Expo.easeOut,
      overwrite: "all",
    });

    TweenMax.to($layer_1, 1, {
      css: {
        transform:
          "translateX(" + p_left / 16 + "px) translateY(" + p_top / 8 + "px)",
      },
      ease: Expo.easeOut,
      overwrite: "all",
    });

    TweenMax.to($layer_0, 1, {
      css: {
        transform:
          "translateX(" + p_left / 64 + "px) translateY(" + p_top / 32 + "px)",
      },
      ease: Expo.easeOut,
      overwrite: "all",
    });
  });
};

// GYROSCOPE CODE

function accelerationHandler(
  acceleration,
  targetId,
  x_multiplier,
  y_multiplier
) {
  var info,
    xyz = "[X, Y, Z]";
  x_acceleration = (acceleration.x && acceleration.x) * x_multiplier.toFixed(3);
  y_acceleration = (
    (acceleration.y && acceleration.y) * y_multiplier -
    30
  ).toFixed(3);
  z_acceleration = acceleration.z && acceleration.z.toFixed(3);
  info = xyz.replace("X", x_acceleration);
  info = info.replace("Y", y_acceleration);
  info = info.replace("Z", z_acceleration);
  document.getElementById(targetId).innerHTML = info;
  TweenMax.to($x_axis, 1, {
    css: {
      transform: "translateX(" + (x_acceleration / 4).toFixed(3) + "vw)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  TweenMax.to($y_axis, 1, {
    css: {
      transform: "translateY(" + y_acceleration + "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  gyroMovement($layer_0, 0.9, 5);
  gyroMovement($layer_3, 0.85, 3.5);
  gyroMovement($layer_2, 0.8, 3);
  gyroMovement($layer_1, 0.75, 2.75);
}

function rotationHandler(rotation) {
  var info,
    xyz = "[X, Y, Z]";
  x_rotation = rotation.alpha && rotation.alpha.toFixed(2);
  y_rotation = rotation.beta && rotation.beta.toFixed(2);
  z_rotation = rotation.gamma && rotation.gamma.toFixed(2);
  info = xyz.replace("X", y_rotation);
  info = info.replace("Y", x_rotation);
  info = info.replace("Z", z_rotation);
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.querySelector("#moInterval").innerHTML = interval;
}
