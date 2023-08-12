let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).on("keydown", () => {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

let playSound = (name) => {
  let audioUser = "./sounds/" + name + ".mp3";
  var audio = new Audio(audioUser);
  audio.play();
};

let animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

let nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);

  let randomNumber = Math.random();
  randomNumber *= 4;
  randomNumber = Math.floor(randomNumber);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
};

$("div[type='button']").on("click", (e) => {
  let userChosenColor = $(e.target).attr("id");

  playSound(userChosenColor);
  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});

let checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
};

let startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
