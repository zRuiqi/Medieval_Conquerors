class Fireball {
    /**
     * Fireball class for the wizard
     * @param {*} image 
     * @param {*} posX 
     * @param {*} posY 
     */
    constructor(image, x, y) {
        // Positional properties
        this.x = x;
        this.y = y;
        this.playerX = 0;
        this.playerY = 0;
        this.speed = 0;
        this.angle = 0;
        this.centerX = x + 56;
        this.centerY = y + 57;

        // Damage property
        this.damage = 1;
        this.time_alive = 120;

        // Image that represents the fireball
        this.image = image;
    }
    /**
     * Draws the fireball
     */
    draw() {
        //Draws the fireball according to initial angle
        push();
        translate(this.centerX, this.centerY);
        rotate(this.angle);
        image(this.image, -56, -57, 100, 100);
        pop();

        this.update();
    }
    /**
     * Moves the fireball after it has been shot
     */
    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        this.centerX = this.x + 56;
        this.centerY = this.y + 57;
        this.detectPlayerCollision();
        if (this.time_alive == 1) { player[1].current_level.smoke.push(new Smoke(this.centerX, this.centerY, 10)); }
        if (this.time_alive >= 0) { this.time_alive--; }
        else { this.x = -100; this.y = -100; }
    }
    /**
     * Detects if the fireball hits the specified player
     * @param {} player 
     */
    detectPlayerCollision() {
        // Fireball corners
        let left = this.x + 42;
        let right = this.x + 64;
        let top = this.y + 48;
        let bottom = this.y + 65;

        // Player corners
        let p_left = player[1].position.x + 35;
        let p_right = player[1].position.x + 67;
        let p_top = player[1].position.y + 30;
        let p_bottom = player[1].position.y + 67;

        // Check for box collision
        if (((left <= p_right && left >= p_left) ||
            (right >= p_left && right <= p_right)) &&
            ((top >= p_top && top <= p_bottom) ||
            (bottom <= p_bottom && bottom >= p_top))) {
                if (!player[1].bracing || player[1].stamina == 0) { player[1].health -= this.damage; }
                else { player[1].stamina -= 1; player[1].stamina_recovery = 60; }
                this.x = -100; this.y = -100;
                this.speed = 0;
        }
    }
}