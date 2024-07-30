// Variables used for the entire game
var menu, tutorial, instructions, start, state;
var images, weapons;
var animation_player = [];
var player = [];

var animation_slime = [];
var animation_wizard = [];
var animation_boss = [];
var animation_boss_attack = [];

var health_potion = null;
var speed_potion = null;
var strength_potion = null;

var enemy = [];
var boss = [];


var levels = [];

function preload() {
    // load Knight image
    spriteData_player = loadJSON('animations/knight.json');
    spriteImg_player = loadImage('animations/knight.png');
    
    // load image
    spriteImg_slime = loadImage('animations/EnemyA.png');
    spriteImg_wizard = loadImage('animations/EnemyB.png');
    spriteImg_boss = loadImage('animations/Boss.png');
    spriteImg_boss_attack = loadImage('animations/BossAttack.png');

    // load potions
    spriteImg_health = loadImage('animations/HealthPotion.png');
    spriteImg_speed = loadImage('animations/SpeedPotion.png');
    spriteImg_strength = loadImage('animations/StrengthPotion.png');
}

// States:
// 0 == Menu
// 1 == Game / Tutorial
// 2 == How to Play
// 3 == Quit Game
// 4 == Starting Screen
// 5 == Level 1
function mouseClicked() {
    switch(state) {
        case 0:
            for (let i = 0; i < menu.boxes.length; ++i) {
                let box = menu.boxes[i];
                
                // Detect when 'play' box is clicked
                if (menu.inBox(box) && i == 0) { 
                    state = 1;
                    enemy = [];
                    player[1].reset();
                    enemy.push(new Slime(animation_slime, 400, 220, 80, 80, 3));    // tutorial
                    tutorial.guide_number = 1;
                }

                // Detect when 'how to play' box is clicked
                else if (menu.inBox(box) && i == 1) { state = 2; }

                // Detect when 'quit' box is clicked
                else if (menu.inBox(box) && i == 2) { resizeCanvas(0, 0); }
            }
            break;
        case 2:
            if (instructions.inBox(instructions.rightArrow) && instructions.slide != 6) { instructions.slide++; }
            else if (instructions.inBox(instructions.leftArrow) && instructions.slide != 1)
                 instructions.slide--;
            break;
        case 4:
            state = 0;
            break;
    } 
}

// Be able to escape from tutorial and instructions
function keyPressed() {
    if (keyCode === ESCAPE && state == 1) { state = 0; }
    else if (keyCode === ESCAPE && state == 2) { state = 0; instructions.slide = 1; }
}


function setup() {
    createCanvas(800, 400);
    // Instantiate weapons and background
    weapons = new Weapons();
    images = new Images();
    resizeCanvas(800, 400);
    angleMode(RADIANS);

    // Load Player Animation List
    let frames = spriteData_player.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spriteImg_player.get(pos.x, pos.y, pos.w, pos.h);
        animation_player.push(img);
    }
    
    // Create Player
    player.push(new Player(animation_player, 10, 210, 100, 100));   // start
    player.push(new Player(animation_player, 0, 0, 100, 100));   // tutorial
    state = 4;

    // Load Slime Animation List
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spriteImg_slime.get(pos.x, pos.y, pos.w, pos.h);
        animation_slime.push(img);
    }

    // Load Wizard Animation List
        for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spriteImg_wizard.get(pos.x, pos.y, pos.w, pos.h);
        animation_wizard.push(img);
    }
    // Create enemies
    enemy.push(new Slime(animation_slime, 80, 220, 80, 80, 3));     // start

    // Load Boss Animation List
    // frames = spriteData_knight.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spriteImg_boss.get(pos.x, pos.y, pos.w, pos.h);
        animation_boss.push(img);
    }
    // Create Boss
    boss.push(new Boss(animation_boss, 400, 220, 150, 150, 3));


    // Load Boss Attack Animation List
    // frames = spriteData_knight.frames;
    for (let i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = spriteImg_boss_attack.get(pos.x, pos.y, pos.w, pos.h);
        animation_boss_attack.push(img);
    }

    // Loads potion images into sprites
    let x = 80;
    let y = 24;
    let w = 96;
    let h = 112;

    health_potion = spriteImg_health.get(x, y, w, h);
    speed_potion = spriteImg_speed.get(x, y, w, h);
    strength_potion = spriteImg_strength.get(x, y, w, h);

    // Create levels
    levels.push(new Level_1(4000));
    levels.push(new Level_2(4000));
    levels.push(new Level_3(1500));

    // Instantiate different screens
    menu = new Menu();
    tutorial = new Tutorial();
    instructions = new Instructions();
    start = new Start();
}

// States:
// 0 == Menu
// 1 == Game / Tutorial
// 2 == How to Play
// 3 == Quit Game
// 4 == Starting Screen
// 5 == Level 1
// 6 == Level 2
// 7 == Boss Level
function draw() {
    switch (state){
        case 0:
            menu.draw();
            break;
        case 1:
            tutorial.draw();
            break;
        case 2:
            instructions.draw();
            break;
        case 4:
            start.draw();
            start.animate();
            break;
        case 5:
            levels[0].draw();
            break;
        case 6:
            levels[1].draw();
            break;
        case 7:
            levels[2].draw();
    }
}