class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    create(){
        this.add.circle(100, 100, 50, 0xA35913);
    }
}