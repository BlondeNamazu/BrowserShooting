var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var scoreText = document.getElementById("score");
var img = new Image();
img.src = "Namazu.png";
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
  scene = SCENE.Game;
  diff = 0;
  level = 0;
  worldHeight = 0;
  score = 0;
  steps = [];
  player = new ball(canvas.width/2, canvas.height-height, width, height);
  player.velY = -1.0 * jumpPower;
  drawnGameOver = false;
}
var ball = function(x,y,width,height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.velX = 0;
  this.velY = 0;
  this.update = function(){
    this.velY += gravity;
    this.y += this.velY;
    for(var i=0;i<steps.length;i++){
      if(!steps[i].hit(this)) continue;
      this.y = steps[i].y - this.height/2;
      this.velY = -1.0 * jumpPower;
    }
    if(this.y > canvas.height - this.height/2){
      console.log("dead");
      //this.y = canvas.height - this.height/2;
      //this.velY = -1.0 * jumpPower;
      scene = SCENE.Over;
    }
    this.x += this.velX;
    if(this.x > canvas.width) this.x -= canvas.width;
    if(this.x < 0) this.x += canvas.width;
  }
  this.draw = function(){
    context.drawImage(img,this.x - width/2,this.y - height/2, width, height);
  }
}



var step = function (x,y,width){
  this.x = x;
  this.y = y;
  this.width = width;
  this.hit = function(ball){
    if(ball.velY > 0 && this.x - this.width/2 < ball.x + ball.width/2 && ball.x - ball.width/2 < this.x + this.width/2 && this.y < ball.y + ball.height/2 && ball.y - ball.height/2 < this.y) return true;
    return false;
  }
  this.draw = function(ctx){
    ctx.strokeStyle = "lime";
    ctx.beginPath();
    ctx.moveTo(this.x - this.width/2,this.y);
    ctx.lineTo(this.x + this.width/2,this.y);
    ctx.closePath();
    ctx.stroke();
  }
}


init();


function update(){
  if(scene == SCENE.Game){

    player.update();
    updateWorld();
    score = Math.floor(Math.max(score, canvas.height - player.y + worldHeight));
    document.getElementById("score").innerHTML = 'Level : '+level+'<br>Your Score : '+score+'m';
    updateSteps();
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    for(var i=0;i<steps.length;i++) steps[i].draw(context);
  } else if(scene == SCENE.Over && !drawnGameOver){
    context.fillStyle = "black";
    context.globalAlpha = 0.6;
    context.fillRect(0,0,canvas.width,canvas.height);
    context.globalAlpha = 1.0;
    context.fillStyle = "red";
    context.font = "40px 'Agency'";
    context.textAlign = "center";
    context.fillText("GameOver",canvas.width/2,canvas.height/2-30);
    context.font = "30px 'Agency'";
    context.fillText("press T to Tweet",canvas.width/2,canvas.height/2 + 50);
    context.fillText("press Space to Retry",canvas.width/2,canvas.height/2 + 100);
    drawnGameOver = true;
  }
}

setInterval(update,16);


function makeSteps(num,startHeight,stepWidth,margin){
  for(var i=0;i<num;i++){
    newStep = new step(Math.random() * (canvas.width - stepWidth)+ stepWidth/2,startHeight - margin * (i+1), stepWidth);
    steps.push(newStep);
  }
}
function updateSteps(){
  if(steps.length == 0) return;
  while(steps[0].y > canvas.height) steps.shift();
}
function updateWorld(){
  if(player.y < canvas.height * 0.4){
    diff = Math.max(canvas.height * 0.4 - player.y,diff);
  }
  diff *= 0.9;
  player.y += diff;
  worldHeight += diff;
  for(var i=0;i<steps.length;i++) steps[i].y += diff;
  if(steps.length == 0){
    steps.push(new step(canvas.width/2,canvas.height,canvas.width));
    makeSteps(30,canvas.height,leveledStepWidth(level),leveledStepMargin(level++));
  }
  else if(steps.length>0 && steps[steps.length-1].y >  -100){
    makeSteps(30,steps[steps.length - 1].y,leveledStepWidth(level),leveledStepMargin(level++));
  }
}

function leveledStepWidth(level){
  var ret = Math.max(100 * Math.pow(0.8,level),10);
  return ret;
}

function leveledStepMargin(level){
  switch(level){
    case 0:
      return 75;
    case 1:
    case 2:
      return 95;
    case 3:
    case 4:
    case 5:
      return 115;
    case 6:
    case 7:
      return 135;
    default:
      return 165;
  }
}

function onClick(e){
  init();
}

function onOut(e){
  steps = [];
}

function keydown(e){
  e.preventDefault();
  if(scene == SCENE.Game){
    if(e.keyCode===37){
      player.velX = Math.max(-1.0 * MaxXvelocity,player.velX - Xvelocity);
    } else if (e.keyCode===39){
      player.velX = Math.min(MaxXvelocity,player.velX + Xvelocity);
    }
  } else if(scene == SCENE.Over){
    if(e.keyCode===32){ //Space
      init();
    } else if(e.keyCode===84){ //[T]
      window.open("https://twitter.com/intent/tweet?text=レベル"+level+"に到達して"+score+"m跳ねた！%0a&url=http://hoppingnamazu.namazu.trap.show/&hashtags=ほっぴんぐナマズ");
    }
  }
}
  

//document.addEventListener('click',onClick,false);
//document.addEventListener('mouseout',onOut,false);
document.onkeydown = keydown;

