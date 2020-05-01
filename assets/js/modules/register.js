// Request class
import {Requests} from '../requests.js';
let requests = new Requests();

// Get register form
let regForm = document.getElementById('reg-form');

// Register form event listener
regForm.addEventListener('submit', () => {

    // Get DOM elements from form-register
    let email = document.getElementById('reg-password');
    let password = document.getElementById('reg-password');
    let confirmPassword = document.getElementById('reg-repassword');

    // formData input
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    // formData.append('url', );

    // Post request
    requests.postRequest('register', formData);
})