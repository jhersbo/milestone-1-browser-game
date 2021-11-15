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
                    y: 300,
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
        this.load.spritesheet('character', './assets/images/BlueWizard-Animations/walksheet.png',{
            frameWidth: 514,
            frameHeight: 514,
        })
        this.load.spritesheet('character-idle-right', './assets/images/BlueWizard-Animations/idle-right.png',{
            frameWidth: 514,
            frameHeight: 514,
        })
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

        //player 
        player = this.physics.add.sprite(100, 450, 'character')
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.5)
        
        // //collider
        // this.physics.add.collider(player, platforms);
        
        //player animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 9,
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 19
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 10,
            }),
            frameRate: 20,
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('character-idle-right', {
                start: 0,
                end: 19,
            }),
            frameRate: 10,
            repeat: -1
        })

        //key controls
        cursors = this.input.keyboard.createCursorKeys();    
    }
    
    function update(){
        
        if (cursors.left.isDown){
            player.setVelocityX(-260)
            player.anims.play('left', true)
        }else if(cursors.right.isDown){
            player.setVelocityX(260)
            player.anims.play('right', true)
        }else{
            player.setVelocityX(0)
            player.anims.play('idle')//need to put in idle
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }
}