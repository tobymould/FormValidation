//-------------------1. GRAB ELEMENTS-------------------//
// a. Grab Entire Form itself
const form = document.getElementById("form");
// b. Grab Each Input
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//-------------------3. CREATE SUPPORT FUNCTIONS-------------------//
//----3a. Show 'input error' message in HTML----//
function showError(input, message) {
  const formControl = input.parentElement; //grab Class 'form-control'
  formControl.className = "form-control error"; //change parent classname
  const small = formControl.querySelector("small"); //grab <small> tag...
  small.innerText = message; //...Replace its inner text w/ 'message'.
}
//----3b. Show success outline----//
function showSuccess(input) {
  const formControl = input.parentElement; //Grab Class 'form-control'...
  formControl.className = "form-control success"; //Change its Class to inc. 'success'
}
//----3c. Check e-mail is valid (took this RegEx from Stack Overflow)----//
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // RegExpression for email validation (stackOverflow)
  if (re.test(input.value.trim())) { //If test input against this criteria True...
    showSuccess(input);               //Run success function...
  } else {
    showError(input, "Email is not valid"); //Otherwise run error function.
  }
}
//----3d. Check Required Fields:----//
function checkRequired(inputArr) { //checking ARRAY of values...
  inputArr.forEach(function (input) { //for each ARRAY INPUT...
    if (input.value.trim() === "") { //If input (w/o white spaces) is empty...
      showError(input, `${getFieldName(input)} is required`); //run error function
    } else {
      showSuccess(input);//Otherwise, run success Function.
    }
  });
}
//----3e. Check Input Length:----//
function checkLength(input, min, max) {
  if (input.value.length < min) { //if length of input LESS THAN MIN allowed...
    showError( //...run error function
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) { //If length of input GREATER THAN MAX allowed...
    showError( //...ALSO run error function
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else { //Otherwise, run success function.
    showSuccess(input);
  }
}
//----3f. Check Passwords match----//
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) { //if input from password DOES NOT match repeated password...
    showError(input2, "Passwords do not match"); //...run error function.
  }
}
//----3g. Get field name----//
function getFieldName(input) { //To make input title's first character a capital letter. 
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
} //take character @ position[0] of id, turn it to upper case. Then, Concatenate the rest of the characters from [1] onward to the end.

//-------------------2. CREATE EVENT LISTENER & HANDLER-------------------//
// Create Event lister for 'submit' on form.
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Prevent submit(leave page) and instantaenous refresh.

  checkRequired([username, email, password, password2]); //The way to run multiple variables from different places on the page thru a single function, to cut code down (clean code practice).
  checkLength(username, 3, 15); //min 3, max 15.
  checkLength(password, 6, 25); //min 6, max 25.
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

/*-------------------LESSONS LEARNED-------------------
> General Layout:
    1st) Element Grabs
    2nd) Event Handler functions
    3rd) Event Listeners.

> TIP - Like to use ID's when pulling stuff from the DOM, so therefore use 'getElementByID' - since last lesson said "ID's for Javascript" - THIS IS A GOOD WAY TO TELL IF YOU'RE FOLLOWING GOOD PRACTICE.

> Use 'console.log' on elements you're trying to select (+ with your online developer tools console) to test what value you're grabbing hold of.

> You want to grab both the overall <div> of the form that encases the inputs, as well as also grabbing those said elements inside.
  > esp. when have a form, so you can attach a 'submit' event listener to it.

> If you have a nested function (function2 inside a EVENTHANDLERfunction1), and that inside function2 has to be general purpose, do the following:

   a. When CREATING the general function, set with general arg names:
        function showError(input, message);

   b. When CALLOUT inside the specific function, insert the specific args:
        showError(username, "Username is required");

> e.preventDefault() - use when submit form - Otherwise, when you click 'submit', it just flashes for a moment - its coz form is submitted to this file.

> What the 'className' property does - it essentially replaces the ENTIRE CLASS currently in the HTML of that element, DOESN'T ADD TO IT. Therefore, if want to keep class thats there already, need to include in the above as well as the extra class, separated by a space.

> When trying to create properties when there is an error, need to put in css '.parentElementClassname.error errorMessageTag {...}'.
> QuerySelector can take in a tag/ID/class */
