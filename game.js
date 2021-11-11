function game(){
    //Handles different aspect ratios
    let gameWidth = window.innerWidth
    let gameHeight = window.innerHeight
    let ratio = 0.9;
    if (gameHeight / gameWidth < ratio){
        gameWidth = Math.ceil(gameHeight / ratio)
    }
    //..................................
    let config = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200,
                },
            },
        },
        scene: {
            preload: preload,
            create: create
        }
    };

    let game = new Phaser.Game(config)

    document.body.style.display = 'flex'
    document.body.style.justifyContent = 'center'
    document.body.style.alignItems = 'center'

    function preload(){
        this.load.image('background', './assets/images/background3-720.png')
        this.load.image('character', 'assets/images/BlueWizard Animations/BlueWizard/2BlueWizardIdle/Chara - BlueIdle00000.png')
    }

    function create(){
        this.add.image((gameWidth / 2), (gameHeight / 2), 'background').setScale(1).refreshBody;
    }
}