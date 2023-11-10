//Form Validation

const userForm = document.getElementById("userForm");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");


userForm.addEventListener('submit', function (e){
    e.preventDefault();

    let isValid = true;

    // username validation 

    if(userNameInput.value.length < 3){
        showError(userNameInput, "Username must be at least 3 characters long.");
        isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(emailRegex.test(emailInput.value))

    if(!emailRegex.test(emailInput.value)) {
        showError(emailInput,  "Please enter a valid email.")
        isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if(!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput,   "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character.")
        isValid = false;
    }

    if(passwordInput.value !== confirmPasswordInput.value){
        showError(confirmPasswordInput, "passwords do not match");
        isValid = false;
    }
    if(isValid){
        alert('Form submitted successfully')
    }
})


// show error message and highlight the input
function showError(input, message){
const errorDiv = document.getElementById(input.id + "Error");
errorDiv.textContent = message;
input.classList.add('error')
}
const myinputsArray = [userNameInput, emailInput, passwordInput, confirmPasswordInput]
document.querySelectorAll('input').forEach(input =>{
input.addEventListener('input', ()=>{
    input.classList.remove('error');
    document.getElementById(input.id + 'Error').textContent = '';
})
})
