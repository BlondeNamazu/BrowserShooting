var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var scoreText = document.getElementById("score");
var SCENE = {
  Game : 1,
  Over : 2
};


width = 60;
height = 32;
gravity = 0.9;
jumpPower = 20.0;
Xvelocity = 4.0;
MaxXvelocity = 4.0;
cameraMax = 10.0;
drawnGameOver = false;

function init(){
}
//document.onkeydown = keydown;

