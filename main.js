var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var scoreText = document.getElementById("score");

var player;
var fbs = [];
function init(){
  player = new Player(canvas.width/2,canvas.height * 3/4)
  fbs.push(generateFB(Math.PI*1/4))
  fbs.push(generateFB(Math.PI*2/4))
  fbs.push(generateFB(Math.PI*3/4))
  setInterval(update,16)
}

function generateFB(theta){
  var fb = new FBullet(canvas.width/2,0,0.3,theta);
  fb.bul.push(new FBChild(0,0))
  fb.bul.push(new FBChild(5,0))
  fb.bul.push(new FBChild(10,0))
  fb.bul.push(new FBChild(15,0))
  fb.bul.push(new FBChild(5*Math.sqrt(2),Math.PI*3/4))
  fb.bul.push(new FBChild(5,Math.PI*1/2))
  fb.bul.push(new FBChild(5*Math.sqrt(2),Math.PI*1/4))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(1,2)))
  fb.bul.push(new FBChild(10*Math.sqrt(2),Math.PI*3/4))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(2,-1)))
  fb.bul.push(new FBChild(10,Math.PI*1/2))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(2,1)))
  fb.bul.push(new FBChild(5*Math.sqrt(2),Math.PI*5/4))
  fb.bul.push(new FBChild(5,Math.PI*3/2))
  fb.bul.push(new FBChild(5*Math.sqrt(2),Math.PI*7/4))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(-1,2)))
  fb.bul.push(new FBChild(10*Math.sqrt(2),Math.PI*5/4))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(-2,-1)))
  fb.bul.push(new FBChild(10,Math.PI*3/2))
  fb.bul.push(new FBChild(5*Math.sqrt(5),Math.atan2(-2,1)))
  return fb;
}

function update(){
  if(!player) return;
  player.update()
  fbs.forEach((v)=>{
    v.update()
  })
  ctx.clearRect(0,0,canvas.width,canvas.height)
  player.draw(ctx)
  fbs.forEach((v)=>{
    v.draw(ctx)
  })
}

function onkeydown(e){
  if(!player) return;
  switch(e.keyCode){
    case 37:
      player.setVel(Key.LEFT,true)
      break;
    case 38:
      player.setVel(Key.UP,true)
      break;
    case 39:
      player.setVel(Key.RIGHT,true)
      break;
    case 40:
      player.setVel(Key.DOWN,true)
      break;
    case 16:
      player.setVel(Key.SHIFT,true)
      break;
  }
}
function onkeyup(e){
  if(!player) return;
  switch(e.keyCode){
    case 37:
      player.setVel(Key.LEFT,false)
      break;
    case 38:
      player.setVel(Key.UP,false)
      break;
    case 39:
      player.setVel(Key.RIGHT,false)
      break;
    case 40:
      player.setVel(Key.DOWN,false)
      break;
    case 16:
      player.setVel(Key.SHIFT,false)
      break;
  }
}
document.onkeydown = onkeydown;
document.onkeyup = onkeyup;
init();
