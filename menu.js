// Text box constants
const OPTIONS = ["Play Game",
                 "How to Play",
                 "Quit Game"];
const H_SCALE = 10;
const V_SCALE = 3;

class Menu {
    /**
     * Constructs the buttons and water for the menu screen
     */
    constructor() {
        this.width = (width / 40) * H_SCALE;
        this.height = (height / 40) * V_SCALE;
        this.play = new Box(
            width/2 - (this.width / 2),
            height/4 - (this.height / 2),
            this.width,
            this.height,
            OPTIONS[0],
            15
        ); // Create play button
        this.settings = new Box(
            width/2 - (this.width / 2),
            height/2 - (this.height / 2),
            this.width,
            this.height,
            OPTIONS[1],
            15
        ); // Create settings button
        this.quit = new Box(
            width/2 - (this.width / 2),
            3*height/4 - (this.height / 2),
            this.width,
            this.height,
            OPTIONS[2],
            15
        ); // Create quit button
        this.boxes = [this.play, this.settings, this.quit];
        // Create water in valley
        this.water = new Water();
        // Creates sky
        this.sky = images.makeOminousSky(width, height);
    }
    /**
     * Draws the main menu screen
     */
    draw() {
        background(135, 206, 235);

        // Drawing the mountain ranges
        image(this.sky, 0, 0, width, height);
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

        // Draw emblem behind boxes
        image(weapons.emblem, width/3.5, 0, (1.5*width)/3.5, height);

        // Draw the boxes
        this.play.draw();
        this.settings.draw();
        this.quit.draw();

        // Highlight boxes if necessary
        for (let i = 0; i < this.boxes.length; ++i) {
            let box = this.boxes[i];
            
            // Check if cursor is within bounds
            if (this.inBox(box)) { box.highlight(); }
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
}