/*=============Variables=============*/

var logEmail = document.getElementById('CE');
var logPassword = document.getElementById('CP');
var Name = document.getElementById('Name');
var Email = document.getElementById('Email');
var Password = document.getElementById('Password');
var showdiv = document.getElementById('intro1');
var hiddiv = document.getElementById('inputdiv');

/*=============Regex=============*/

var emailRegx = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passwordRegx = /^(?=.*?[a-z]).{8,}$/;
var nameRegx = /^[a-z0-9_-]{3,50}$/;

// User Database
var Userdbase = JSON.parse(localStorage.getItem('Userdbase')) || [];

/*=============Functions=============*/

/*=============Validation for login Function=============*/

function validateInput(regex, input) {
    return regex.test(input.value);
}

function validationLog() {
    var isLogEmailValid = validateInput(emailRegx, logEmail);
    var isLogPasswordValid = validateInput(passwordRegx, logPassword);

    if (!isLogEmailValid || !isLogPasswordValid) {
        alert('Something went wrong .. check your entry');
        logEmail.value = "";
        logPassword.value = "";
        return;
    }
    logcheck();
}

/*=============User check Function=============*/

function logcheck() {
    var user = Userdbase.find(function (User) {
        return User.email === logEmail.value && User.password === logPassword.value;
    });

    if (!user) {
        alert('Invalid email or password');
        logEmail.value = "";
        logPassword.value = "";
    } else {
        window.location.href = 'index3.html';
    }
}

/*=============Validation for Entry Function=============*/

function validationEntry() {
    var isNameValid = validateInput(nameRegx, Name);
    var isEmailValid = validateInput(emailRegx, Email);
    var isPasswordValid = validateInput(passwordRegx, Password);

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
        alert('Something went wrong .. check your entry');
        
        Password.value = "";
        return;
    }
    addUser();
}

/*=============Adding Function=============*/

function addUser() {
    var userEmail = Email.value.trim().toLowerCase();
    var isExistingUser = Userdbase.some(function (user) {
        return user.email.toLowerCase() === userEmail;
    });

    if (isExistingUser) {
        alert('User with this email already exists.');
        return;
    }

    var Userdata = {
        name: Name.value,
        email: Email.value,
        password: Password.value,
    };

    Userdbase.push(Userdata);
    localStorage.setItem('Userdbase', JSON.stringify(Userdbase));

    Name.value = "";
    Email.value = "";
    Password.value = "";
    show();

    console.log(Userdbase);
}

function show() {
    showdiv.classList.remove('d-none');
    showdiv.classList.add('col-12');
    hiddiv.classList.add('d-none');
}

function goback() {
    window.location.href = 'index.html';
};

/*=============Time & Date Function=============*/

function updateDateTime() {
    var now = new Date();
    var dateTimeString = now.toLocaleString();
    document.getElementById('T-D').textContent = dateTimeString;

}

updateDateTime();
setInterval(updateDateTime, 1000);
