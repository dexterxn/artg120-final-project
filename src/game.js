class Intro extends Phaser.Scene
{   
    constructor() {
        super('intro')
    }
    preload ()
    {
        this.load.image("start", "assets/start.png");
    }

    create ()
    {
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
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('level1'));
        });
    }
}

class Level1 extends Phaser.Scene
{   
    man;
    coffee;
    rotate = true;
    temp = 0;
    rotationNum = 0;
    inZone = false;
    constructor() {
        super('level1')
    }
    preload ()
    {
        this.load.image("bg", "assets/S1 background.png");
        this.load.image("bed", "assets/S1 Bed.png");
        this.load.image("coffee", "assets/S1 Coffee.png");
        this.load.image("coffeeMachine", "assets/S1 CoffeeMachine.png");
        this.load.image("door", "assets/S1 Door.png");
        this.load.image("dresser", "assets/S1 Dresser.png");
        this.load.image("kitchen", "assets/S1 Kitchen.png");
        this.load.image("mat", "assets/S1 Mat.png");
        this.load.image("mirror", "assets/S1 Mirror.png");
        this.load.image("sink", "assets/S1 sink.png");
        this.load.image("man", "assets/Still Man.png");
    }

    pickUpAnimation(item){
        const chain1 = this.tweens.chain({
            targets: item,
            tweens: [
                {
                    y: item.y,
                    scaleX: 1.5,
                    duration: 300,
                    ease: 'quad.out'
                },
                {
                    y: item.y,
                    scaleX: 1,
                    duration: 300,
                    ease: 'quad.in'
                },
                // {
                //     y: item.y + 20,
                //     scaleX: 1,
                //     duration: 500,
                //     ease: 'bounce.out'
                // },
            ],
            loop: 1,
            loopDelay: 300,
        });
    }

    create ()
    {
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        const kitchen = this.add.image(this.w*6.5/20, this.h*5/20, 'kitchen');
        // const bg = this.add.image(this.w/2, this.h/2, 'bg');
        const bed = this.physics.add.sprite(this.w*16/20, this.h*4/5, 'bed').setCollideWorldBounds(true);
            bed.setPushable(false);
        // this.coffee = this.physics.add.sprite(this.w*7/20, this.h*2/20, 'coffee').setCollideWorldBounds(true);
        //     this.coffee.setPushable(false);
        this.coffee = this.physics.add.staticImage(this.w*7/20, this.h*2/20, 'coffee');
        const coffeeMachine = this.physics.add.sprite(this.w*1.5/20, this.h*7/20, 'coffeeMachine').setCollideWorldBounds(true);
            coffeeMachine.setPushable(false);
        // const door = this.physics.add.sprite(this.w*10/20, this.h*7/20, 'door').setCollideWorldBounds(true);
        const door = this.add.image(this.w*13.5/20, this.h*10/20, 'door');
        
        const dresser = this.physics.add.sprite(this.w*19/20, 0, 'dresser').setCollideWorldBounds(true);
            dresser.setPushable(false);
        const mat = this.physics.add.sprite(0, this.h*17/20, 'mat').setCollideWorldBounds(true);
            mat.setPushable(false);
        const mirror = this.physics.add.sprite(this.w*15/20, this.h*2/20, 'mirror').setCollideWorldBounds(true);
            mirror.setPushable(false);
        const sink = this.physics.add.sprite(this.w*10/20, this.h*2/20, 'sink').setCollideWorldBounds(true);
            sink.setPushable(false);
        this.man = this.physics.add.sprite(this.w*10/20, this.h*10/20, 'man').setCollideWorldBounds(true);

        this.physics.add.collider(this.man, bed);
        this.physics.add.collider(this.man, dresser);
        this.physics.add.collider(this.man, mirror);
        this.physics.add.collider(this.man, mat);

        // this.physics.add.collider(this.man, this.coffee);
        // this.physics.collide(this.man, coffee,this.pickUpAnimation(coffee));

        this.physics.add.collider(this.man, sink);
        this.physics.add.collider(this.man, coffeeMachine);

        console.log(this.man.body.touching);

        this.physics.add.overlap(this.coffee, this.man, function () {
            // pickUpAnimation(this.coffee);
            this.inZone = true;
            console.log("setting In Zone to true");

            // const chain1 = this.tweens.chain({
            //     targets: this.coffee,
            //     tweens: [
            //         {
            //             y: this.coffee.y,
            //             scaleX: 1.5,
            //             duration: 300,
            //             ease: 'quad.out'
            //         },
            //         {
            //             y: this.coffee.y,
            //             scaleX: 1,
            //             duration: 300,
            //             ease: 'quad.in'
            //         },
            //         // {
            //         //     y: item.y + 20,
            //         //     scaleX: 1,
            //         //     duration: 500,
            //         //     ease: 'bounce.out'
            //         // },
            //     ],
            //     loop: 1,
            //     loopDelay: 300,
            // });

        });

        this.input.on('pointerdown', () => {
            // this.man.setVelocity(200, 0);
            console.log(this.man.rotation);
            let xR = Math.cos(this.man.rotation);
            let yR = Math.sin(this.man.rotation);

            this.man.setVelocity(yR*300,-xR*300);
            this.rotate = false;
        });
        
        
        const text1 = this.add.text(this.w/8, this.h*3/4, 'Goal: \n - get water from the sink\n - get coffee\n - put it into the coffee machine', { align: 'left' }, 0xFF69B4);
        text1.setFontSize(50);
        text1.setTint(0x000000);   
        
        
    }
    update(delta){

        if (this.inZone == true) {
            pickUpAnimation(this.coffee);
            console.log("It's overlapping!");
            // this.inZone = false;
        }
        // console.log(this.man.body.touching);
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
    type: Phaser.AUTO,
    width: 2388,
    height: 1668,
    backgroundColor: '#FFC0CB',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [Intro, Level1]
    
};

const game = new Phaser.Game(config);
