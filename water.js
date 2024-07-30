class Water {
  /**
   * Water class
   */
    constructor() {
      this.r = width / 3; //width of rock
      this.x = (width / 6) + this.r; //x position is relative to the rock's x
      this.y = height - height / 8; //ycoord
      this.endX = (width - width / 6) - width / 6; //where rock ends
      this.xoff = 0;
      this.yoff = 0;
    }
    /**
     * Draws the water in the ravine
     */
    draw() {
      fill(100,200,255,200);
      noStroke();
      
      beginShape();
  
      this.xoff = 0; //initialize x. 
      
      //iterate through x position of the water. 
      for (var x = this.x - (this.r / 2); x <= this.endX; x += 5) {
          var y = map(noise(this.xoff, this.yoff), 0, 1, height, height - (height / 10));
  
          vertex(x, y); //draw the top of the polygon. 
          this.xoff += 0.05; //increment to get a different value from noise. 
      }
  
      this.yoff += 0.03; //increment to get a different value from noise.
      vertex(this.endX, height); //lower left of water. 
      vertex(this.x - (this.r / 2), height); //lower right of water. 
      endShape(CLOSE);
    }
  }