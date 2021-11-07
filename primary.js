$(document).ready( () =>{
    let gameWidth = window.innerWidth;
    let gameHeight = window.innerHeight;
    let ratio = 0.5625;
    if (gameHeight / gameWidth < ratio){
        gameWidth = Math.ceil(gameHeight / ratio)
    }
    $('#game-canvas').css({
        'height': gameHeight - 30 + 'px',
        'width': gameWidth - 45 + 'px',
        'border': '1px solid red',
    })
    $('#modal-content').css({
        'width': gameWidth + 'px',
    })
})

//Handles different aspect ratios.

// $('#game-canvas').css({
//     'height': gameHeight + 'px',
//     'width': gameWidth + 'px',
// })
// $('#modal-content').css({
//     'width': gameWidth + 'px',
// })
/////////////////////////////////

//TODO:
//1. Build playable character class.
//2. Build NPC class. Need to figure out customizable options.
//3. Build the "map" renderer. 
//4. Build the game interface.
//5. 

