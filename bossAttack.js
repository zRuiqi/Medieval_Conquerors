class BossAttack{
    /**
     * Boss class
     * @param {*} animation Animation sequence
     * @param {*} x Initial x-coordinate
     * @param {*} y Initial y-coordinate
     * @param {*} width Width of Boss
     * @param {*} height Height of Boss
     * @param {*} health Initial health of Boss
     */
    constructor(animation, x, y, width, height){
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
        this.start_index = 0;
        this.end_index = 4;
        this.frame = frameCount;
        this.count = 0;

        // Atk variables
        this.ATK_type = 0;

        // Attacking variables
        this.body_box = new p5.Vector(0,0);
        this.hit = false;
        this.hitFrame = frameCount;
        this.cooldown = 0;
        this.in_range_timer = 0;
        this.damage = 1;
        this.idle = true;
        // this.knockback_Frame = frameCount;

        // States
        this.currState = 0;
        this.dead = false;
    }


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
    }

    animate(attack_type){
        //Animate
        if(this.frame<(frameCount-5)){
            this.frame = frameCount;
            
            if(this.animation_index < this.end_index){
                this.animation_index ++;
            }
            else{
                this.animation_index=this.start_index;
            }

            // print("Index = ", this.animation_index);
        }

        // choose animation
        this.ATK_type = attack_type;
        switch(this.ATK_type){
            case 0:
                this.start_index = 1;
                this.end_index = 2
                break;
            // Swing Sword
            case 1:
                // print("swing");
                this.start_index = 3;
                this.end_index = 6;
                break;
            // Shoot Laser
            case 2:
                // print("shoot");
                this.start_index = 8;
                this.end_index = 14;
                break;
        }

        // Cool Down
    }

    update(boss_position, boss_direction){
        // update position
        this.position = boss_position;
        this.direction = boss_direction;

    }

}



