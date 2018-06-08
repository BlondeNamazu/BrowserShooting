var Key = {
  UP : 1,
  DOWN : 2,
  LEFT : 3,
  RIGHT : 4,
}
class Player {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }
  setVel(key,isPressed){
    var vx = this.vx
    var vy = this.vy
    switch(key){
      case Key.UP :
        vy = isPressed ? -1 : 0
        break;
      case Key.DOWN :
        vy = isPressed ? 1 : 0
        break;
      case Key.LEFT :
        vx = isPressed ? -1 : 0
        break;
      case Key.RIGHT :
        vx = isPressed ? 1 : 0
        break;
    }
    this.vx = vx;
    this.vy = vy;
  }
  update(){
    // adjust to abs velocity is 1
    var mag = Math.abs(this.vx)+Math.abs(this.vy)
    if(mag == 0) mag = 1;
    this.x += this.vx/mag;
    this.y += this.vy/mag;
  }
  draw(ctx){
    ctx.fillStyle = "red"
    ctx.fillRect(this.x-10,this.y-10,20,20)
  }
}
