class Instructions {
    constructor() {
        // Create water in valley
        this.water = new Water();

        // Variable to control what instructions the user is viewing
        this.slide = 1;

        // Buttons to change instruction slides
        this.leftArrow = new Box(200, 350, 50, 30, "", 0);
        this.rightArrow = new Box(550, 350, 50, 30, "", 0);
        this.instructions_box = new Box(width/3, height/10, width/3, height/1.35, "", 0);
    }
    /**
     * Draws the instruction screen
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
        this.writeRules();

        // Write how to go back to main menu
        let back = "Press ESC to go back to main menu";
        noStroke();
        fill('red');
        textSize(18);
        text(back, width/2.27, height/1.15, width/8, height/8);
    }
    /**
     * Writes the instructions for the game
     */
    writeRules() {
        this.instructions_box.draw();
        this.instructions_box.highlight();
        switch(this.slide) {
            case 1:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Controls";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let controls = "You can move left and right using the respective arrow keys. You can swing your weapon by pressing space bar. However, the enemies can fight back. If you run out of health, the game is over. You can mediate damage by bracing with shift, but getting hit while bracing drains your stamina.";
                text(controls, width/3, height/4, width/3, height/1.4);

                // Draws right scroll arrow
                this.rightArrow.draw();
                this.drawArrow('right');

                // Highlights box if cursor is hovering over it
                if (this.inBox(this.rightArrow)) { this.rightArrow.highlight(); }
                break;
            case 2:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Objective";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let objective = "The boss has forcefully taken your land and your king has ordered you to take it all back! Kill all of the enemies to progress to the next level. The primary goal is to defeat the boss and claim your land back!";
                text(objective, width/3, height/4, width/3, height/1.4);

                // Draws left scroll arrow
                this.leftArrow.draw();
                this.drawArrow('left');

                // Draws right scroll arrow
                this.rightArrow.draw();
                this.drawArrow('right');

                // Highlights the appropriate boxes
                if (this.inBox(this.leftArrow)) { this.leftArrow.highlight(); }
                if (this.inBox(this.rightArrow)) { this.rightArrow.highlight(); }
                break;
            case 3:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Enemies";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let enemies = "There are different types of enemies. One likes to get up close and personal and the other likes to fire from long range. However, he is not afraid to take close range engagements.";
                text(enemies, width/3, height/4, width/3, height/1.4);

                // Draws left scroll arrow
                this.leftArrow.draw();
                this.drawArrow('left');

                // Draws right scroll arrow
                this.rightArrow.draw();
                this.drawArrow('right');

                // Highlights the appropriate boxes
                if (this.inBox(this.leftArrow)) { this.leftArrow.highlight(); }
                if (this.inBox(this.rightArrow)) { this.rightArrow.highlight(); }
                break;
            case 4:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Progression";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let progression = "In order to move onto the next level, you must defeat all the enemies and go through the castle doorway. There are three levels, including the final boss stage. Once you go forward, you cannot go back!";
                text(progression, width/3, height/4, width/3, height/1.4);

                // Draws left scroll arrow
                this.leftArrow.draw();
                this.drawArrow('left');

                // Draws right scroll arrow
                this.rightArrow.draw();
                this.drawArrow('right');

                // Highlights the appropriate boxes
                if (this.inBox(this.leftArrow)) { this.leftArrow.highlight(); }
                if (this.inBox(this.rightArrow)) { this.rightArrow.highlight(); }
                break;
            case 5:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Power-Ups";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let powerups = "There are 3 different types of power-ups: health, speed/stamina, and strength. These power-ups can be randomly dropped by the enemies and can be picked up. The red is the health potion, the green is the speed potion, and the blue is the strength potion. You can only have one power-up at a time. Any timed power-up (speed and strength) will outline the health bar as an indication.";
                text(powerups, width/3, height/4, width/3, height/1.4);

                // Draws left scroll arrow
                this.leftArrow.draw();
                this.drawArrow('left');

                // Draws right scroll arrow
                this.rightArrow.draw();
                this.drawArrow('right');

                // Highlights the appropriate boxes
                if (this.inBox(this.leftArrow)) { this.leftArrow.highlight(); }
                if (this.inBox(this.rightArrow)) { this.rightArrow.highlight(); }
                break;
            case 6:
                // Title of the slide
                noFill();
                textSize(32);
                stroke('yellow');
                var title = "Health/Stamina";
                textAlign(CENTER);
                text(title, 0, height/8, width, height/8);
                textSize(16);
                noStroke();

                // Writes the specified instructions on screen
                fill('white');
                let bars = "Your health and stamina bar are on the top left of the screen. Your health does not regenerate unless a health potion is retrieved. With every swing of the sword, your stamina decreases. However, your stamina does regenerate after a period of time.";
                text(bars, width/3, height/4, width/3, height/1.4);

                // Draws left scroll arrow
                this.leftArrow.draw();
                this.drawArrow('left');

                // Highlights the appropriate boxes
                if (this.inBox(this.leftArrow)) { this.leftArrow.highlight(); }
        }
    }
    /**
     * Check if cursor is within the box
     * @param {*} box Box to check
     * @returns Whether or not the cursor is in the provided box
     */
     inBox(box) {
        if (mouseX >= box.x && mouseX <= box.x + box.width &&
            mouseY >= box.y && mouseY <= box.y + box.height) {
                return true;
        }
        return false;
    }
    /**
     * Draws an arrow in the specified direction
     * @param {*} direction Direction arrow is pointing
     */
    drawArrow(direction) {
        // 1 = 200, 350; 2 = 550, 350; w = 50, h = 30
        if (direction == 'left') {
            stroke('yellow');
            line(208, 365, 245, 365);
            line(205, 365, 220, 357);
            line(205, 365, 220, 373);
        }
        else {
            stroke('yellow');
            line(593, 365, 555, 365);
            line(595, 365, 580, 357);
            line(595, 365, 580, 373);
        }
    }
}