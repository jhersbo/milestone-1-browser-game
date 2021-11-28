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
switchPage('landingPage')
//Hate the way I built this function, but the .style method wouldn't recognize "pages[page] object, otherwise I would've just made a generic pages[page] statement."
async function switchPage(page){
    let currentPage = pages['landingPage']
    //landing page condition
    if(page === 'landingPage'){
        //jQuery for poorly-behaving element
        $('#main-title').show()
        $('game-description').show()
        $('controls').show()
        $('#landing-hero-right').show()
        pages['landingPage'].style.display = 'flex'
        pages['map'].style.display = 'none'
        pages['score'].style.display = 'none'
        pages['postGame'].style.display = 'none'
        pages['landingPage'] = currentPage
    }
    //game page condition
    if(page === 'game' && !gameRunning && auth){
        pages['landingPage'].style.display = 'none'
        pages['registrationPage'].style.display = 'none'
        pages['loginPage'].style.display = 'none'
        pages['map'].style.display = 'none'
        pages['postGame'].style.display = 'none'
        pages['score'].style.display = 'block'
        pages['game'] = currentPage
        gameRunning = true;
        console.log('game launched')
        //decrease background image brightness
        wait(100).then(()=>{
            game();
            wait(1000).then(()=>{
                cycle();
            })
        })
    }
    //postgame page condition
    if(page === 'postGame' && !gameRunning){
        console.log('postgame')
        pages['landingPage'].style.display = 'none'
        pages['registrationPage'].style.display = 'none'
        pages['loginPage'].style.display = 'none'
        pages['map'].style.display = 'none'
        //jQuery for poorly-behaving element
        $('#post-game').show(100)
        $('#main-title').hide()
        $('#game-description').hide()
        $('#controls').hide()
        $('#landing-hero-right').hide()
        pages['postGame'].style.display = 'block'
        pages['score'].style.display = 'none'
        pages['postGame'] = currentPage
        document.getElementById('final-time').textContent = `Great Job! You collected all 12 melons in ${time} seconds!`
    }
    return currentPage
}

//lil timer function
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

;

//function to play again
function playAgain(){
    auth = true;
    //jQuery for poorly-behaving element
    $('#post-game').hide(100)
    sec = 0
    ms = 0
    stopTime = false
    switchPage('game') 
}
//event listener for the play again button
landingButtons['playAgain'].addEventListener('click', ()=>{
    resetTimer()
    playAgain()
})