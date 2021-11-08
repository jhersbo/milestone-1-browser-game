let pages = {
    landingPage: document.getElementById('landing-page-container'),
    registrationPage: document.getElementById('registration-container'),
    loginPage: document.getElementById('login-container'),
    game: document.getElementById('game-canvas'),
}

let buttons = {
    registrationButton: document.getElementById('register-button'),
    loginButton: document.getElementById('login-button'),
}

let currentPage = pages['loginPage']
let gameRunning = false

