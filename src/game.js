class Intro extends Phaser.Scene
{   
    constructor() {
        super('intro')
    }
    preload ()
    {
        this.load.image("start", "assets/start.png");

        this.load.image("bed", "assets/S1 Bed.png");
        this.load.image("coffee", "assets/S1 Coffee.png");
        this.load.image("coffeeMachine", "assets/S1 CoffeeMachine.png");
        this.load.image("door", "assets/S1 Door.png");
        this.load.image("dresser", "assets/S1 Dresser.png");
        this.load.image("kitchen", "assets/S1 Kitchen.png");
        this.load.image("mat", "assets/S1 Mat.png");
        this.load.image("mirror", "assets/S1 Mirror.png");
        this.load.image("sink", "assets/S1 Sink.png");
        this.load.image("man", "assets/S1 Player.png");
        this.load.image("wall1", "assets/Wall 1.png");
        this.load.image("wall2", "assets/Wall 2.png");
        this.load.image("door1", "assets/Door.png");

        this.load.audio('bgMusic', 'assets/bgSound.wav');

        this.load.script('t','test.js')


        this.load.image("bg2", "assets/S2 Background.png");
        this.load.image("busStop", "assets/S2 Bus Stop.png");
        this.load.image("bus", "assets/S2 Bus.png");
        this.load.image("gameOver", "assets/Game Over.png");
    }

    create ()
    {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        const text = this.add.text(this.w/2, this.h*1/4, 'Right Way', { align: 'center' }, 0xFF69B4);
        text.setTint(0xFF69B4, 0xFFC0CB, 0x9F2B68, 0xE30B5C);

        text.setOrigin(0.5, 0.5);
        text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Arial');
        text.setFontStyle('bold');
        text.setFontSize(200);

        text.preFX.setPadding(32);

        const fx = text.preFX.addShadow(0, 0, 0.06, 0.75, 0x000000, 4, 0.8);

        // adding start button 

        const start = this.add.image(this.w/2, this.h*12/20, 'start').setOrigin(0.5, 1);
        start.setScale(3);

        const chain1 = this.tweens.chain({
            targets: start,
            tweens: [
                {
                    y: this.h*11/20,
                    scaleX: 2,
                    duration: 300,
                    ease: 'quad.out'
                },
                {
                    y: this.h*12/20,
                    scaleX: 3,
                    duration: 1000,
                    ease: 'bounce.out'
                },
            ],
            loop: -1,
            loopDelay: 300,
        });

        const text1 = this.add.text(this.w/5, this.h*3/4, 'Controls: Press the left mouse button to move.\nUse left mouse to interact with items next to you.\nCreated by: Zane Chaplin, Michael Law, Dexter Zhang', { align: 'center' }, 0xFF69B4);
        text1.setFontSize(50);
        text1.setTint(0x000000);  

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });
    }
}

class Level1 extends TestScene
{   
    man;
    coffee;
    sink;
    coffeeMachine;
    rotate = true;
    music;
    temp = 0;
    rotationNum = 0;
    touchCoffee = false;
    tapCoffee = false;
    touchSink = false;
    tapSink = false;
    touchCM = false;
    tapCM = false;
    hasCoffee = false;
    hasWater = false;
    madeCoffee = false;
    tapMat = false;
    touchMat = false;
    constructor() {
        super('level1')
    }
    preload ()
    {
    }

    create ()
    {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.w = this.game.config.width;
        this.h = this.game.config.height;

        // not movable obj in room
        const kitchen = this.add.image(this.w*6.5/20, this.h*5/20, 'kitchen');
        const bed = this.physics.add.sprite(this.w*16/20, this.h*4/5, 'bed').setCollideWorldBounds(true);
            bed.setPushable(false);
        // const door = this.add.image(this.w*13.5/20, this.h*10/20, 'door');

        const wall1 = this.physics.add.sprite(this.w*12.5/20, this.h*3.5/20, 'wall1').setPushable(false).setCollideWorldBounds(true);
        const wall2 = this.physics.add.sprite(this.w*12.5/20, this.h*15.5/20, 'wall2').setPushable(false).setCollideWorldBounds(true);
        const door1 = this.physics.add.sprite(this.w*13.9/20, this.h*6.8/20, 'door1').setPushable(false).setCollideWorldBounds(true);

        const dresser = this.physics.add.sprite(this.w*19/20, 0, 'dresser').setCollideWorldBounds(true);
            dresser.setPushable(false);
        // const mat = this.physics.add.sprite(0, this.h*17/20, 'mat').setCollideWorldBounds(true);
        //     mat.setPushable(false);
        const mirror = this.physics.add.sprite(this.w*15/20, this.h*2/20, 'mirror').setCollideWorldBounds(true);
            mirror.setPushable(false);
        
        // interactive bits
        this.coffee = this.physics.add.staticImage(this.w*7/20, this.h*2/20, 'coffee');
        this.sink = this.physics.add.staticImage(this.w*10/20, this.h*2/20, 'sink');
        this.coffeeMachine = this.physics.add.staticImage(this.w*1.5/20, this.h*7/20, 'coffeeMachine');
        this.mat = this.physics.add.staticImage(this.w*1/20, this.h*17/20, 'mat');
        
        // the player
        this.man = this.physics.add.sprite(this.w*15/20, this.h*10/20, 'man').setCollideWorldBounds(true);

        this.physics.add.collider(this.man, bed);
        this.physics.add.collider(this.man, dresser);
        this.physics.add.collider(this.man, mirror);
        // this.physics.add.collider(this.man, mat);
        this.physics.add.collider(this.man, wall1);
        this.physics.add.collider(this.man, wall2);
        this.physics.add.collider(this.man, door1);

        this.music = this.sound.add('bgMusic',{
            volume: 0.4,
            loop: true,
        });
        this.music.loop = true;
        this.music.play();

        // interactive coffee
        this.coffee.setInteractive();
        this.coffee.on('pointerdown', () => {
            this.tapCoffee = true; 
        });
        this.physics.add.overlap(this.coffee, this.man, ()=> {
            this.touchCoffee = true;
        });
        // interactive sink
        this.sink.setInteractive();
        this.sink.on('pointerdown', () => {
            this.tapSink = true; 
        });
        this.physics.add.overlap(this.sink, this.man, ()=> {
            this.touchSink = true;
        });
        // interactive coffeeMachine
        this.coffeeMachine.setInteractive();
        this.coffeeMachine.on('pointerdown', () => {
            this.tapCM = true; 
        });
        this.physics.add.overlap(this.coffeeMachine, this.man, ()=> {
            this.touchCM = true;
        });
        // interactive mat
        this.physics.add.overlap(this.mat, this.man,()=>{
            this.touchMat = true;
        });

        this.input.on('pointerdown', () => {
            // this.man.setVelocity(200, 0);
            console.log(this.man.rotation);
            let xR = Math.cos(this.man.rotation);
            let yR = Math.sin(this.man.rotation);

            this.man.setVelocity(yR*300,-xR*300);
            this.rotate = false;
        });
        
        
        this.text1 = this.add.text(this.w/8, this.h*3/4, 'Goal:', { align: 'left' , color: "#000000", fontSize: 50});
        this.text2 = this.add.text(this.w/8, this.h*3.1/4, ' - get water from the sink', { align: 'left' , color: "#000000", fontSize: 50});
        this.text3 = this.add.text(this.w/8, this.h*3.2/4, ' - get coffee', { align: 'left' , color: "#000000", fontSize: 50});
        this.text4 = this.add.text(this.w/8, this.h*3.3/4, ' - put it into the coffee machine', { align: 'left' , color: "#000000", fontSize: 50});
        this.text5 = this.add.text(this.w/8, this.h*3.4/4, ' - leave for work', { align: 'left' , color: "#000000", fontSize: 50});
        // text1.setFontSize(50);
        // text1.setTint(0x000000);   
        
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        // for cheatcodes
        // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
    }
    update(delta){
        if(this.touchSink && this.tapSink){this.pickUpAnimation(this.sink); this.hasWater = true; this.text2.setColor("#00b300");}
        if(this.touchCoffee && this.tapCoffee){this.pickUpAnimation(this.coffee); this.hasCoffee = true; this.text3.setColor("#00b300");}
        if(this.touchCM && this.tapCM && this.hasCoffee && this.hasWater){this.pickUpAnimation(this.coffeeMachine); this.madeCoffee = true; this.text4.setColor("#00b300");}

        // for cheatcodes
        // if (this.keyA.isDown){this.man.setVelocityX(-300);}
        // if (this.keyD.isDown){this.man.setVelocityX(300);}
        // if (this.keyW.isDown){this.man.setVelocityY(-300);}
        // if (this.keyS.isDown){this.man.setVelocityY(300);}
        // if (this.keyP.isDown || this.hasCoffee && this.hasWater && this.madeCoffee){
        if(this.hasCoffee && this.hasWater && this.madeCoffee && this.touchMat){
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level2'));
            this.touchCoffee = false;
            this.tapCoffee = false;
            this.touchSink = false;
            this.tapSink = false;
            this.touchCM = false;
            this.tapCM = false;
            this.hasCoffee = false;
            this.hasWater = false;
            this.madeCoffee = false;
            // this.music.stop();
            this.touchMat = false;
        }
        if(this.rotate == true){
            this.man.rotation = this.rotationNum/100;
            this.temp = delta;
            this.rotationNum++;
        }

        if((delta - this.temp) >= 1000){
            this.man.setVelocity(0,0);
            this.rotate = true;
        }
        this.touchCoffee = false; this.tapCoffee = false;
        this.touchSink = false; this.tapSink = false;
        this.touchCM = false; this.tapCM = false;
        this.touchMat = false;
    }
    
}

class Level2 extends Phaser.Scene{
    man;
    bus;
    busStop;
    gameOver;
    rotate = true;
    temp = 0;
    rotationNum = 0;

    constructor() {
        super('level2')
    }
    preload ()
    {
        // this.load.image("player", "assets/S1 Player.png");
    }

    create ()
    {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.add.image(this.w/2,this.h/2,'bg2');
        // this.add.image(this.w*0.8, this.h*0.8, 'player');
        this.man = this.physics.add.sprite(this.w*0.8, this.h*0.8, 'man').setCollideWorldBounds(true);


        this.bus = this.physics.add.staticImage(this.w*23/20, this.h*3.5/20, 'bus');
        this.busStop = this.physics.add.staticImage(this.w*2.5/20, this.h*10/20, 'busStop');
        this.gameOver = this.physics.add.staticImage(this.w/2, -300, 'gameOver');
        let text = this.add.text(this.w * 0.8, -50, "Press 'p' to Restart");
        text.setFontSize(50);


        this.tweens.add({
            targets: this.bus,
            
            repeat: 0
        });
        const chain1 = this.tweens.chain({
            targets: this.bus,
            tweens: [
                {
                    delay: 1000,
                    // x: -this.bus.width,
                    x: this.w*2.5/20,
                    flipX: false,
                    yoyo: false,
                    duration: 4000,
                    ease: "sine.out",
                },
                {
                    delay: 3000,
                    x: -this.bus.width,
                    flipX: false,
                    yoyo: false,
                    duration: 2000,
                    ease: "sine.in",
                },
                {
                    targets: this.gameOver,
                    x: this.w/2,
                    y: this.h/2,
                    scaleX: 0.5,
                    scaleY: 0.5,
                    duration: 400,
                    ease: 'bounce.out'
                },
                {
                    targets: text,
                    x: this.w*0.7,
                    y: this.h/2,
                    scaleX: 1,
                    duration: 500,
                    ease: 'quad.out'
                },
            ],
            loop: 0,
            loopDelay: 300,
        });

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        const text1 = this.add.text(this.w/8, this.h*3/4, 'Goal: \n - get to the bus before it leaves!\n', { align: 'left' }, 0xFF69B4);
        text1.setFontSize(50);
        text1.setTint(0x000000);   

        this.input.on('pointerdown', () => {
            // this.man.setVelocity(200, 0);
            console.log(this.man.rotation);
            let xR = Math.cos(this.man.rotation);
            let yR = Math.sin(this.man.rotation);

            this.man.setVelocity(yR*300,-xR*300);
            this.rotate = false;
        });


    }
    update(delta){
        if (this.keyP.isDown){
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
            this.sound.get('bgMusic').stop();

        }
        if(this.rotate == true){
            this.man.rotation = this.rotationNum/100;
            this.temp = delta;
            this.rotationNum++;
        }

        if((delta - this.temp) >= 1000){
            this.man.setVelocity(0,0);
            this.rotate = true;
        }
    }
}

const config = {
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 2388,
        height: 1668,
    },
    backgroundColor: '#FFC0CB',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: { debug: false}
    },
    scene: [Intro, Level1, Level2]
    
};

const game = new Phaser.Game(config);
