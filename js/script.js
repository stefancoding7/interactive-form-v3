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
const formElement = document.querySelector('.container').lastElementChild;
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

let totalCost = 0;

// HELPER FUNCTIONS _START

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
}

// HELPER FUNCTIONS _END

// set the elements for first page load
userName.focus();
display(otherJobRole, 'none');
color.disabled = true;
payment.options[1].selected = true;
display(payPal, 'none');
display(bitcoin, 'none');

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
        console.log(choosedColor);

        if(input == choosedColor) {
            display(color, 'block', i);
            color.options[i].selected = true;
        } else {
            display(color, 'none', i);
            color.options[i].selected = false;
        }
    }
}

const activitiesBoxListener = (e) => {
    let input = e.target;
    let price = input.getAttribute('data-cost');
    
    price = parseInt(price);
    input.checked ? totalCost += price : totalCost -= price;
   
    activitiesCost.innerHTML = `Total: $${totalCost}`;
}

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

jobRole.addEventListener('change', jobRoleListener);

design.addEventListener('change', designListener);

activitiesBox.addEventListener('change', activitiesBoxListener);

payment.addEventListener('change', paymentListener);



















