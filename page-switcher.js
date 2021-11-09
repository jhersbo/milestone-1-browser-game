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

//Switch page function here

switchPage();