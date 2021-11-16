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
                    y: 500,
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
        //image preload
        this.load.image('background', './assets/images/background3-720.png')
        this.load.image('base-platform', './assets/images/Mossy-Assets/Mossy-floatingplatform-2.png')
        this.load.image('three-rocks', './assets/images/Mossy-Assets/three-rocks.png')
        this.load.image('lilhill1', './assets/images/Mossy-Assets/lilhil1.png')
        this.load.image('lilhill2', './assets/images/Mossy-Assets/lilhil2.png')
        this.load.image('wood-bridge1', './assets/images/Mossy-Assets/wood-bridge1.png')
        this.load.image('wood-bridge2', 'assets/images/Mossy-Assets/wood-bridge2.png')
        //spritesheet preload
        this.load.spritesheet('character', './assets/images/BlueWizard-Animations/walksheet2.png',{
            frameWidth: 512,
            frameHeight: 300,
        })
        this.load.spritesheet('melon', './assets/images/Melon.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('character-idle-right', './assets/images/BlueWizard-Animations/idle-right.png',{
            frameWidth: 512,
            frameHeight: 300,
        })
        this.load.spritesheet('character-jump-right', './assets/images/BlueWizard-Animations/jump-right.png',{
            frameWidth: 512,
            frameHeight: 300
        })

    }
    //globals
    let platforms;
    let timeText;
    let collectedFruits = 0;
    function create(){
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight)
        this.add.image((gameWidth / 2), (gameHeight / 2), 'background').setScale(1.5);
        //creating top moss borer
        this.add.image(gameWidth-(0.8*gameWidth), 0, 'base-platform').setScale(0.35);
        this.add.image(gameWidth-(0.2*gameWidth), 0, 'base-platform').setScale(0.35);
        //decorations
        this.add.image(gameWidth-(0.5*gameWidth), gameHeight-60, 'three-rocks').setScale(0.15)
        this.add.image(gameWidth-(0.9*gameWidth), gameHeight-40, 'lilhill1').setScale(0.2)
        
        platforms = this.physics.add.staticGroup();
        //side platforms
        platforms.create(gameWidth, gameHeight-60, 'base-platform').setScale(0.2).refreshBody();
        platforms.create(0, gameHeight-(0.3*gameHeight), 'base-platform').setScale(0.2).refreshBody();
        platforms.create(0, gameHeight-(0.7*gameHeight), 'base-platform').setScale(0.2).refreshBody();
        platforms.create(gameWidth, gameHeight-(0.7*gameHeight), 'base-platform').setScale(0.2).refreshBody();
        //floating platforms
        platforms.create(gameWidth/2, gameHeight-(0.3*gameHeight), 'wood-bridge1').setScale(2).refreshBody();
        platforms.create(gameWidth-(0.2*gameWidth), gameHeight-(0.5*gameHeight), 'wood-bridge1').setScale(2).refreshBody();
        platforms.create(gameWidth-(0.6*gameWidth), gameHeight-(0.7*gameHeight), 'wood-bridge1').setScale(1).refreshBody();
        platforms.create(gameWidth-(0.3*gameWidth), gameHeight-(0.8*gameHeight), 'wood-bridge2').setScale(1).refreshBody();
        platforms.create(gameWidth-(0.6*gameWidth), gameHeight-(0.1*gameHeight), 'wood-bridge2').setScale(2).refreshBody();
        platforms.create(gameWidth-(0.35*gameWidth), gameHeight-(0.1*gameHeight), 'wood-bridge2').setScale(2).refreshBody();
        platforms.create(gameWidth-(0.85*gameWidth), gameHeight-(0.1*gameHeight), 'wood-bridge2').setScale(2).refreshBody();
        

        //player 
        player = this.physics.add.sprite(100, 550, 'character')
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.setScale(0.3)

        //fruits
        fruits = this.physics.add.group({
            key: 'melon',
            repeat: 12,
            setXY: {
                x: gameWidth-(0.9*gameWidth),
                y: 0,
                stepX: 80,
                stepY: 0
                //implement rng to set these values
            },
        });
    
        fruits.children.iterate((child)=>{
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        //overlap function
        this.physics.add.overlap(player, fruits, collectFruits, null, this);
        
        function collectFruits(player, fruits){
            fruits.disableBody(true, true);
            collectedFruits++
            if (collectedFruits === 12){
                gameRunning = false
                stopTimer()
                switchPage('postGame')
                game.destroy(true, false) 
            }
        }
        //colliders
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fruits, platforms)
        
        //player animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 9,
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('character', {
                start: 10,
                end: 19
            }),
            frameRate: 20,
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
            key: 'idle-right',
            frames: this.anims.generateFrameNumbers('character-idle-right', {
                start: 0,
                end: 18,
            }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNumbers('character-jump-right', {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        })
        //key controls
        keys = this.input.keyboard.createCursorKeys();
        //scoring clock
        timeText = this.add.text(40, 100, '', {
            fontSize: '32px',
            fontFamily: 'Permanent Marker',
            fill: '#F8F8F8'
        });
        timeText.fixedToCamera = true
    }
    function update(){
        if (keys.left.isDown){
            player.setVelocityX(-260)
            player.anims.play('left', true)
        }else if(keys.right.isDown){
            player.setVelocityX(260)
            player.anims.play('right', true)
        }else{
            player.setVelocityX(0)
            player.anims.play('idle-right')
        }
        if (keys.up.isDown && player.body.touching.down){
            player.setVelocityY(-530);
            player.anims.play('jump-right')
        } 
    }
}