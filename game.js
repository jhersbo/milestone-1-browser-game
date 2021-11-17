let gameWidth;
let gameHeight;
function game(){
    //Handles different aspect ratios
    let gameWidth = window.innerWidth
    let gameHeight = window.innerHeight
    let ratio = 0.7;//default 0.9
    if (gameHeight / gameWidth < ratio){
        gameWidth = Math.ceil(gameHeight / ratio)
    }
    //..................................
    //parameters by which to run the game
    let config = {
        type: Phaser.AUTO, // will run via HTML canvas
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
            //call the functions below. 'this' === scene
            preload: preload, 
            create: create, 
            update: update
        }
    };
    //Phaser instantiation
    let game = new Phaser.Game(config)
    //adjusting window for game
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
            frameWidth: 512, //get by dividing length by n images
            frameHeight: 300,// i'm limited to 20 at this resolution
        })
        //these don't do anything right now
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
    //game()-wide variables
    let platforms;
    let collectedFruits = 0;
    function create(){
        //create static and dynamic objects 
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight)
        this.add.image((gameWidth / 2), (gameHeight / 2), 'background').setScale(1.5);
        //creating top moss borer
        this.add.image(gameWidth-(0.8*gameWidth), 0, 'base-platform').setScale(0.35);
        this.add.image(gameWidth-(0.2*gameWidth), 0, 'base-platform').setScale(0.35);
        //decorations
        this.add.image(gameWidth-(0.5*gameWidth), gameHeight-60, 'three-rocks').setScale(0.15)
        this.add.image(gameWidth-(0.9*gameWidth), gameHeight-40, 'lilhill1').setScale(0.2)
        //static platforms
        platforms = this.physics.add.staticGroup();
        //side platforms
        platforms.create(gameWidth, gameHeight-60, 'base-platform').setScale(0.2).refreshBody();//refresh body is a method to use when resizing static objects. Basically just syncs the image with the 'hitbox' of the platform
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
        platforms.create(gameWidth-(0.75*gameWidth), gameHeight-(0.1*gameHeight), 'wood-bridge2').setScale(2).refreshBody();
        //adding moving platforms in next level

        //player 
        player = this.physics.add.sprite(100, 550, 'character')
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);
        player.setScale(0.3)

        //fruits
        fruits = this.physics.add.group({
            key: 'melon',
            repeat: 12, //number of melons to spawn 
            setXY: {
                x: gameWidth-(0.9*gameWidth),
                y: 0,
                stepX: 80, //X distance apart
                stepY: 0
            },
        });
    
        fruits.children.iterate((child)=>{
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
            //randomizes the amount that the melons bounce when they collide with a static group. FloatBetween is a Phaser math function. Similar to building a function with nested Math.random() functions to return random numbers between 0.4 & 0.8
        })
        //overlap function
        this.physics.add.overlap(player, fruits, collectFruits, null, this);
        
        function collectFruits(player, fruits){
            fruits.disableBody(true, true);
            collectedFruits++
            //END CONDITION
            if (collectedFruits === 12){
                gameRunning = false
                stopTimer()//stops timer
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
                start: 0, // which frames to begin and end at. 
                end: 9,
            }),
            frameRate: 20, 
            repeat: -1 //indicates that the animation should repeat
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
        //these don't do anything for the same reason as the other spritesheets
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
        //.createCursorKeys is a method within the scene object. Phaser has built-in methods for handling key inputs inside the game
        keys = this.input.keyboard.createCursorKeys();
    }
    function update(){
        if (keys.left.isDown){//each is a method attached to each key object
            player.setVelocityX(-260)
            player.anims.play('left', true)
        }else if(keys.right.isDown){
            player.setVelocityX(260)
            player.anims.play('right', true)
        }else{
            player.setVelocityX(0)
            player.anims.play('idle-right')
        }
        if (keys.up.isDown && player.body.touching.down){//player must be on the ground in order to jump
            player.setVelocityY(-530);
            player.anims.play('jump-right')
        } 
    }
}