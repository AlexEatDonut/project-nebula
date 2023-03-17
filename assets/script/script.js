$(document).ready(function () {
  /********************
    TEST BRO
    ********************/

  function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
    x = oneDecimal(x);
    y = oneDecimal(y);
    z = oneDecimal(z);

    // Show motion info
    $(".x_axis .value").text(x);
    $(".y_axis .value").text(y);
    $(".z_axis .value").text(z);

    // Now animate the .thePlayer
    var plyr = $(".such_ball_much_wow");

    var winWidth = $(window).width();
    var winHeight = $(window).height();

    var _pos = {
      x: winWidth / (100 / toPercentage(x, 1)),
      y: winHeight / (100 / toPercentage(y, 1)),
    };

    $(plyr).css({
      right: _pos.x,
      top: _pos.y,
    });
  }

  window.addEventListener("devicemotion", handleMotionEvent, true);

  function oneDecimal(n) {
    var number = n;
    var rounded = Math.round(number * 10) / 10;
    return rounded;
  }

  function toPercentage(x, n) {
    var p = 0;
    if (n) {
      p = ((x + 10) / 20) * 100;
    } else {
      p = (x + 10) / 20;
    }
    return oneDecimal(p);
  }

  // Animations with the wows!
  var animations = ["flash"];
  var animationName = "";
  // Show the wows
  $(".wowCircle").on("mouseenter", function () {
    animationName = animations[randInt(0, animations.length - 1)];

    $(".wow-overlay").show();
    $(".wow-overlay .wow").addClass("animated " + animationName);
  });

  $(".wowCircle").on("mouseleave", function () {
    $(".wow-overlay").hide();
    $(".wow-overlay .wow").removeClass("animated " + animationName);
  });

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
