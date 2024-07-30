class Start{
    /**
     * Starting menu class
     */
    constructor(){
        this.frame = frameCount;
        this.alpha = 255;
        this.speed = -5;
        this.particles = [];
    }
    /**
     * Draws the starting screen, including any animations
     * shown on the screen (particles, player, enemy, etc.)
     */
    draw(){
        background('black');
        noStroke();
        textSize(32);
        textFont('Georgia');
        fill('#CCCCFF');
        text('Medieval Conquerers', 250, 120);
        textSize(14);
        textFont('Helvetica');
        text('By: Alex Sablan', 335, 150);
        text('Ruiqi Zhang', 358, 170);
        fill(255, this.alpha);
        text('press anywhere to start', 320, 350);
        
        this.particles.push(new particleObj(0, 0));
        this.particles.push(new particleObj(800, 400));
    
    
        
        for (var i=0; i<this.particles.length; i++) {
            if (this.particles[i].timeLeft > 0) {
                this.particles[i].draw();
                this.particles[i].move();
            }
            else {
                this.particles.splice(i, 1);
            }
        }


        // Characters
        player[0].draw();  // Player
        player[0].animate();
        player[0].move_auto();

        enemy[0].draw();   // Enemy
        enemy[0].animate();
        enemy[0].move_auto();
    }
    
    animate(){
        this.alpha += this.speed;
        if(this.alpha===0 || this.alpha===255){
            this.speed = -this.speed;
        }
    }
  }
  class particleObj{
      /**
       * Particles displayed on screen
       * @param {*} x Initial x-coordinate
       * @param {*} y Initial y-coordinate
       */
    constructor(x,y){
      this.position = new p5.Vector(x, y);
      this.velocity = new p5.Vector(random(0, TWO_PI), random(-1, 1));
      this.size = random(1, 10);
      this.c1 = random(100, 255);
      this.c2 = random(100, 255);
      this.c3 = random(100, 255);
      this.timeLeft = 1000;
    }
  
  
    move(){
      var v = new p5.Vector(this.velocity.y*cos(this.velocity.x),
          this.velocity.y*sin(this.velocity.x));
  
      this.position.add(v);
      //this.position.add(this.velocity); // cartesian
      this.timeLeft--;
    }
  
    draw() {
      noStroke();
      fill(this.c1, this.c2, 0, this.c3);
      ellipse(this.position.x, this.position.y, this.size, this.size);
    }
  }
  
  