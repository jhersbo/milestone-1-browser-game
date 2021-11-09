let pages = {
    landingPage: document.getElementById('landing-page-container'),
    registrationPage: document.getElementById('registration-container'),
    loginPage: document.getElementById('login-container'),
    game: document.getElementById('game-canvas'),
    map: document.getElementById('map-canvas')
}

let landingButtons = {
    registrationButton: document.getElementById('register-button'),
    loginButton: document.getElementById('already-have-account-login'),
}

let currentPage = pages['loginPage']
let gameRunning = false

function switchPage(page){
    if (currentPage && currentPage.style){
        currentPage.style.display = 'none';
        pages[page].style.display = 'flex';
        currentPage = pages[page]
    }
    if (page === 'game' && !gameRunning){
        pages['landingPage'].style.display = 'none'
        gameRunning = true
        // invoke runGame function here
    }
    if (page === 'loginPage'){
        // login function goes here
    }
    if (page === 'registrationPage'){
        //registration function goes here
    }
    return currentPage;
}

//Landing page nav button setup

// landingButtons.registrationButton.addEventListener('click', e =>{
//     e.preventDefault()
//     switchPage('registrationPage')
// }, false)

// landingButtons.loginButton.addEventListener('click', e =>{
//     e.preventDefault()
//     switchPage('loginPage')
// }, false)

// switchPage()

