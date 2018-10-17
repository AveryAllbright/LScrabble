/* Turtle Class
 * Author: Steven Yi
 */

class Turtle {
  constructor(startPos) {
    this.pos = startPos;
    this.angle = -Math.PI / 2; // start facing upwards
  }

  drawForward(mag) {
    let p1 = this.pos;
    let diff = Vec2(mag, 0).rotate(this.angle);
    let p2 = p1.copy().translate(diff);

    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);

    this.pos = p2;
  }

  moveForward(mag) {
    let diff = Vec2(mag, 0).rotate(this.angle);
    this.pos.translate(diff);
  }


  rotate(angleAdj) {
    this.angle += angleAdj;
  }

  moveTo(newPos) {
    this.pos = newPos;  
  } 
}

