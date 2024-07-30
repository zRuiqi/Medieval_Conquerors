class Boss{
    /**
     * Boss class
     * @param {*} animation Animation sequence
     * @param {*} x Initial x-coordinate
     * @param {*} y Initial y-coordinate
     * @param {*} width Width of Boss
     * @param {*} height Height of Boss
     * @param {*} health Initial health of Boss
     */
    constructor(animation, ATK_animation, x, y, width, height, health){
        // Positional and size variables
        this.position = new p5.Vector(x, y);
        this.width = width;
        this.height = height;
        this.velocity = new p5.Vector(1, 0.8);
        this.step = new p5.Vector(0, 0);
        this.angle = 0;
        this.direction = 0;
        this.offsetX = 55;
        this.offsetY = 35;

        // Animation variables
        this.animation = animation;
        this.animation_index=2;
        this.start_index = 0;
        this.end_index = 4;
        this.frame = frameCount;
        this.count = 0;
        
        

        // Attacking variables
        this.ATK_type = 0;
        this.body_box = new p5.Vector(0,0);
        this.hit = false;
        this.health = health;
        this.hitFrame = frameCount;
        this.atkFrame = frameCount;
        this.cooldown = 0;
        this.in_range_timer = 0;
        this.damage = 0.2;
        this.idle = true;
        this.laserCD = 0;
        this.laser = new Laser(x,y);

        // States
        this.currState = 0;
        this.dead = false;
        this.ATK = new BossAttack(ATK_animation, x, y, width, height);
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
            rect(this.position.x+25, this.position.y, this.health*2, 4);
        }


        //Draw Attacks
        if(!this.dead){
            this.ATK.draw();
            this.ATK.animate(this.ATK_type);
            this.ATK.update(this.position, this.direction);
        }
    }
    
    /**
     * Updates the enemy's position, attacks player if in range,
     * removes from idle mode if necessary, and detects player
     * attack collision
     */
    update() {
        // detect direction
        if(this.step.x < 0 ){
            this.direction = 0;
        }else{
            this.direction = 1;
        }

        // Find the heading so the boss can shoot laser
        this.step.set(player[1].position.x - this.position.x,
            player[1].position.y - this.position.y);
        this.angle = this.step.heading();
        

        // If the boss is off cooldown and in range for
        // at least half a second, attacks the player[1] with sword.
        if (this.cooldown <= 0 && this.in_range_timer > 10) {
            if (!player[1].bracing || player[1].stamina == 0) { player[1].health -= this.damage; }
            else { player[1].stamina -= 1; player[1].stamina_recovery = 60;}
            this.cooldown = 30;
            this.in_range_timer = 0;
        }

        // Detect if enemy is in range of player[1]
        if (this.inRange()) { 
            this.ATK_type = 1;
            this.in_range_timer++; 
        }
        else { 
            // Fire Laser when out of Range
            this.in_range_timer = 0;
            if (!this.idle) { 
                if(this.health !== 0){

                    // Stop every 3 second to fire
                    if(this.atkFrame <= (frameCount-180)){
                        this.ATK_type = 2;
                        this.atkFrame = frameCount;
                        this.laserCD = 0;
                        this.ATK.animation_index = 8;
                        // print("laser !");
                        
                    }
                    // Fire Laser
                    if(this.ATK_type == 2){ 
                        this.laser.draw();
                        // if (this.laser.time_alive <= 0){ this.shoot();}
                        this.shoot();
                        this.laserCD++;
                        if (!player[1].bracing || player[1].stamina == 0) { player[1].health -= this.damage/40; }
                        else { player[1].stamina -= 0.1; player[1].stamina_recovery = 60;}
                    }
                    
                    // Chase when not firing
                    if(this.laserCD >= 60){
                        this.ATK_type = 0;
                        this.chasePlayer(); 
                        // print("chase!");
                    }

                }
                else{
                    this.enemyDie();
                }
            }       
        }
        this.cooldown--;

        // Removes enemy from idle mode to chase and attack player
        if (dist(player[1].position.x, player[1].position.y, 
                 this.position.x, this.position.y) < 600) { this.idle = false; }

        this.takeDamage_collision();

    }

    /**
     * Animation sequence for when enemy dies
     */
    enemyDie(){
        this.dead = true;
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
            this.start_index = 5;
            this.end_index = 6;
        }
        else if (!this.dead){
            this.start_index = 0;
            this.end_index = 4;
        }
    }

    /**
     * Player attack collision
     */
    takeDamage_collision(){
        // distance: player sword --- enemy body
        let distance = player[1].attack_box.dist(this.body_box);
        if(this.health !== 0 && !this.dead){
            if(distance < 80 && player[1].attack === true && this.hitFrame < (frameCount-25)){
                this.hit = true;
                this.hitFrame = frameCount;
                // print("hit!");
                this.health--;
            }
            if(this.animation_index === 6){
                this.hit = false;
            }
            if(this.attack === false){
                this.start_index = 0;
                this.end_index = 4;
            }
        }
        else{
            this.start_index = 8;
            this.end_index = 8;
        }
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
        let right = this.position.x + this.width - this.offsetX;
        let bottom = this.position.y + this.height - this.offsetY;
        let left = this.position.x + this.offsetX;
        let top = this.position.y + this.offsetY;
        let p_right = player[1].position.x + player[1].width - player[1].offsetX;
        let p_bottom = player[1].position.y + player[1].height - player[1].offsetY;
        let p_left = player[1].position.x + player[1].offsetX;
        let p_top = player[1].position.y + player[1].offsetY;

        ellipse(left,top,3,3);
        ellipse(right,top,3,3);
        ellipse(left,bottom,3,3);
        ellipse(right,bottom,3,3);

        if (((left < p_right && left > p_left) ||
             (right < p_right && right > p_left)) &&
            ((top > p_top && top < p_bottom) ||
              (bottom > p_top && bottom < p_bottom))) {
                  return true;
        }
        return false;
    }

    /**
     * Shoots Laser
     */
     shoot() {
        this.laser.x = this.position.x;
        this.laser.y = this.position.y;
        this.laser.direction = this.direction;
        this.laser.angle = this.angle;
        this.laser.speed = 3;
        let distance = dist(this.position.x, this.position.y, player[1].position.x, player[1].position.y);
        this.laser.chunkCount = int(distance/10);
        // this.laser.time_alive = 120;

    }
}