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

