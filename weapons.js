class Weapons {
    /**
     * Constructs weapon drawings
     */
    constructor() {
        this.makeSword();
        this.makeShield();
        this.makeEmblem();
    }
    /**
     * Makes the emblem (displayed on the main menu)
     * out of weapons
     */
    makeEmblem() {
        clear();
        resizeCanvas(400, 400);
        let first_sword = this.makeSword();
        let second_sword = this.makeSword();
        clear();
        translate(width/2, height/2);
        image(this.shield, -width/2, -height/2, width, height);
        rotate(PI/4);
        image(first_sword, -width/4, -2*height/6, width/2, height/1.5);
        rotate(-PI/2);
        image(second_sword, -width/4, -2*height/6, width/2, height/1.5);
        this.emblem = get(0, 0, width, height);
    }
    /**
     * Makes a sword drawing
     * @returns 
     */
    makeSword() {
        clear();
        resizeCanvas(400, 800);
        background(255, 255, 255, 0);
        fill(200);
        strokeWeight(2);
        stroke('black');
        quad(width/2, 0,
            width/3, height/5,
            width/3, height/1.6,
            width/2, height/1.6);
        fill(100);
        quad(width/2, 0, 
            2*width/3, height/5,
            2*width/3, height/1.6,
            width/2, height/1.6);
        fill(74, 49, 24);
        rect(width/7, height/1.6, 5*width/7, height/15);
        let start = height/1.6 + height/15
        let radius = width/3.7
        stroke('black');
        circle(width/2, height/1.1, radius);
        noStroke();
        beginShape();
        vertex(width/2.5, start);
        bezierVertex(width/2.8, height/1.25,
                    width/2.8, height/1.25,
                    width/2.5, height/1.1);
        vertex(3*width/5, height/1.1);
        let end = width - width/2.8;
        bezierVertex(end, height/1.25,
                    end, height/1.25,
                    3*width/5, start);
        endShape();
        stroke('black');
        bezier(width/2.5, start,
                width/2.8, height/1.25,
                width/2.8, height/1.25,
                width/2.5, height/1.1);
        bezier(3*width/5, height/1.1,
                end, height/1.25,
                end, height/1.25,
                3*width/5, start);
        noStroke();
        circle(width/2, height/1.1, radius-2);
        this.sword = get(0, 0, width, height);
        return get(0, 0, width, height);
    }
    /**
     * Makes a shield drawing
     */
    makeShield() {
        clear();
        resizeCanvas(400, 400);
        background(255, 255, 255, 0);
        let inner_color = [164, 116, 73];
        let outer_color = 220;

        let inner = this.makeShieldOutline(inner_color);
        let outer = this.makeShieldOutline(outer_color);

        image(outer, 0, 0, width, height);
        image(inner, width/10, height/10, 8*width/10, 8*height/10);

        this.shield = get(0, 0, width, height);
    }
    /**
     * Draws an outline of the shield
     * @param {*} color Color of shield outline
     * @returns Outline of the shield
     */
    makeShieldOutline(color) {
        clear();
        background(255, 255, 255, 0);
        fill(color);
        beginShape();
        vertex(1, height/6);
        bezierVertex(width/6, height/7,
                    width/3, height/8,
                    width/2, 1);
        bezierVertex(2*width/3, height/8,
                    5*width/6, height/7,
                    width-1, height/6);
        bezierVertex(width-20, height/1.2,
                    7*width/8, height/1.4,
                    width/2, height-1);
        bezierVertex(width/8, height/1.4,
                    20, height/1.2,
                    1, height/6);
        endShape();

        return get(0, 0, width, height);
    }
}