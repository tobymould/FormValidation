// 1. GRAB ELEMENTS:
// a. Grab Entire Form itself
const form = document.getElementById("form");
// b. Grab Each Input
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check e-mail is valid (took this RegEx from Stack Overflow)
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}
// Check Required Fields:
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Check Input Length:
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Check Passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//
//
// The input values
form.addEventListener("submit", function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15); //min 3, max 15.
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

/* Lessons:
> General Layout: 
    1st) Element Grabs 
    2nd) Event Handler functions 
    3rd) Event Listeners.

> TIP - Like to use ID's when pulling stuff from the DOM, so therefore use 'getElementByID' - since last lesson said "ID's for Javascript" - THIS IS A GOOD WAY TO TELL IF YOU'RE FOLLOWING GOOD PRACTICE.
> Use 'console.log' on elements you're trying to select (with your online developer tools console) to test what value you're grabbing hold of.
> You want to grab both the overall <div> of the form that encases the inputs, as well as also grabbing those said elements inside.
  > esp. when have a form, so you can attach a 'submit' event listener to it.
> If you have a nested function (function2 inside a function1), and that inside function2 has to be general purpose, do the following:

   a. When CREATING the general function, set general arg names:
        function showError(input, message); 

   b. When CALLOUT inside the specific function, insert the specific args:
        showError(username, "Username is required");

> e.preventDefault() - use when submit form - Otherwise, when you click 'submit', it just flashes for a moment - its coz form is submitted to this file.

> What the 'className' property does - it essentially replaces the ENTIRE CLASS currently in the HTML of that element, DOESN'T ADD TO IT. Therefore, if want to keep class thats there already, need to include in the above as well as the extra class, separated by a space.

> When trying to create properties when there is an error, need to put in css '.parentElementClassname.error errorMessageTag {...}'.
> QuerySelector can take in a tag/ID/class */
