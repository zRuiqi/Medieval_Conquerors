class Box {
    /**
     * Box for displaying options in main menu.
     * @param {*} posX X-coordinate of text box
     * @param {*} posY Y-coordinate of text box
     * @param {*} width Width of text box
     * @param {*} height Height of text box
     * @param {*} text Text displayed in box
     * @param {*} fontSize Font size of text
     */
    constructor(posX, posY, width, height, text, fontSize) {
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.text = text;
        this.size = fontSize;
    }
    /**
     * Draws the box on screen
     */
    draw() {
        fill(0);
        noStroke();
        rect(this.x, this.y,
            this.width, this.height);

        noFill();
        stroke('yellow');
        textSize(this.size);
        textAlign(CENTER);
        text(this.text,
             this.x, this.y + (this.height/4),
             this.width, this.height);
    }
    /**
     * Highlights the box with a white glow if the user
     * hovers over it with the cursor.
     */
    highlight() {
        for (let i = 0; i < 5; ++i) {
            noFill();
            stroke(255, 255, 255, 175-i*25);
            rect(this.x-i,
                 this.y-i,
                 this.width+(i*2),
                 this.height+(i*2));
        }
    }
}