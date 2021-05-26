

class Color {
  constructor(red, green, blue, alpha) {
      this.r = red;
      this.g = green;
      this.b = blue;
      this.a = alpha;
  }
}

class Position {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
}

class Frame {
  constructor(imageData) {
      this.imageData = imageData;
      this.pixels = this.imageData.data;
  }


  setPixel(x, y, color) {
      const index = ( y * 640 + x ) * 4;

      if ( index < this.pixels.length && index >= 0) {
          this.pixels[index] = color.r;
          this.pixels[index+1] = color.g;
          this.pixels[index+2] = color.b;
          this.pixels[index+3] = color.a;
      }

  }
}

class Rectangle {
  constructor (height, width, pos, x_velocity, y_velocity, color, runnerConfig){
  this.runnerConfig = runnerConfig;
  this.width = width,
  this.height = height,
  this.x_velocity = x_velocity,
  this.y_velocity = y_velocity,
  this.color = color;
  
  this.jumping = true;
  
  this.pos = new Position(
    pos.x = this.canvas.width / 2, // center of the canvas
    pos.y = 0
  );
   
  this.registerHandlers();
  
  }

  draw(frame) {

    for (let y = 0; y < this.height; y++ ) {
        for (let x = 0; x < this.width; x++) {
            frame.setPixel(this.pos.x + x, this.pos.y + y, this.color, frame.pixels);
        }
    }
  }
  
  update() {
    if (controller.up && this.jumping == false) {

      this.y_velocity -= 40;
      this.jumping = true;
  
    }
  
    if (controller.left) {  
      this.x_velocity -= 1.5;  
    }
  
    if (controller.right) {
        this.x_velocity += 1.5;
    }
  
    this.y_velocity += 1.5;// gravity
    this.pos.x += this.x_velocity;
    this.pos.y += this.y_velocity;
    this.x_velocity *= 0.9;// friction
    this.y_velocity *= 0.9;// friction
  
    // if rectangle is falling below floor line
    if (this.pos.y > this.Runner.height - 16 - this.height) {
      this.jumping = false;
      this.pos.y = this.canvas.height - 16 - this.height;
      this.y_velocity = 0;
    }
    // if rectangle is going off the left of the screen
    if (rectangle.x < -128) {
      
      rectangle.x = 1280;
  
    } else if (rectangle.x > 1280) {// if rectangle goes past right boundary
  
      rectangle.x = -128;
  
    }
}

  
  registerHandlers() {
  controller = {

    left:false,
    right:false,
    up:false,
    keyListener:function(event) {
  
      var key_state = (event.type == "keydown")?true:false;
  
      switch(event.keyCode) {
  
        case 37:// left key
          controller.left = key_state;
        break;
        case 38:// up key
          controller.up = key_state;
        break;
        case 39:// right key
          controller.right = key_state;
        break;
  
      }
    }
};
}

/*  class Block {
    constructor (height, width, x, y, color){
    this.height = 45;
    this.width = 45;
    this.x = 800;
    this.y = 0;
    this.color = rgb(255, 255, 255);
    }
    
    draw(){
      context.fillRect(this.x, this.y, this.width, this.height) 
    }
}
*/
}
class Runner {
  constructor(canvas, width, height) {
      this.config = {
          width,
          height
      }

      this.canvas = canvas;
      this.canvas.width = this.config.width;
      this.canvas.height = this.config.height;
      this.canvas.style = "border: 3px solid #bababa";
      this.lastRender = 0;

      this.ctx = canvas.getContext('2d');
  }

  start() {
      this.player1 = new Rectangle(
          new Position(this.config.wight / 2, 0),
          138, 
          138, 
          0,
          0,  
          new Color(255, 0, 0),
          this.config,
          
      );
         
      window.requestAnimationFrame(this.loop);
  }
      loop = (timestamp) => {

          let progress = timestamp - this.lastRender;
  
          this.render();
  
          this.lastRender = timestamp;
  
          window.requestAnimationFrame(this.loop);
      }
      render() {
        let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);

        const frame = new Frame(imageData);


        this.player1.update();
        this.player1.draw(frame);

        
        this.ball.draw(frame);
       

        this.ctx.putImageData(frame.imageData, 0, 0);
    }

};

const runner = new Runner(document.getElementById('runner'), 1280, 640);
runner.start();

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);





