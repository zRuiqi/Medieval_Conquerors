class Images {
    /**
     * Makes still images in the game
     */
    constructor() {
        this.makeMountains();
        this.makeCastleWall();
    }
    /**
     * Creates landscape scenery
     */
    makeMountains() {
        clear();
        resizeCanvas(800, 400);
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
    }
    /**
     * Creates an ominous looking sky
     * @param {} w
     * @param {} h
     */
    makeOminousSky(w, h) {
        clear();
        resizeCanvas(w, h);
        background(255, 255, 255, 0);

        // Drawing the sky
        let n1 = random(1500);
        for (var x = 0; x <= w; x += 2) {
            var n2 = 0;
            for (var y = 0; y <= h; y += 2) {
                var c = map(noise(n1,n2),0,1,0,255);
                fill(c + 80, c + 40, c, 150);
                rect(x, y, 4, 2);
                n2 += 0.05; // step size in noise
            }
            n1 += 0.02; // step size in noise
        }
        let sky =  get(0, 0, w, h);
        resizeCanvas(800, 400);
        return sky;
    }
    /**
     * Makes the castle wall that transports player between levels
     */
    makeCastleWall() {
        clear();
        resizeCanvas(400, 400);
        background(255, 255, 255, 0);
        fill(220);
        stroke('black');
        let brick_width = 40;
        let brick_height = 25;
        
        // Bottom Layer i = 1
        rect(100, height-brick_height, brick_width, brick_height);
        rect(140, height-brick_height, brick_width, brick_height);
        rect(180, height-brick_height, brick_width, brick_height);
        rect(220, height-brick_height, brick_width, brick_height);
        rect(260, height-brick_height, brick_width, brick_height);
        rect(300, height-brick_height, brick_width, brick_height);
        rect(340, height-brick_height, brick_width, brick_height);
        rect(380, height-brick_height, brick_width/2, brick_height);
        // Next layer i = 2
        rect(100, height-2*brick_height, brick_width/2, brick_height);
        rect(120, height-2*brick_height, brick_width, brick_height);
        rect(160, height-2*brick_height, brick_width, brick_height);
        rect(200, height-2*brick_height, brick_width, brick_height);
        rect(240, height-2*brick_height, brick_width, brick_height);
        rect(280, height-2*brick_height, brick_width, brick_height);
        rect(320, height-2*brick_height, brick_width, brick_height);
        rect(360, height-2*brick_height, brick_width, brick_height);
        // Next layer i = 3
        rect(100, height-3*brick_height, brick_width, brick_height);
        rect(140, height-3*brick_height, brick_width, brick_height);
        rect(180, height-3*brick_height, brick_width, brick_height);
        rect(220, height-3*brick_height, brick_width, brick_height);
        rect(260, height-3*brick_height, brick_width, brick_height);
        rect(300, height-3*brick_height, brick_width, brick_height);
        rect(340, height-3*brick_height, brick_width, brick_height);
        rect(380, height-3*brick_height, brick_width/2, brick_height);
        // Next layer i = 4
        rect(100, height-4*brick_height, brick_width/2, brick_height);
        rect(120, height-4*brick_height, brick_width, brick_height);
        rect(160, height-4*brick_height, brick_width, brick_height);
        rect(200, height-4*brick_height, brick_width, brick_height);
        rect(240, height-4*brick_height, brick_width, brick_height);
        rect(280, height-4*brick_height, brick_width, brick_height);
        rect(320, height-4*brick_height, brick_width, brick_height);
        rect(360, height-4*brick_height, brick_width, brick_height);
        // Next layer i = 5
        rect(100, height-5*brick_height, brick_width, brick_height);
        rect(140, height-5*brick_height, brick_width, brick_height);
        rect(180, height-5*brick_height, brick_width, brick_height);
        rect(220, height-5*brick_height, brick_width, brick_height);
        rect(260, height-5*brick_height, brick_width, brick_height);
        rect(300, height-5*brick_height, brick_width, brick_height);
        rect(340, height-5*brick_height, brick_width, brick_height);
        rect(380, height-5*brick_height, brick_width/2, brick_height);
        // Next layer i = 6
        rect(100, height-6*brick_height, brick_width/2, brick_height);
        rect(120, height-6*brick_height, brick_width, brick_height);
        rect(160, height-6*brick_height, brick_width, brick_height);
        rect(200, height-6*brick_height, brick_width, brick_height);
        rect(240, height-6*brick_height, brick_width, brick_height);
        rect(280, height-6*brick_height, brick_width, brick_height);
        rect(320, height-6*brick_height, brick_width, brick_height);
        rect(360, height-6*brick_height, brick_width, brick_height);
        // Next layer i = 7
        rect(100, height-7*brick_height, brick_width, brick_height);
        rect(140, height-7*brick_height, brick_width, brick_height);
        rect(180, height-7*brick_height, brick_width, brick_height);
        rect(220, height-7*brick_height, brick_width, brick_height);
        rect(260, height-7*brick_height, brick_width, brick_height);
        rect(300, height-7*brick_height, brick_width, brick_height);
        rect(340, height-7*brick_height, brick_width, brick_height);
        rect(380, height-7*brick_height, brick_width/2, brick_height);
        // Next layer i = 6
        rect(100, height-8*brick_height, brick_width/2, brick_height);
        rect(120, height-8*brick_height, brick_width, brick_height);
        rect(160, height-8*brick_height, brick_width, brick_height);
        rect(200, height-8*brick_height, brick_width, brick_height);
        rect(240, height-8*brick_height, brick_width, brick_height);
        rect(280, height-8*brick_height, brick_width, brick_height);
        rect(320, height-8*brick_height, brick_width, brick_height);
        rect(360, height-8*brick_height, brick_width, brick_height);
        // Next layer i = 9
        rect(100, height-9*brick_height, brick_width, brick_height);
        rect(140, height-9*brick_height, brick_width, brick_height);
        rect(180, height-9*brick_height, brick_width, brick_height);
        rect(220, height-9*brick_height, brick_width, brick_height);
        rect(260, height-9*brick_height, brick_width, brick_height);
        rect(300, height-9*brick_height, brick_width, brick_height);
        rect(340, height-9*brick_height, brick_width, brick_height);
        rect(380, height-9*brick_height, brick_width/2, brick_height);
        // Next layer i = 10
        rect(100, height-10*brick_height, brick_width/2, brick_height);
        rect(120, height-10*brick_height, brick_width, brick_height);
        rect(160, height-10*brick_height, brick_width, brick_height);
        rect(200, height-10*brick_height, brick_width, brick_height);
        rect(240, height-10*brick_height, brick_width, brick_height);
        rect(280, height-10*brick_height, brick_width, brick_height);
        rect(320, height-10*brick_height, brick_width, brick_height);
        rect(360, height-10*brick_height, brick_width, brick_height);
        // Entrance
        fill('black');
        arc(175, 340, 50, 40, PI, 0);
        rect(150, 340, 50, 60);
        // Separation between lower and upper part of wall
        strokeWeight(3);
        line(100, height-10*brick_height,
             300, height-10*brick_height);
        // Top of the wall
        //strokeWeight(2);
        fill(220);
        rect(40, height-11*brick_height, brick_width/2, brick_height);
        rect(60, height-11*brick_height, brick_width, brick_height);
        rect(100, height-11*brick_height, brick_width, brick_height);
        rect(140, height-11*brick_height, brick_width, brick_height);
        rect(180, height-11*brick_height, brick_width, brick_height);
        rect(220, height-11*brick_height, brick_width, brick_height);
        rect(260, height-11*brick_height, brick_width, brick_height);
        rect(300, height-11*brick_height, brick_width, brick_height);
        rect(340, height-11*brick_height, brick_width, brick_height);
        rect(380, height-11*brick_height, brick_width/2, brick_height);
        // Next layer on top of wall
        rect(40, height-12*brick_height, brick_width, brick_height);
        rect(80, height-12*brick_height, brick_width, brick_height);
        rect(120, height-12*brick_height, brick_width, brick_height);
        rect(160, height-12*brick_height, brick_width, brick_height);
        rect(200, height-12*brick_height, brick_width, brick_height);
        rect(240, height-12*brick_height, brick_width, brick_height);
        rect(280, height-12*brick_height, brick_width, brick_height);
        rect(320, height-12*brick_height, brick_width, brick_height);
        rect(360, height-12*brick_height, brick_width, brick_height);
        // Spokes on the top of wall
        rect(40, height-13*brick_height, brick_width, brick_height);
        rect(120, height-13*brick_height, brick_width, brick_height);
        rect(200, height-13*brick_height, brick_width, brick_height);
        rect(280, height-13*brick_height, brick_width, brick_height);
        rect(360, height-13*brick_height, brick_width, brick_height);

        this.castleWall = get(0, 0, width, height);
    }
}