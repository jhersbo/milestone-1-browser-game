let inputs = {
    userRegistration: document.getElementById('username-input'),
    userRegPass1: document.getElementById('password1'),
    userRegPass2: document.getElementById('password2'),
    loginUser: document.getElementById('login-username'),
    loginPass: document.getElementById('login-password'),
}
let formButtons = {
    register: document.getElementById('register-submit'),
    login: document.getElementById('login-button'),
}

async function saveRegCredentials(){
    
}

formButtons['register'].addEventListener('click', e =>{
    e.preventDefault();
    saveRegCredentials();
})