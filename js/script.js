const userName = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const other = jobRole.lastElementChild;
const otherJobRole = document.querySelector('#other-job-role');
const color = document.querySelector('#color');
const design = document.querySelector('#design');
const activitiesBox = document.querySelector('#activities-box').childNodes;

// set user input focus tu true - When the page first loads, the first text field  will focus state by default to prompt the user.
userName.focus();
// Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
otherJobRole.style.display = 'none';

color.disabled = true;




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
        otherJobRole.style.display = 'block';
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



//  for(let i = 1; activitiesBox.length -1 > i; i++){
//      let activitiesCheckBox = activitiesBox[i].firstElementChild;

//      console.log(activitiesCheckBox)
//       activitiesCheckBox.addEventListener('change', (e) => {
//            // console.log(e.target.getAttribute('data-cost'))
//       });
//  }
//



















