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

class FBullet {
  constructor(x,y,v,theta){
    this.x = x;
    this.y = y;
    this.v = v;
    this.bul = [];
    this.fbul = [];
    this.theta = theta;
  }
  update(){
    this.x += this.v * Math.cos(this.theta);
    this.y += this.v * Math.sin(this.theta);
  }
  draw(ctx){
    this.bul.forEach((v)=>{
      v.draw(ctx,this.x,this.y,this.theta);
    })
    this.fbul.forEach(v)=>{
      v.draw(ctx)
    }
  }
}

class FBChild {
  constructor(r,phi){
    this.r = r;
    this.phi = phi;
  }
  draw(ctx,cx,cy,theta){
    var x = cx + this.r * Math.cos(theta + this.phi);
    var y = cy + this.r * Math.sin(theta + this.phi);
    ctx.fillStyle = "blue";
    ctx.fillRect(x-2,y-2,4,4);
  }
}
