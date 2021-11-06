$(document).ready( () =>{
    //jQuery methods that I want to run on load should go here.
})

//Handles different aspect ratios.
let gameWidth = window.innerWidth;
let gameHeight = window.innerHeight;
let ratio = 1.5;
if (gameHeight / gameWidth < ratio){
    gameWidth = Math.ceil(gameHeight / ratio)
}
$('#element').css({
    'height': gameHeight + 'px',
    'width': gameWidth + 'px',
})
$('#modal-content').css({
    'width': gameWidth + 'px',
})
/////////////////////////////////

//TODO:
//1. Build playable character class.
//2. Build NPC class. Need to figure out customizable options.
//3. Build the "map" renderer. 
//4. Build the game interface.
//5. 

