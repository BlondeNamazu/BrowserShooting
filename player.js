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
    this.UP = false;
    this.DOWN = false;
    this.LEFT = false;
    this.RIGHT = false;
    this.SHIFFT = false;
  }
  setVel(key,isPressed){
    switch(key){
      case Key.UP :
        this.UP = isPressed;
        break;
      case Key.DOWN :
        this.DOWN = isPressed;
        break;
      case Key.LEFT :
        this.LEFT = isPressed;
        break;
      case Key.RIGHT :
        this.RIGHT = isPressed;
        break;
      case Key.SHIFT :
        this.SHIFT = isPressed;
        break;
    }
    this.vx = (this.RIGHT?1:0) - (this.LEFT?1:0);
    this.vy = (this.DOWN?1:0) - (this.UP?1:0);
  }
  update(){
    // adjust to abs velocity is 1
    var mag = Math.abs(this.vx)+Math.abs(this.vy)
    if(mag == 0) mag = 1;

    let speed = this.SHIFT?2:5;

    this.x += this.vx*speed/mag;
    this.y += this.vy*speed/mag;
  }
  draw(ctx){
    ctx.fillStyle = "red"
    ctx.fillRect(this.x-10,this.y-10,20,20)
  }
}
