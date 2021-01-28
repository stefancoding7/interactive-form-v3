const userName = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const other = jobRole.lastElementChild;
const otherJobRole = document.querySelector('#other-job-role');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const activitiesBox = document.querySelector('#activities-box').childNodes;
const activitiesCost = document.querySelector('#activities-cost');
const formElement = document.querySelector('.container').lastElementChild;
const payPal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');

let totalCost = 0;
// set user input focus tu true - When the page first loads, the first text field  will focus state by default to prompt the user.
userName.focus();
// Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
otherJobRole.style.display = 'none';

display(paypal, 'none');
display(bitcoin, 'none');


color.disabled = true;

function display (element, display) {
    element.style.display = display;
}


/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */
jobRole.addEventListener('change', (e) => {
    
  
    if(e.target.value === other.value) {
        display(otherJobRole, 'block');
    }
});

/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

console.log(color.options[4].getAttribute('data-theme'));

design.addEventListener('change', (e) => {
    color.disabled = false;
 
      for(let i = 1; i < color.options.length; i++) {
          
        let choosedColor = color.options[i].getAttribute('data-theme');
        if (e.target.value == choosedColor) {
            
            color.options[i].style.display = 'block';
            color.options[i].selected = true;
        } else {
            color.options[i].style.display = 'none';
            color.options[i].selected = false;
        }
      }       
    
});

/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */



 for(let i = 1; activitiesBox.length -1 > i; i++){
    
    
     activitiesBox[i].addEventListener('change', (e) => {
         let choosedCost = parseInt(e.target.getAttribute('data-cost'));
        let inputCheckBox = activitiesBox[i].firstElementChild
         if(inputCheckBox.checked) {
            totalCost += choosedCost;
         } else {
            totalCost -= choosedCost;
             
           
         }
         

         activitiesCost.innerHTML = `Total: $${totalCost}`;

         
      });
 }


/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */
payment.addEventListener('change', (e) => {
    let choosedMethod = e.target.value;
    display(bitcoin, 'none');
    display(payPal, 'none');
    if(choosedMethod === 'paypal') {
        display(payPal, 'block');
        display(creditCard, 'none');
    } else if (choosedMethod === 'bitcoin') {
        display(bitcoin, 'block');
        display(creditCard, 'none');
    } else {
        display(creditCard, 'block');
    }
})

/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {string} A good string
 *
 * @example
 *
 *     foo('hello')
 */

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('clicked')
})



















