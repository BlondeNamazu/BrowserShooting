var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var scoreText = document.getElementById("score");

var player;
var bul;
function init(){
  player = new Player(canvas.width/2,canvas.height * 3/4)
  bul = []
  bul.push(new Bullet(canvas.width/2,0,0.3,0.5))
  bul.push(new Bullet(canvas.width/2,0,-0.1,0.4))
  bul.push(new Bullet(canvas.width/2,0,0.1,0.4))
  bul.push(new Bullet(canvas.width/2,0,-0.3,0.3))
  setInterval(update,16)
}

function update(){
  if(!player) return;
  player.update()
  bul.forEach((v)=>{
    v.update()
  })
  ctx.clearRect(0,0,canvas.width,canvas.height)
  player.draw(ctx)
  bul.forEach((v)=>{
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
  }
}
document.onkeydown = onkeydown;
document.onkeyup = onkeyup;
init();
