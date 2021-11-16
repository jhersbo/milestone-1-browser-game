let pages = {
    landingPage: document.getElementById('landing-page-container'),
    registrationPage: document.getElementById('registration-container'),
    loginPage: document.getElementById('login-container'),
    map: document.getElementById('map-canvas'),
    game: document.querySelectorAll('canvas'),
    score: document.getElementById('stopwatch'),
    postGame: document.getElementById('post-game')
}

let landingButtons = {
    loginSubmit: document.getElementById('login-submit'),
    registerSubmit: document.getElementById('register-submit'),
    playAgain: document.getElementById('play-again')
}


let gameRunning = false

//Hate the way I built this function, but the .style method wouldn't recognize "pages[page] object, otherwise I would've just made a generic pages[page] statement."
async function switchPage(page){
    let currentPage = pages['landingPage']
    if(page === 'landingPage'){
        pages['landingPage'].style.display = 'flex'
        pages['map'].style.display = 'none'
        pages['score'].style.display = 'none'
        pages['postGame'].style.display = 'none'
        pages['landingPage'] = currentPage
    }
    if(page === 'game' && !gameRunning && auth){
        pages['landingPage'].style.display = 'none'
        pages['map'].style.display = 'none'
        pages['postGame'].style.display = 'none'
        pages['score'].style.display = 'block'
        pages['game'] = currentPage
        gameRunning = true;
        console.log('game launched')
        //decrease background image brightness
        //make a slight delay before game launches
        wait(100).then(()=>{
            game();
            wait(1000).then(()=>{
                cycle();
            })
        })
    }
    if(page === 'postGame' && gameRunning){
        pages['landingPage'].style.display = 'none'
        pages['map'].style.display = 'none'
        pages['postGame'].style.display = 'block'
        pages['score'].style.display = 'none'
        pages['postGame'] = currentPage
        document.getElementById('final-time').textContent = `Great Job! You collected all 12 melons in ${time} seconds!`
        gameRunning = false
    }
    return currentPage
}

//lil timer function
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

switchPage('landingPage');

//function to play again
function playAgain(){
    auth = true;
    $('#post-game').hide()
    sec = 0
    ms = 0
    stopTime = false
    switchPage('game') 
}

landingButtons['playAgain'].addEventListener('click', ()=>{
    resetTimer()
    playAgain()
})