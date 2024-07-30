class Slime{
    /**
     * Enemy class
     * @param {*} animation Animation sequence
     * @param {*} x Initial x-coordinate
     * @param {*} y Initial y-coordinate
     * @param {*} width Width of enemy
     * @param {*} height Height of enemy
     * @param {*} health Initial health of enemy
     */
    constructor(animation, x, y, width, height, health){
        // Positional and size variables
        this.position = new p5.Vector(x, y);
        this.width = width;
        this.height = height;
        this.velocity = new p5.Vector(1, 0.8);
        this.step = new p5.Vector(0, 0);
        this.direction = 0;
        this.offsetX = 25;
        this.offsetY = 15;

        // Animation variables
        this.animation = animation;
        this.animation_index=2;
        this.start_index = 2;
        this.end_index = 7;
        this.frame = frameCount;
        this.count = 0;

        // Attacking variables
        this.body_box = new p5.Vector(0,0);
        this.hit = false;
        this.health = health;
        this.hitFrame = frameCount;
        this.cooldown = 0;
        this.in_range_timer = 0;
        this.damage = 1;
        this.idle = true;
        this.step = new p5.Vector(0, 0);

        // States
        this.currState = 0;
        this.dead = false;

        // Potential powerup drop
        this.drop = null;
    }

    /**
     * Draws the enemy on screen
     */
    draw(){
        // Facing right
        if (this.direction === 0) {
            image(this.animation[this.animation_index], 
                this.position.x, this.position.y, 
                this.width, this.height);
            }
    
        // Facing left
        else {
            push();
            scale(-1, 1);
            image(this.animation[this.animation_index], 
                -this.position.x - this.width, this.position.y, 
                this.width, this.height);
            pop();
        }

        // Detect body box
        this.body_box = new p5.Vector(this.position.x+this.width/2, this.position.y+this.height/2);

        // health bar
        if(this.health !== 0){
            stroke(0);
            strokeWeight(1);
            fill('#66ff66');
            rect(this.position.x+25, this.position.y, this.health*10, 4);
        }

        // Draws the powerup if present
        if (this.drop !== null) { this.drop.draw(); }
    }
    
    /**
     * Updates the enemy's position, attacks player if in range,
     * removes from idle mode if necessary, and detects player
     * attack collision
     */
    update() {
        // If the enemy is off cooldown and in range for
        // at least half a second, attacks the player.
        if (this.cooldown <= 0 && this.in_range_timer > 30 && this.health > 0) {
            if (!player[1].bracing || player[1].stamina == 0) { player[1].health -= this.damage; }
            else { player[1].stamina -= 7; player[1].stamina_recovery = 60; }
            this.cooldown = 60;
            this.in_range_timer = 0;
        }

        // Detect if enemy is in range of player
        if (this.inRange()) { this.in_range_timer++; }
        else { 
            this.in_range_timer = 0;
            if (!this.idle) { 
                if(this.health > 0){
                    this.chasePlayer(); 
                }
                else{
                    if (this.dead == false) { this.drop_powerup(); }
                    this.enemyDie()
                }
            }       
        }
        this.cooldown--;

        // Removes enemy from idle mode to chase and attack player
        if (dist(player[1].position.x, player[1].position.y, 
                 this.position.x, this.position.y) < 600) { this.idle = false; }

        this.attack_collision();

        // Find the heading so the wizard can shoot fireballs
        this.step.set(player[1].position.x - this.position.x,
            player[1].position.y - this.position.y);
        this.angle = this.step.heading();

        // Rotates enemy toward direction of player
        if (this.angle < 0) { this.angle += TWO_PI; }
        if (this.angle >= 3 * HALF_PI || this.angle < HALF_PI) { this.direction = 0; }
        else { this.direction = 1;}
    }

    /**
     * Animation sequence for when enemy dies
     */
    enemyDie(){
        this.dead = true;
        this.health = 0;
        this.velocity = new p5.Vector(0,2);
        if(this.count<10){
            if(this.position.y < 250){
                this.position.add(this.velocity);
                this.count++;
            }
        }
    }

    /**
     * Animate enemy when it's alive
     */
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

        // choose hit animation / normal animation
        if(this.hit === true && !this.dead){
            this.start_index = 8;
            this.end_index = 9;
        }
        else if (!this.dead){
            this.start_index = 2;
            this.end_index = 7;
        }
    }

    /**
     * Player attack collision
     */
    attack_collision(){
        // distance: player sword --- enemy body
        let distance = player[1].attack_box.dist(this.body_box);
        if(this.health !== 0 && !this.dead){
            if(distance < 60 && player[1].attack === true && this.hitFrame < (frameCount-25)){
                this.hit = true;
                this.hitFrame = frameCount;
                this.health -= player[1].damage;
            }
            if(this.animation_index === 9){
                this.hit = false;
            }
            if(this.attack === false){
                this.start_index = 2;
                this.end_index = 7;
            }
        }
        else{
            this.start_index = 0;
            this.end_index = 0;
        }
    }

    /**
     * Movement for starting screen
     */
    move_auto(){
        this.position.x += this.velocity.x*2;
        if(this.position.x>825){
          this.direction = 1;
          this.velocity.x = -this.velocity.x;
        }
        if(this.position.x<-100){
          this.direction = 0;
          this.velocity.x = -this.velocity.x;
        }
        this.health = 0;
    }
    /**
     * Chases player when the enemy is no longer idle
     */
    chasePlayer() {
        this.step.set(player[1].position.x - this.position.x, 
                      player[1].position.y - this.position.y);
        this.step.normalize();
        this.angle = this.step.heading() + HALF_PI;
        this.position.set(this.position.x + this.step.x*this.velocity.x,
                          this.position.y + this.step.y*this.velocity.y);
    }


    /**
     * Check if the enemy is in range to attack or not
     * @returns If enemy is in range for attacking
     */
    inRange() {
        // Enemy corners
        let right = this.position.x + this.width - this.offsetX;
        let bottom = this.position.y + this.height - this.offsetY;
        let left = this.position.x + this.offsetX;
        let top = this.position.y + this.offsetY;
        
        // Player corners
        let p_right = player[1].position.x + player[1].width - player[1].offsetX;
        let p_bottom = player[1].position.y + player[1].height - player[1].offsetY;
        let p_left = player[1].position.x + player[1].offsetX;
        let p_top = player[1].position.y + player[1].offsetY;
        if (((left < p_right && left > p_left) ||
             (right < p_right && right > p_left)) &&
            ((top > p_top && top < p_bottom) ||
              (bottom > p_top && bottom < p_bottom))) {
                  return true;
        }
        return false;
    }

    /**
     * Potentially drops a powerup upon death
     */
     drop_powerup() {
        let prob = random(10);
        if (prob <= 5) {
            let type = round(random(1, 4));
            this.drop = new PowerUp(this.position.x + 45, this.position.y + 50, type);
        }
    }
}
