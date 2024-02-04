//Variables
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Functions
function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random()*4); //Select randomly button
    let randomChosenColour = buttonColours[randomNumber]; //Convert it 
    gamePattern.push(randomChosenColour); //Addet to pattern

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Flash

    $("h1").text("Level "+level); //Update text
    level++; //Increase level
    
}

function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function (){$("#"+currentColour).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length)
            setTimeout(function(){nextSequence();}, 1000);
    }  
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        playSound("wrong");
        startOver();
    }
        
}

function startOver(){
    $("h1").text("Press A Key to Start");
    level=0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}
//--------------------------------------------------------- Interaction with web site
$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});
