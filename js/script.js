const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const jobRole = document.querySelector('#title');
const other = jobRole.lastElementChild;
const otherJobRole = document.querySelector('#other-job-role');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const activitiesBox = document.querySelector('#activities-box');
const activities = document.querySelectorAll('label > input[type="checkbox"]');
const activitiesCost = document.querySelector('#activities-cost');
const activitiesField = document.querySelector('#activities');
const formElement = document.querySelector('.container').lastElementChild;
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const ccHint = document.querySelector('#cc-hint');
let totalCost = 0;
let checkAll = [];


// HELPER FUNCTIONS _START _____________________________________________________________

// display function show or hide, also working in loops
function display (element, display, i) {
   
    if(i) {
        element.options[i].style.display = display; 
    } else {
        element.style.display = display;
    }
}

// check if required fields are valid formation.. if yer return true if not return false
const check =  {
    username(username) {
        return /^[\w\d]+/.test(username);
    },
    email(email) {
        return /[^@]+@[^@.]+\.[a-z]+/i.test(email);
    },
    ccNum(ccNum) {
        return  /^\d{13,16}$/.test(parseInt(ccNum));
    },
    zip(zip) {
        return /^\d{5}$/.test(parseInt(zip));
    },
    cvv(cvv){
        return /^\d{3}$/.test(parseInt(cvv));
    }
};

//add end remove focus class on event
function focusBlur () {
    for(let i = 0; i < activities.length; i++) {
        activities[i].addEventListener('focus', () => {
            activities[i].parentElement.className = 'focus';
        })
        activities[i].addEventListener('blur', () => {
            activities[i].parentElement.className = '';
        })
    }
}

//get any perent element.... pE - perent element function
function pE (element) {
    let parentE = element.parentElement;
    return parentE;
}

// validate inputs by calling pE function and display functions. Element should by the "check" object - call methods
function validate(element, value) {
    if(!element) {
        pE(value).className = 'not-valid';
        display(pE(value).lastElementChild, 'block'); 

        return false;
    } else {
        pE(value).className = 'valid';
        display(pE(value).lastElementChild, 'none');
        checkAll.push(value.value);
        return true;
    }
}

// HELPER FUNCTIONS _END __________________________________________________________________________



// set the elements for first page load
userName.focus();
display(otherJobRole, 'none');
color.disabled = true;
payment.options[1].selected = true;
display(payPal, 'none');
display(bitcoin, 'none');


//Listener functions _START _______________________________________________________________________

// job role function to hide or show input
const jobRoleListener = (e) => {
    let input = e.target.value;
    
    if(input == 'other') {
        display(otherJobRole, 'block');
    } else {
        display(otherJobRole, 'none');
    }
}

// enable color selection and show available color by design input
const designListener = (e) => {
    let input = e.target.value;
    input ? color.disabled = false : '';

    for(let i = 1; color.options.length > i; i++) {
        let choosedColor = color.options[i].getAttribute('data-theme');

        if(input == choosedColor) {
            display(color, 'block', i);
            color.options[i].selected = true;
        } else {
            display(color, 'none', i);
            color.options[i].selected = false;
        }
    }
}

// get the changed input end save the value to the totaCost variable.
const activitiesBoxListener = (e) => {
    let input = e.target;
    let dayTimeChoosed = input.getAttribute('data-day-and-time');
    let price = input.getAttribute('data-cost');
    
    price = parseInt(price);
    input.checked ? totalCost += price : totalCost -= price;
    
        // loop over the activities and set disabled the same timeand day span - [data-day-and-time]
        for(let i = 1; activities.length > i; i++){
            if(input.checked && input !== activities[i] &&  dayTimeChoosed === activities[i].getAttribute('data-day-and-time')){
                
                    activities[i].parentElement.classList.add('disabled');
                    activities[i].disabled = true;
                 //   console.log(activities[i] )
               
            } else {
                if(input.disabled !== true &&  activities[i].checked === false && activities[i].getAttribute('data-day-and-time') == dayTimeChoosed) {
                    activities[i].parentElement.classList.remove('disabled');
                    activities[i].disabled = false;
                }
                
                
            }
           
        }
   

    //inner the totalCost
    activitiesCost.innerHTML = `Total: $${totalCost}`;
}

// set the choosed paymant method - show or hide the current paymant method
const paymentListener = (e) => {
    let value = e.target.value;
    display(bitcoin, 'none');
    display(payPal, 'none');
    display(creditCard, 'none');

   if(value === 'bitcoin') {
        display(bitcoin, 'block');
   } else if (value == 'paypal') {
        display(payPal, 'block');
   } else {
        display(creditCard, 'block');
   }
}

//validate the submited form call validate function for valideting
const formElementListener = (e) => {
    e.preventDefault();
    checkAll = [];
    validate(check.username(userName.value), userName);
    validate(check.email(email.value), email);
    validate(check.ccNum(ccNum.value), ccNum);
    validate(check.zip(zip.value), zip);
    validate(check.cvv(cvv.value), cvv);

    if(!totalCost){
        activitiesField.classList.remove('valid')
        activitiesField.classList.add('not-valid');
        activitiesField.lastElementChild = 'block';  
        } else {
            activitiesField.classList.add('valid')
            activitiesField.classList.remove('not-valid');
            activitiesField.lastElementChild = 'none';
            checkAll.push(totalCost);
        }
    
        // if all field has been validated push to the check array.. if array equel to 6 required field will submit the form
        if(checkAll.length >= 6) {
            alert(`Thank you for your order ${checkAll[0]}. You have paid ${checkAll[5]}. Your confirmation email has been send on ${checkAll[1]}`);
            window.location.reload();
        }
   
    
};


//Listener functions _END _____________________________________________________________________


//key up events for real time errors - simple call the validate functions
userName.addEventListener('keyup', (e) => {
    validate(check.username(userName.value), userName);  
});

email.addEventListener('keyup', () => {
    validate(check.email(email.value), email);
});

// this key up listen for input and give real time inputs - show how many numbers to be left untill 13 digit [input.length = 'current typed digit']
ccNum.addEventListener('keyup', (e) => {
    let input = e.target.value;

    if(input.length <= 12 ) {
        let leftNumbers = 13 - input.length;
        ccHint.innerHTML = `Enter minimum ${leftNumbers} more numbers`;
        ccHint.style.display = 'block';
    } else {
        ccHint.innerHTML = `Credit card number must be between 13 - 16 digits`;
        validate(check.ccNum(ccNum.value), ccNum);
    }
    
});

zip.addEventListener('keyup', () => {
    validate(check.zip(zip.value), zip);
});

cvv.addEventListener('keyup', () => {
    validate(check.cvv(cvv.value), cvv);
});


//finally call listeners for all inputs and form______________________________________________THE END_______________________________
jobRole.addEventListener('change', jobRoleListener);
design.addEventListener('change', designListener);
activitiesBox.addEventListener('change', activitiesBoxListener);
payment.addEventListener('change', paymentListener);
formElement.addEventListener('submit', formElementListener)
focusBlur();













