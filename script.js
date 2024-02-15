// remaining time
function initializeTime() {
  const timeNow = new Date();
  const launchingDay = new Date("2024-02-15");

  const differenceInMilliseconds = Math.abs(launchingDay - timeNow);

  const daysLeft = Math.floor(differenceInMilliseconds / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.floor(
    (differenceInMilliseconds / (60 * 60 * 1000)) % 24
  );
  const minutesLeft = Math.floor((differenceInMilliseconds / (60 * 1000)) % 60);
  const secondsLeft = Math.floor((differenceInMilliseconds / 1000) % 60);

  if (
    secondsLeft === 0 &&
    minutesLeft === 0 &&
    hoursLeft === 0 &&
    daysLeft === 0
  ) {
    launchingDay.setDate(launchingDay.getDate() + 10);
  }

  return {
    secondsLeft: secondsLeft,
    minutesLeft: minutesLeft,
    hoursLeft: hoursLeft,
    daysLeft: daysLeft,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  loadFirst();
});

function loadFirst() {
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

  document.getElementById("seconds-number-2").innerHTML = displayValue1;
  document.getElementById("seconds-number-4").innerHTML = displayValue1;

  document.getElementById("minutes-number-2").innerHTML = displayValue2;
  document.getElementById("minutes-number-4").innerHTML = displayValue2;

  document.getElementById("hours-number-2").innerHTML = displayValue3;
  document.getElementById("hours-number-4").innerHTML = displayValue3;

  document.getElementById("days-number-2").innerHTML = displayValue4;
  document.getElementById("days-number-4").innerHTML = displayValue4;
}

$(function () {
  $(".main-layout").queue(function (n) {
    $(this).fadeIn(5000);
    n();
  });

  // seconds
  window.setInterval(function () {
    const timeResults = initializeTime();

    console.log(
      timeResults.daysLeft,
      "days,",
      timeResults.hoursLeft,
      "hours,",
      timeResults.minutesLeft,
      "minutes,",
      timeResults.secondsLeft,
      "seconds"
    );

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

    changeValue(
      "flip-box-inner-seconds",
      "#seconds-number-1",
      "#seconds-number-2",
      "#seconds-number-3",
      "#seconds-number-4",
      displayValue1
    );

    // minutes
    timeResults.secondsLeft === 0
      ? changeValue(
          "flip-box-inner-minutes",
          "#minutes-number-1",
          "#minutes-number-2",
          "#minutes-number-3",
          "#minutes-number-4",
          displayValue2
        )
      : "";

    // hours
    timeResults.minutesLeft === 0
      ? changeValue(
          "flip-box-inner-hours",
          "#hours-number-1",
          "#hours-number-2",
          "#hours-number-3",
          "#hours-number-4",
          displayValue3
        )
      : "";

    // days
    timeResults.hoursLeft === 0
      ? changeValue(
          "flip-box-inner-days",
          "#days-number-1",
          "#days-number-2",
          "#days-number-3",
          "#days-number-4",
          displayValue4
        )
      : "";
  }, 1000);

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
});
