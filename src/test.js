class TestScene extends Phaser.Scene {

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
            ],
            loop: 1,
            loopDelay: 300,
        });
    }
}