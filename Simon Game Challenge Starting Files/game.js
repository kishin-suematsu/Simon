var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function () {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//game side
function nextSequence() {
  userClickedPattern=[];
  $("#level-title").text("Level " + level++);
  var randomNumber = Math.floor(Math.random() * 10) % 4;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound("sounds/" + userChosenColour + ".mp3");
}

//User Click (user side)
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); //attr: attribute
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound("sounds/" + userChosenColour + ".mp3");
  animatePress(userChosenColour);

  //every time click is monitored.
  checkAnswer(userClickedPattern.length-1);
});

//play sound
function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

//animation function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//check answer
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");

        
          setTimeout(function () {
            nextSequence();
          },1000);
        
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        console.log("wrong");

        startOver();
    }
}


//start over
function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}