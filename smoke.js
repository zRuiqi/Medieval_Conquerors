class Smoke {
    constructor(posX, posY, radius) {
        this.x = posX;
        this.y = posY;
        this.radius = radius;
        this.plume1 = new p5.Vector(2, 3);
        this.plume2 = new p5.Vector(-1, 2);
        this.plume3 = new p5.Vector(1, 2);
        this.plume4 = new p5.Vector(-3, 3);
        this.plume5 = new p5.Vector(1, 1);

        this.color1 = new p5.Vector(60, 50);
        this.color2 = new p5.Vector(100, 100);
        this.color3 = new p5.Vector(75, 150);
        this.color4 = new p5.Vector(50, 200);
        this.color5 = new p5.Vector(85, 175);
    }
    draw() {
        // Smoke adjustments
        noStroke();

        this.color1.set(this.color1.x, this.color1.y-5);
        this.color2.set(this.color2.x, this.color2.y-5);
        this.color3.set(this.color3.x, this.color3.y-5);
        this.color4.set(this.color4.x, this.color4.y-5);
        this.color5.set(this.color5.x, this.color5.y-5);

        this.plume1.set(this.plume1.x, this.plume1.y - 0.5);
        this.plume2.set(this.plume2.x, this.plume2.y - 0.5);
        this.plume3.set(this.plume3.x, this.plume3.y - 0.5);
        this.plume4.set(this.plume4.x, this.plume4.y - 0.5);
        this.plume5.set(this.plume5.x, this.plume5.y - 0.5);

        if (this.color1.y <= 0) {
            this.plume1.set(-5, -0.2);
            this.color1.set(this.color1.x, 255);
        }
        if (this.color2.y <= 0) {
            this.plume2.set(0, -0.2);
            this.color2.set(this.color2.x, 255);
        }
        if (this.color3.y <= 0) {
            this.plume3.set(5, -0.2);
            this.color3.set(this.color3.x, 255);
        }
        if (this.color4.y <= 0) {
            this.plume4.set(2.5, -0.2);
            this.color4.set(this.color4.x, 255);
        }
        if (this.color5.y <= 0) {
            this.plume5.set(2.5, -0.2);
            this.color5.set(this.color5.x, 255);
        }
        
        let col1 = this.color1.x;
        fill(col1, col1, col1, this.color1.y);
        circle(this.x + this.plume1.x, this.y + this.plume1.y, this.radius);

        let col2 = this.color2.x;
        fill(col2, col2, col2, this.color2.y);
        circle(this.x + this.plume2.x, this.y + this.plume2.y, this.radius);

        let col3 = this.color3.x;
        fill(col3, col3, col3, this.color3.y);
        circle(this.x + this.plume3.x, this.y + this.plume3.y, this.radius);

        let col4 = this.color4.x;
        fill(col4, col4, col4, this.color4.y);
        circle(this.x + this.plume4.x, this.y + this.plume4.y, this.radius);

        let col5 = this.color5.x;
        fill(col5, col5, col5, this.color5.y);
        circle(this.x + this.plume5.x, this.y + this.plume5.y, this.radius);
    }
}