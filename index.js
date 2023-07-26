var color=["red","blue","green","yellow"];
var gamePattern=[];
var level=0;
var started=false;
var userClickedButton=[];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedButton.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedButton.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedButton[currentLevel]){

        if(userClickedButton.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game over, press any key to restart.")

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedButton = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=color[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}