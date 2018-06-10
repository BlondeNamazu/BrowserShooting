class Bullet {
  constructor(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
  }
  draw(ctx){
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x-3,this.y-3,6,6)
  }
  setPos(x,y){
    this.x = x;
    this.y = y;
  }
  setVel(vx,vy){
    this.vx = vx;
    this.vy = vy;
  }

}
