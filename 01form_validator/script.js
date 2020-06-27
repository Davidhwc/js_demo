//get element
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

//show inputsuccess message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

//check email is valid
function checkEmail(input) {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!re.test(input.value)) {
        showError(input, `${getKeyWord(input)}格式错误`);
    } else {
        showSuccess(input)
    }
}

//get keywords
function getKeyWord(input) {
    return input.placeholder.slice(3);
}

//check required
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value === "") {
            showError(input, `${getKeyWord(input)}为必填项`);
        } else {
            showSuccess(input);
        }
    });
}

//check length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getKeyWord(input)}至少${min}字符`);
    } else if (input.value.length > max) {
        showError(input, `${getKeyWord(input)}最多${max}字符`);
    } else {
        showSuccess(input);
    }
}

//check password
function checkPassWord(password,password2){
    if(password.value===password2.value){
        showSuccess(password2);
    }else{
        showError(password2,"确认密码与密码不相同");
    }
}
//event Listener

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 12);
    checkLength(password, 6, 12);
    checkLength(password2, 6, 12);
    checkEmail(email);
    checkPassWord(password,password2);
});