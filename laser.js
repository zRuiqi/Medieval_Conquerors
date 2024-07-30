class Laser {
    /**
     * Laser class for the Boss
     * @param {*} image 
     * @param {*} posX 
     * @param {*} posY 
     */
    constructor(x, y) {
        // Positional properties
        this.x = x;
        this.y = y;
        this.playerX = 0;
        this.playerY = 0;
        this.speed = 0;
        this.angle = 0;
        this.centerX = x + 56;
        this.centerY = y + 57;
        this.direction = 0;
        this.chunks = [];
        this.step = new p5.Vector(0,0);
        this.currFrame = frameCount;
        this.chunkCount=0;

        // Damage property
        this.damage = 0.1;
        this.time_alive = 120;
    }
    /**
     * Draws the laser
     */
    draw() {
        //Draws the laser according to initial angle
        push();
        noStroke();
        fill('cyan');
        if (this.direction === 0) {
            translate(this.centerX-8, this.centerY);
            for(var i=0; i<this.chunkCount; i++){
                    ellipse(this.step.x*i*3, this.step.y*i*3,25,25);
                
            }
        }
        else{
            translate(this.centerX+50, this.centerY);
            for(var i=0; i<this.chunkCount; i++){
                    ellipse(this.step.x*i*3, this.step.y*i*3,25,25);
            }
        }
        rotate(this.angle);
        pop();

        this.update();
    }
    /**
     * Extends laser after it has been shot
     */
    update() {
        this.step = new p5.Vector(this.speed * cos(this.angle),this.speed * sin(this.angle));
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        // if (this.time_alive >= 0) { this.time_alive--; }
        // else { this.x = -100; this.y = -100; }
        this.centerX = this.x + 56;
        this.centerY = this.y + 57;

        this.chunks.push(new Chunks(this.centerX, this.centerX));
    }
}

class Chunks{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    
    draw(){
        ellipse(0,0,25,25);
    }
}