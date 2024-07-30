class PowerUp {
    constructor(x, y, type) {
        // Positional properties
        this.x = x;
        this.y = y;
        this.size = 20;
        this.direction = -0.2;
        this.offset = 0;

        // Pickup properties
        this.type = type;
        this.time = 600;
    }
    draw() {
        imageMode(CENTER);
        switch(this.type) {
            // Health pack
            case 1:
                image(health_potion, this.x, this.y, this.size, this.size);
                break;
            // Speed boost
            case 2:
                image(speed_potion, this.x, this.y, this.size, this.size);
                break;
            // Strength boost
            case 3:
                image(strength_potion, this.x, this.y, this.size, this.size);
        }
        imageMode(CORNER);
        this.update();
        this.pickup();
    }
    update() {
        if (abs(this.offset) >= 5) { this.direction = -this.direction; }
        this.y += this.direction; 
        this.offset += this.direction;
    }
    pickup() {
        // Box for powerup
        let left = this.x - this.size;
        let right = this.x + this.size;
        let top = this.y - this.size;
        let bottom = this.y + this.size;

        // Player corners
        let p_left = player[1].position.x + 35;
        let p_right = player[1].position.x + 67;
        let p_top = player[1].position.y + 30;
        let p_bottom = player[1].position.y + 67;

        // Detect collision with player
        // Check for box collision
        if (((left <= p_right && left >= p_left) ||
            (right >= p_left && right <= p_right)) &&
            ((top >= p_top && top <= p_bottom) ||
            (bottom <= p_bottom && bottom >= p_top))) {
                player[1].boost_duration = this.time;
                player[1].boost_type = this.type;
                this.x = -200; this.y = -200;
                if (state == 7) { player[1].current_level.respawn_timer = 900; }
        }
    }
}