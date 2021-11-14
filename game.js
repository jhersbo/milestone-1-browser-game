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
                debug: false,
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    let game = new Phaser.Game(config)

    document.body.style.display = 'flex'
    document.body.style.justifyContent = 'center'
    document.body.style.alignItems = 'center'

    function preload(){
        this.load.image('background', './assets/images/background3-720.png')
        this.load.image('base-platform', './assets/images/Mossy-Assets/Mossy-floatingplatform-2.png')
        this.load.image('three-rocks', './assets/images/Mossy-Assets/three-rocks.png')
        this.load.image('character', 'assets/images/BlueWizard Animations/BlueWizard/2BlueWizardIdle/Chara - BlueIdle00000.png')
    }

    function create(){
        this.add.image((gameWidth / 2), (gameHeight / 2), 'background').setScale(1.5).refreshBody;

        platforms = this.physics.add.staticGroup();
        //creating top moss borer
        platforms.create(gameWidth-(0.8*gameWidth), 0, 'base-platform').setScale(0.5).refreshBody
        //creating bottom moss border
        platforms.create(gameWidth, gameHeight-60, 'base-platform').setScale(0.3).refreshBody
        platforms.create(0, gameHeight-60, 'base-platform').setScale(0.3).refreshBody
        //decorations
        this.add.image(gameWidth-(0.5*gameWidth), gameHeight-60, 'three-rocks').setScale(0.15).refreshBody
    }
    
    function update(){
        
    }
}