let pages = {
    landingPage: document.getElementById('landing-page-container'),
    registrationPage: document.getElementById('registration-container'),
    loginPage: document.getElementById('login-container'),
    game: document.getElementById('game-canvas'),
    map: document.getElementById('map-canvas')
}

let landingButtons = {
    navToRegistrationButton: document.getElementById('register-button'),
    navToLoginButton: document.getElementById('login-btn'),
    loginSubmit: document.getElementById('login-button'),
    registerSubmit: document.getElementById('register-submit')
}

let currentPage = pages['loginPage']
let gameRunning = false

function switchPage(page){
    if(currentPage && currentPage.style){
        currentPage.style.display = 'none'
        pages[page].style.display = 'block'
        currentPage = pages[page]
        
    }
    if(page === 'game' && !gameRunning){
        pages['landingPage'].style.display = 'none'
        gameRunning = true
        //Game running functions go here
    }
    if(page === 'login'){
        //Login setup functions go here
    }
    if(page === 'register'){
        //Registration setup
    }
    return currentPage;
}

landingButtons['navToRegistrationButton'].addEventListener('click', e =>{
    e.preventDefault();
    switchPage('registratonPage')
}, false)

landingButtons['navToLoginButton'].addEventListener('click', e =>{
    e.preventDefault();
    switchPage('loginPage')
}, false)

switchPage('loginPage');