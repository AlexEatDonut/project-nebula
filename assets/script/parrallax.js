jQuery.extend({
  percentage: function (a, b) {
    return Math.round((a / b) * 100);
  },
});

window.addEventListener("load", (event) => {
  let image = document.querySelector("#gifLoading");
  let isLoadedSuccessfully = image.complete && image.naturalWidth !== 0;
  alert(isLoadedSuccessfully);
});

// CHECK IF ON TABLET OR MOBILE
window.mobileAndTabletCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
if (window.mobileAndTabletCheck == true) {
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
  gifLoading = $("#gifLoading"),
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

// EVENT ON IMAGE LOADED

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
    // accelerationHandler(eventData.acceleration, "moAccel");
    accelerationHandler(eventData.accelerationIncludingGravity, "moAccelGrav");
    rotationHandler(eventData.rotationRate);
    intervalHandler(eventData.interval);
  };

  window.addEventListener("devicemotion", onDeviceMotion, false);
} else {
  document.getElementById("moApi").innerHTML =
    "No Accelerometer & Gyroscope API available";
}

$(window).on("mousemove.parallax", function (event) {
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
        "rotateX(" + p_left * -1 + "deg) rotateY(" + p_top * -1 + ") ;",
      //     transform: "rotate(" + (z_rotation / 10) * -180 + "deg)",
    },
    overwrite: "all",
  });
});

const speed_axis = [-6, -8, -10, -12];

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
  info = info.replace("Z", z_acceleration);
  document.getElementById(targetId).innerHTML = info;
  console.log(s_pos_x, s_pos_y);
  TweenMax.to($x_axis, 1, {
    css: {
      transform: "translateX(" + x_acceleration * speed_axis[2] + "vw)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  TweenMax.to($y_axis, 1, {
    css: {
      transform: "translateY(" + y_acceleration * speed_axis[1] + "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  TweenMax.to($layer_0, 1, {
    css: {
      transform: "rotateX(" + (x_acceleration * speed_axis[2]) / 12 + "deg);",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  TweenMax.to($layer_3, 1, {
    css: {
      transform:
        "translateX(" +
        (x_acceleration * speed_axis[2]) / 4 +
        "vw) translateY(" +
        (y_acceleration * -speed_axis[1]) / 2 +
        "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });
  TweenMax.to($layer_2, 1, {
    css: {
      transform:
        "translateX(" +
        (x_acceleration * speed_axis[2]) / 6 +
        "vw) translateY(" +
        (y_acceleration * -speed_axis[1]) / 3 +
        "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "all",
  });

  TweenMax.to($layer_1, 1, {
    css: {
      transform:
        "translateX(" +
        (x_acceleration * speed_axis[1]) / 8 +
        "vw) translateY(" +
        (y_acceleration * -speed_axis[1]) / 4 +
        "vh)",
    },
    ease: Expo.easeOut,
    overwrite: "none",
  });
}

function rotationHandler(rotation) {
  let info,
    xyz = "[X, Y, Z]";
  x_rotation = rotation.alpha && rotation.alpha.toFixed(2);
  y_rotation = rotation.beta && rotation.beta.toFixed(2);
  z_rotation = rotation.gamma && rotation.gamma.toFixed(2);
  info = xyz.replace("X", y_rotation);
  info = info.replace("Y", x_rotation);
  info = info.replace("Z", z_rotation);
  document.getElementById("moRotation").innerHTML = info;

  // TweenMax.to($layer_1, 1, {
  //   css: {
  //     transform: "rotate(" + (z_rotation / 10) * -180 + "deg)",
  //   },
  //   overwrite: "none",
  // });
}

function intervalHandler(interval) {
  document.querySelector("#moInterval").innerHTML = interval;
}
