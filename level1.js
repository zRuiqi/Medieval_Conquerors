class Level_1 {
    /**
     * First level of the game
     * @param {*} w Width of the first level
     */
    constructor(w) {
        this.width = w;
        // Create background landscape and battlefield
        this.smoke = [];
        this.createLandscape();
        this.createBattlefield();
        // Create enemies for the level
        this.enemies = [];
        this.initializeEnemies();
        // Creates sky
        this.sky = images.makeOminousSky(w, height);
    }
    /**
     * Creates landscape scenery for the level
     */
    createLandscape() {
        clear();
        resizeCanvas(this.width, 400);
        background(255, 255, 255, 0);

        // Create mountain variables
        this.ridges = [];
        let ranges = 3;
        let intervals = width / 10;
        let rangeDiff = height / 10;
        let ruggedness = 0.025;
        let a = random(1500);

        // Create mountain ranges
        for (let i = 0; i < ranges; ++i) {
            let ridge = [];
            for (let j = 0; j <= intervals; ++j) {
                var n = noise(a);
                ridge.push(map(n, 0, 1, 0, height - i*rangeDiff));
                a += ruggedness;
            }
            this.ridges.push(ridge);
        }

        // Drawing mountains
        let blueScale = 10;
        let baseBlue = 50;
        let greenScale = 35;
        let baseGreen = 150;
        for (let i = 0; i < ranges; ++i) {
            for (let j = 0; j <= intervals; ++j) {
                // Color of each level
                fill(0, baseGreen - i*greenScale, baseBlue - i*blueScale);
                noStroke();

                // Drawing each quad that belongs to that mountain
                let w = width / intervals;
                quad(j * w, this.ridges[i][j] + i * rangeDiff,           // Top left
                    (j + 1) * w, this.ridges[i][j + 1] + i * rangeDiff,  // Top right
                    (j + 1) * w, height,                            // Bottom right
                     j * w, height);                                // Bottom left
            }
        }

        this.landscape = get(0, 0, width, height);
        clear();
        resizeCanvas(800, 400);
    }
    /**
     * Creates battlefield that the player and enemy will fight on
     */
    createBattlefield() {
        clear();
        resizeCanvas(8000, 400);
        background(255, 255, 255, 0);

        // Create battlefield 
        fill(131, 101, 57);
        rect(0, 2*height/3, width, height);
        fill(70, 32, 9);
        rect(0, 9*height/10, width, height);

        this.battlefield = get(0, 0, width, height);
        clear();
        resizeCanvas(800, 400);

        // Create smoke on the battlefield
        this.smoke.push(new Smoke(600, 350, 25));
    }
    /**
     * Initializes enemies in first level
     */
    initializeEnemies() {
        let num = 14;
        this.enemies = [];
        for (let i = 2; i < num; i += 2) {
            this.enemies.push(new Slime(animation_slime, i * 300, 220, 80, 80, 3));
            this.enemies.push(new Slime(animation_slime, i * 300 + 50, 300, 80, 80, 3));
        }
    }
    /**
     * Draws the first level and calls necessary
     * player and enemy functions.
     */
    draw() {
        background(135, 206, 235);
        // Changes the placement of the screen relative to the position of the character
        if (player[1].position.x - (width / 2) >= 0 && player[1].position.x + (width / 2) <= this.width) {
            translate(-player[1].position.x + width / 2, 0);
        } else if (player[1].position.x + (width / 2) > this.width) {
            translate(-this.width+(width), 0);
        }

        // Draw sky, landscape and battlefield
        image(this.sky, 0, 0, this.width, height);
        image(this.landscape, 0, 0, this.width, height);
        image(this.battlefield, 0, 0, this.width, height);

        // Draw castles to go between tutorial and other levels
        image(images.castleWall, 3800, -height/8, 0.4*width/1.4, 6.5*height/8);
        push();
        scale(-1, 1);
        image(images.castleWall, -200, -height/8, 0.4*width/1.4, 6.5*height/8);
        pop();
        // Player goes into one of the castles
        if (player[1].position.x >= 3830 &&
            player[1].position.y <= 250 && this.enemiesDead()) { 
            state = 6;
            player[1].health = 10;
            // Create player
            player[1].position.set(100, height/2 + 10);
            levels[1].initializeEnemies();
        }
        
        // If player has no health
        if (player[1].dead == true) {
            state = 0;
            player[1].reset();
        }

        // Draw Enemy
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].draw();
            this.enemies[i].animate();
            if (this.enemies[i].dead) continue;
            this.enemies[i].update();
        }
        // Draw smoke plumes
        for (let i = 0; i < this.smoke.length; ++i) {
            this.smoke[i].draw();
        }
        // Animate and update player
        // Draw Player
        player[1].draw();
        player[1].animate();
        player[1].current_level = this;
        player[1].healthBar();
        player[1].move(0, player[1].width + this.width/1.05+30, 
                    height/2 + 10, height - 15);
    }
    /**
     * Checks if all the enemies are dead
     */
    enemiesDead() {
        for (let i = 0; i < this.enemies.length; ++i) {
            let enemy = this.enemies[i];
            if (enemy.dead) { continue; }
            return false;
        }
        return true;
    }
}