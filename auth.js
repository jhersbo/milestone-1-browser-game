let inputs = {
    userRegistration: document.getElementById('username-input'),
    userRegPass1: document.getElementById('password1'),
    userRegPass2: document.getElementById('password2'),
    loginUser: document.getElementById('login-username'),
    loginPass: document.getElementById('login-password'),
}
let formButtons = {
    register: document.getElementById('register-submit'),
    login: document.getElementById('login-submit'),
}
//Verify that passwords match
function passwordMatch(){
    if (inputs.userRegPass1.value === inputs.userRegPass2.value){
       return inputs.userRegPass1.value
    }else{
        window.alert('Passwords do not match. Please try again.')
    }
}

//Packaging data
function intakeRegData(){
    let regData = {
        username: inputs.userRegistration.value,
        password: passwordMatch(),
    }
    return regData;
}

function intakeLoginData(){
    let loginData = {
        username: inputs.loginUser.value,
        password: inputs.loginPass.value
    }
    return loginData;
}
//Auth API **THANKS KATIE :)**

// https://game-auth.herokuapp.com
// to register: send body with username & password to “/register”
// to login: send body with username & password to “/login”

let auth;
async function saveRegCredentials(data){
    let response = await fetch('https://game-auth.herokuapp.com/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if(response.ok){
        console.log('response ok')
        auth = true
    }else{
        auth = false
    }
    return auth;
}

async function getRegCredentials(data){
    let response = await fetch('https://game-auth.herokuapp.com/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if(response.statusText === 'OK'){
        console.log('response ok')
        auth = true
    }else{
        auth = false
    }
    return auth;
}
//Form buttons and event listeners
//................................
formButtons['register'].addEventListener('click', e =>{
    e.preventDefault();
    let regObj = intakeRegData()
    saveRegCredentials(regObj);
    switchPage('game')
})

formButtons['login'].addEventListener('click', e =>{
    e.preventDefault();
    let loginObj = intakeLoginData();
    getRegCredentials(loginObj);
    switchPage('game')
})