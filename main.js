
//Form Validation---------------------------------------------------------------------------------------------------
const userForm = document.getElementById("userForm");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const checkBox = document.getElementById("admin");
const logoutButton = document.querySelector(".logout-button");
//If the admin checkbox is checked, set a flag to indicate the user's admin status.
let userStatus=false;

// show error message and highlight the input
function showError(input, message){
const errorDiv = document.getElementById(input.id + "Error");
errorDiv.textContent = message;
input.classList.add('error')
}
// const myinputsArray = [userNameInput, emailInput, passwordInput]
const inputs=document.querySelectorAll('input');//return NodeList
//Converting a NodeList to an array
var inputsArr = Array.prototype.slice.call(inputs).slice(0,3);
console.log(inputsArr);
inputsArr.forEach(input =>{
input.addEventListener('input', ()=>{
    input.classList.remove('error');
    document.getElementById(input.id + 'Error').textContent = '';
})
})

userForm.addEventListener('submit', function (e){
    e.preventDefault();
    let isValid = true;
    // username validation 
    if(userNameInput.value.length < 3){
        showError(userNameInput, "Username must be at least 3 characters long.");
        isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(emailInput.value)) {
        showError(emailInput,  "Please enter a valid email.")
        isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if(!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput,   "Password must be at least 8 characters long, containing lowercase, uppercase letters, numbers, and a special character.")
        isValid = false;
    }

    if(isValid){
        userStatus=checkBox.checked;
        //console.log(`userStatus=${userStatus}`);
        localStorage.setItem("obj1", JSON.stringify({name:userNameInput.value,
            email:emailInput.value,
            password:passwordInput.value,
            admin:checkBox.checked
        }));
        //console.log(JSON.parse(localStorage.getItem("obj1")));
        //alert('Form submitted successfully')
        window.location.replace("./flights.html");
    }
})

logoutButton.addEventListener('click',function (){
    localStorage.clear();
   // window.location.replace("./");

})