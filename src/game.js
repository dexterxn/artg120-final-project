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
        const text = this.add.text(400, 300, 'Right Way', { align: 'center' }, 0xFF69B4);
        text.setTint(0xFF69B4, 0xFFC0CB, 0x9F2B68, 0xE30B5C);

        text.setOrigin(0.5, 0.5);
        text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Arial');
        text.setFontStyle('bold');
        text.setFontSize(100);

        text.preFX.setPadding(32);

        const fx = text.preFX.addShadow(0, 0, 0.06, 0.75, 0x000000, 4, 0.8);

        // adding start button 

        const start = this.add.image(400, 600, 'start').setOrigin(0.5, 1);

        const chain1 = this.tweens.chain({
            targets: start,
            tweens: [
                {
                    y: 470,
                    scaleX: 0.7,
                    duration: 300,
                    ease: 'quad.out'
                },
                {
                    y: 550,
                    scaleX: 1,
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

    create ()
    {
        this.w = this.game.config.width;
        this.h = this.game.config.height;

        const kitchen = this.add.image(this.w*6.5/20, this.h*5/20, 'kitchen');
        // const bg = this.add.image(this.w/2, this.h/2, 'bg');
        const bed = this.physics.add.sprite(this.w*16/20, this.h*4/5, 'bed').setCollideWorldBounds(true);
        const coffee = this.physics.add.sprite(this.w*7/20, this.h*2/20, 'coffee').setCollideWorldBounds(true);
        const coffeeMachine = this.physics.add.sprite(this.w*1.5/20, this.h*7/20, 'coffeeMachine').setCollideWorldBounds(true);
        // const door = this.physics.add.sprite(this.w*10/20, this.h*7/20, 'door').setCollideWorldBounds(true);
        const door = this.add.image(this.w*13.5/20, this.h*10/20, 'door');
        
        const dresser = this.physics.add.sprite(this.w*19/20, 0, 'dresser').setCollideWorldBounds(true);
        
        const mat = this.physics.add.sprite(0, this.h*17/20, 'mat').setCollideWorldBounds(true);
        const mirror = this.physics.add.sprite(this.w*15/20, this.h*2/20, 'mirror').setCollideWorldBounds(true);
        const sink = this.physics.add.sprite(this.w*10/20, this.h*2/20, 'sink').setCollideWorldBounds(true);
        const man = this.physics.add.sprite(this.w*10/20, this.h*10/20, 'man').setCollideWorldBounds(true);

        
        
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
    scene: [ Level1]
    
};

const game = new Phaser.Game(config);
