class Player{
    /**
     * Controllable player class
     * @param {*} animation Animation array for drawings
     * @param {*} x Initial x-coordinate
     * @param {*} y Initial y-coordinate
     * @param {*} width Width of player
     * @param {*} height Height of player
     */
    constructor(animation, x, y, width, height){
      // Positional and size arguments for player
      this.position = new p5.Vector(x,y);
      this.width = width;
      this.height = height;
      this.velocity = new p5.Vector(2, 0.8);
      this.direction = 0;
      this.offsetX = 25;
      this.offsetY = 15;

      // Animation variables
      this.animation = animation;
      this.animation_index=4;
      this.start_index = 4;
      this.end_index = 10;
      this.frame = frameCount;

      // Attack variables
      this.attackFrame = frameCount;
      this.attackCD = 60;

      // Health and damage variables
      this.health = 10;
      this.max_health = 10;
      this.stamina = 30;
      this.max_stamina = 30;
      this.stamina_cost = 10;
      this.damage = 1;
      this.attack = false;
      this.attack_box = new p5.Vector(0,0);
      this.dead = false;
      this.current_level = null;
      this.bracing = false;

      // Boost variables
      this.boost_type = 0;
      this.boost_duration = 0;
      this.boost_outline = 'black';
    }
    
    // Deals with drawing the player
    draw(){
        // Facing Right
        if (this.direction === 0) {
        image(this.animation[this.animation_index], 
            this.position.x, this.position.y, 
            this.width, this.height);

            // Attack Detection box
            this.attack_box = new p5.Vector(this.position.x+this.width*2/3, this.position.y+this.height/2);
            // ellipse(this.attack_box.x, this.attack_box.y, 50,50);
        }

        // Facing left
        else {
            push();
            scale(-1, 1);
            image(this.animation[this.animation_index], 
                -this.position.x - this.width, this.position.y, 
                this.width, this.height);
            pop();

            // Attack Detection box
            this.attack_box = new p5.Vector(this.position.x+this.width/3, this.position.y+this.height/2);
        }
    }
    // Animates the player (swinging, moving)
    animate(){
      if(this.frame<(frameCount-5)){
        this.frame = frameCount;
        if(this.animation_index < this.end_index){
          this.animation_index ++;
        }
        else{
          this.animation_index=this.start_index;
        }
      }
    }
    /**
     * Moves the character
     * @param {*} boundXL Left bound
     * @param {*} boundXR Right bound
     * @param {*} boundYU Upper bound
     * @param {*} boundYD Lower bound
     */
    move(boundXL, boundXR, boundYU, boundYD){
        this.prevX = this.position.x;
        this.prevY = this.position.y;
        if (keyIsDown(SHIFT)) {
            this.bracing = true;
        } else { this.bracing = false; }
        if(keyIsDown(LEFT_ARROW) && !this.bracing){
            this.position.x -= this.velocity.x;
            this.direction = 1;
        }
        if(keyIsDown(RIGHT_ARROW) && !this.bracing){
            this.position.x += this.velocity.x;
            this.direction = 0;
        }
        if(keyIsDown(UP_ARROW) && !this.bracing){
            this.position.y -= this.velocity.y;
        }
        if(keyIsDown(DOWN_ARROW) && !this.bracing){
            this.position.y += this.velocity.y;
        }
        this.checkBoundaries(boundXL, boundXR,
                             boundYU, boundYD);

        // Spacebar Attack, cooldown 1s, stamina takes 1.5 seconds to recover
        if(keyIsDown(32) && !this.bracing && this.attackFrame < (frameCount - this.attackCD) && this.stamina > 0){
            this.start_index = 0;
            this.end_index = 3;
            this.attack = true;
            this.attackFrame = frameCount;
            if (this.stamina - this.stamina_cost < 0) { this.stamina = 0; }
            else { this.stamina -= this.stamina_cost; }
            this.stamina_recovery = 120;
        }
        if(this.animation_index === 3){
            this.attack = false;
        }
        if(this.attack === false){
            this.start_index = 4;
            this.end_index = 10;
        }
        if(this.health <= 0){
            this.start_index = 11;
            this.end_index = 15;
        }
        if(this.animation_index == 14){
            this.dead = true;
        }
        // Stamina decrement and recovery
        if (this.stamina_recovery > 0) { this.stamina_recovery--; }
        else if (this.stamina < this.max_stamina) { this.stamina++; }
        // Control statements for stamina
        if (this.stamina < 0) { this.stamina = 0; }
        if (this.stamina > this.max_stamina) { this.stamina = this.max_stamina; }

        // Power-up duration control
        this.boost();
        if (this.boost_duration <= 0) { this.boost_type = 0; }
        else { this.boost_duration--; }

    }

    // Start screen movement
    move_auto(){
        this.position.x += this.velocity.x;
        if(this.position.x>825){
          this.direction = 1;
          this.velocity.x = -this.velocity.x;
        }
        if(this.position.x<-100){
          this.direction = 0;
          this.velocity.x = -this.velocity.x;
        }
    }
    // Draws health bar
    healthBar() {
        // health bar
        if(this.health >= 0){
            stroke(this.boost_outline);
            strokeWeight(2);
            if (this.position.x - (width / 2) >= 0 && this.position.x + (width / 2) <= this.current_level.width) {
                // Outline of max health
                noFill();
                rect(this.position.x - (width / 2) + 20, 20, this.max_health*30, 10);

                // Fills the health bar
                fill('#990000');
                noStroke();
                rect(this.position.x - (width / 2) + 20, 20, this.health*30, 10);
            } else if (this.position.x + (width / 2) > this.current_level.width) {
                // Outline of max health
                noFill();
                rect(this.current_level.width - width + 20, 20, this.max_health*30, 10);

                // Fills the health bar
                fill('#990000');
                noStroke();
                rect(this.current_level.width - width + 20, 20, this.health*30, 10);
            } else {
                // Outline of max health
                noFill();
                rect(20, 20, this.max_health*30, 10);

                // Fills the health bar
                fill('#990000');
                noStroke();
                rect(20, 20, this.health*30, 10);
            }
        }
        // Stamina bar
        if (this.stamina >= 0) {
            stroke(0);
            if (this.position.x - (width / 2) >= 0 && this.position.x + (width / 2) <= this.current_level.width) {
                // Outline of max stamina
                noFill();
                rect(this.position.x - (width / 2) + 20, 35, this.max_stamina*4, 10);

                // Fills the stamina bar
                fill('#006611');
                noStroke();
                rect(this.position.x - (width / 2) + 20, 35, this.stamina*4, 10);
            } else if (this.position.x + (width / 2) > this.current_level.width) {
                // Outline of max stamina
                noFill();
                rect(this.current_level.width - width + 20, 35, this.max_stamina*4, 10);

                // Fills the stamina bar
                fill('#006611');
                noStroke();
                rect(this.current_level.width - width + 20, 35, this.stamina*4, 10);
            } else {
                // Outline of max stamina
                noFill();
                rect(20, 35, this.max_stamina*4, 10);

                // Fills stamina bar
                fill('#006611');
                noStroke();
                rect(20, 35, this.stamina*4, 10);
            }
        }
    }

    // Resets player health and position
    reset(){
        this.position.set(0, height/2 + 10);
        this.animation_index=4;
        this.start_index = 4;
        this.end_index = 10;
        this.dead = false;
        this.health = this.max_health;
        this.stamina = this.max_stamina;
    }

    /**
     * Checks the boundaries in which the player can move
     * @param {*} boundXL Left bound
     * @param {*} boundXR Right bound
     * @param {*} boundYU Upper bound
     * @param {*} boundYD Lower bound
     */
    checkBoundaries(boundXL, boundXR, boundYU, boundYD) {
        if (this.position.x < boundXL ||
            this.position.x + this.width > boundXR) { this.position.x = this.prevX; }
        if (this.position.y < boundYU ||
            this.position.y + this.height > boundYD) { this.position.y = this.prevY; }
    }

    /**
     * Boosts the player with whatever powerup was picked up
     */
    boost() {
        switch(this.boost_type) {
            case 0:
                this.damage = 1;
                this.velocity.set(2, 0.8);
                this.boost_outline = 'black';
                break;
            case 1:
                if (this.health + 3 > this.max_health) { this.health = 10; }
                else { this.health += 3; }
                this.boost_type = 0;
                this.boost_duration = 0;
                break;
            case 2:
                this.velocity.set(3.5, 1.4);
                this.damage = 1;
                this.stamina = this.max_stamina;
                this.boost_outline = 'green';
                break;
            case 3:
                this.velocity.set(2, 0.8);
                this.damage = 2;
                this.boost_outline = 'blue';
        }
    }
}