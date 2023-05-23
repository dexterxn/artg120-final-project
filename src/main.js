let config = {
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    backgroundColor: 0x3f5812,
    scene: [test],
    title: "Right Way"
}

let game = new Phaser.Game(config);