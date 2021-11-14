let pages = {
    landingPage: document.getElementById('landing-page-container'),
    registrationPage: document.getElementById('registration-container'),
    loginPage: document.getElementById('login-container'),
    map: document.getElementById('map-canvas')
}

let landingButtons = {
    loginSubmit: document.getElementById('login-submit'),
    registerSubmit: document.getElementById('register-submit')
}


let gameRunning = false

//Hate the way I built this function, but the .style method wouldn't recognize "pages[page] object, otherwise I would've just made a generic pages[page] statement."
async function switchPage(page){
    let currentPage = pages['landingPage']
    if(page === 'landingPage'){
        pages['landingPage'].style.display = 'flex'
        pages['map'].style.display = 'none'
        pages['landingPage'] = currentPage
    }
    if(page === 'game' && !gameRunning && await auth){
        pages['landingPage'].style.display = 'none'
        pages['map'].style.display = 'none'
        pages['game'] = currentPage
        gameRunning = true;
        console.log('game launched')
        //make a slight delay before game launches
        wait(3000).then(()=>{
            game();    
        })
        //game functions
    }
    if(page === 'map' && gameRunning){
        pages['landingPage'].style.display = 'none'
        pages['map'].style.display = 'flex'
        //map functions 
    }
    return currentPage
}

//lil timer function
function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
// switchPage('landingPage');
