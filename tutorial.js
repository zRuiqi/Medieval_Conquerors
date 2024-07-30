class Tutorial {
    /**
     * Technically, the "first" level of the game
     */
    constructor() {
        // Create player
        player[1].position.set(0, height/2 + 10);
        // Create water in valley
        this.water = new Water();
        // Variable to control message in tutorial
        this.guide_number = 1;
        this.width = width;
    }
    /**
     * Draws tutorial screen, including bridge, castle, landscape,
     * ground, player, enemy, and water.
     */
    draw() {
        background(135, 206, 235);

        // Drawing the mountain ranges
        image(menu.sky, 0, 0, width, height);
        image(images.landscape, 0, 0, width, height);

        // Draw ground and bridge
        noStroke();
        fill('green');  // Grass
        rect(0, height/1.5, width/3, height/2.5);
        rect(width/1.5, height/1.5, width/3, height/2.5);
        fill(58, 51, 29); // Dirt
        rect(0, height/1.3, width/3, height/2.5);
        rect(width/1.5, height/1.3, width/3, height/2.5);
        fill(128, 101, 23); // Bridge across valley
        for (let i = 0; i < 30; ++i) {
            if (i % 2 == 0) { 
                rect(width/3 - 10 + i*10, height/1.5+5,
                    10, 40);
            }
        }
        strokeWeight(2);
        stroke('black');
        line(width/3 - 5, height/1.5+10,
             2*width/3 + 5, height/1.5+10);
        line(width/3 - 5, height/1.5+40,
            2*width/3 + 5, height/1.5+40);

        // Draw water
        this.water.draw();

        // Drawing castle wall on right side of canyon
        image(images.castleWall, width/1.3, -height/8, 0.4*width/1.4, 6.5*height/8);

        // Draw Enemy
        let tutorial_enemy = enemy[0];
        tutorial_enemy.draw();
        tutorial_enemy.animate();
        if (!tutorial_enemy.dead) { tutorial_enemy.update(); }

        // If the player enter the castle, go to level 1
        if (player[1].position.x >= width/1.3+20 && enemy[0].dead) { 
            state = 5;
            enemy = [];
            player[1].health = 10;
            // Create player
            player[1].position.set(100, height/2 + 10);
            levels[0].initializeEnemies();
        }

        if (player[1].dead == true) { 
            state = 0;
            player[1].reset();
        }

        // Write how to go back to main menu
        let back = "Press ESC to go back to main menu";
        noStroke();
        fill('red');
        textSize(18);
        text(back, width/10, height/1.2, width/8, height/8);

        // Animate and update player
        player[1].draw();
        player[1].animate();
        player[1].move(0, player[1].width + width/1.3+30, 
                    height/2 + 10, player[1].height + height/2+30);
        player[1].current_level = this;
        player[1].healthBar();

        // Writes tip at top of screen
        this.guide();
    }
    guide() {
        switch(this.guide_number) {
            case 1:
                // Tells player how to move
                noFill();
                textSize(32);
                stroke('yellow');
                let first = "Use Arrow Keys to Move.";
                textAlign(CENTER);
                text(first, 0, height/8, width, height/8);
                textSize(14);
                noStroke();
                
                // Move to next tip when player moves using arrow keys
                if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) ||
                    keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) { this.guide_number = 2; }
                break;
            case 2:
                // Tells the player how to press space bar
                noFill();
                textSize(32);
                stroke('yellow');
                let second = "Press Space Bar to Attack.";
                textAlign(CENTER);
                text(second, 0, height/8, width, height/8);
                textSize(14);
                noStroke();

                // Move to next tip when player presses space bar
                if (keyIsDown(32)) { this.guide_number = 3; }
                break;
            case 3:
                // Instructs player to kill the enemy
                noFill();
                textSize(32);
                stroke('yellow');
                let third = "Kill the Enemy!";
                textAlign(CENTER);
                text(third, 0, height/8, width, height/8);
                textSize(14);
                noStroke();
                // Once the enemy is dead, tell player to move to level 1
                if (enemy[0].dead) { this.guide_number = 4; }
                break;
            case 4:
                // Instructs player to kill the enemy
                noFill();
                textSize(32);
                stroke('yellow');
                let fourth = "Proceed to Next Level.";
                textAlign(CENTER);
                text(fourth, 0, height/8, width, height/8);
                textSize(14);
                noStroke();
        }
    }
}