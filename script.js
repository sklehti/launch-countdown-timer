let launchingDay;

// remaining time
function initializeTime() {
  const timeNow = new Date();

  const differenceInMilliseconds = Math.abs(launchingDay - timeNow);

  const daysLeft = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.floor(
    (differenceInMilliseconds / (60 * 60 * 1000)) % 24
  );
  const minutesLeft = Math.floor((differenceInMilliseconds / (60 * 1000)) % 60);
  const secondsLeft = Math.floor((differenceInMilliseconds / 1000) % 60);

  return {
    secondsLeft: secondsLeft,
    minutesLeft: minutesLeft,
    hoursLeft: hoursLeft,
    daysLeft: daysLeft,
  };
}

// animation
function changeValue(
  boxpage,
  number1,
  number2,
  number3,
  number4,
  displayValue
) {
  $("#" + boxpage).css("animation", "boxmove 999ms");

  $(number1).text(displayValue);
  $(number3).text(displayValue);

  $(number2)
    .delay("slow")
    .queue(function (next) {
      $(this).text(displayValue);
      $(number4).text(displayValue);

      document.getElementById(boxpage).style.animationName = "none";

      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(boxpage).style.animationName = "";
        }, 0);
      });

      next();
    });
}

//intervals
function intervals() {
  window.setInterval(function () {
    const timeResults = initializeTime();

    let displayValue1 =
      timeResults.secondsLeft < 10
        ? "0" + timeResults.secondsLeft
        : timeResults.secondsLeft;
    let displayValue2 =
      timeResults.minutesLeft < 10
        ? "0" + timeResults.minutesLeft
        : timeResults.minutesLeft;
    let displayValue3 =
      timeResults.hoursLeft < 10
        ? "0" + timeResults.hoursLeft
        : timeResults.hoursLeft;
    let displayValue4 =
      timeResults.daysLeft < 10
        ? "0" + timeResults.daysLeft
        : timeResults.daysLeft;

    // days
    timeResults.secondsLeft === 59 &&
    timeResults.minutesLeft === 59 &&
    timeResults.hoursLeft === 23
      ? changeValue(
          "flip-box-inner-days",
          "#days-number-1",
          "#days-number-2",
          "#days-number-3",
          "#days-number-4",
          displayValue4
        )
      : "";

    // hours
    timeResults.secondsLeft === 59 && timeResults.minutesLeft === 59
      ? changeValue(
          "flip-box-inner-hours",
          "#hours-number-1",
          "#hours-number-2",
          "#hours-number-3",
          "#hours-number-4",
          displayValue3
        )
      : "";

    // minutes
    timeResults.secondsLeft === 59
      ? changeValue(
          "flip-box-inner-minutes",
          "#minutes-number-1",
          "#minutes-number-2",
          "#minutes-number-3",
          "#minutes-number-4",
          displayValue2
        )
      : "";

    // seconds
    changeValue(
      "flip-box-inner-seconds",
      "#seconds-number-1",
      "#seconds-number-2",
      "#seconds-number-3",
      "#seconds-number-4",
      displayValue1
    );
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  loadFirst();
});

function loadFirst() {
  launchingDay = new Date().setDate(new Date().getDate() + 10);
  const timeResults = initializeTime();

  let displayValue1 = 59;
  let displayValue2 = 59;
  let displayValue3 = 23;
  let displayValue4 = 9;

  changeValue(
    "flip-box-inner-days",
    "#days-number-1",
    "#days-number-2",
    "#days-number-3",
    "#days-number-4",
    displayValue4
  );

  changeValue(
    "flip-box-inner-hours",
    "#hours-number-1",
    "#hours-number-2",
    "#hours-number-3",
    "#hours-number-4",
    displayValue3
  );

  changeValue(
    "flip-box-inner-minutes",
    "#minutes-number-1",
    "#minutes-number-2",
    "#minutes-number-3",
    "#minutes-number-4",
    displayValue2
  );

  changeValue(
    "flip-box-inner-seconds",
    "#seconds-number-1",
    "#seconds-number-2",
    "#seconds-number-3",
    "#seconds-number-4",
    displayValue1
  );
}

$(function () {
  $(".main-layout").queue(function (n) {
    $(this).fadeIn(2000);
    n();
  });

  intervals();
});
