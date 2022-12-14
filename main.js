// VARIABLES


// Copy to clipboard
const copyBtn = document.getElementById('iconCopy');
const copyText = document.getElementById('coppiedText');


// Range Slider
const rangeSlider = document.getElementById('rangeSlider');
let charLengthVal = document.getElementById('charLengthValue');


// Password Components
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');


// Button
const generatePasswordBtn = document.getElementById('generateBtn');
const generateBtnCopy = document.getElementById('generateBtnCopy');
const arrowRight = document.getElementById('iconArrowRight');


// Password Output
let passwordContainer = document.getElementById('passwordContainerCopy');
let passwordStrengthCopy = document.getElementById('strengthChartCopy');
const barOne = document.getElementById('barOne');
const barTwo = document.getElementById('barTwo');
const barThree = document.getElementById('barThree');
const barFour = document.getElementById('barFour');


// Password Arrays
const LOWER_CASE_ARR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const UPPER_CASE_ARR = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const SYMBOLS = ['!', '"', "'", '#', '$', '%', '&','(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '>', '?', '@', '[', '^', '_', '`', '{', '}', '|', '~'];


// COPY TO CLIPBOARD FUNCTIONALITY FOR MOBILE AND TABLET
copyBtn.addEventListener('click', () => {
  let coppiedText = passwordContainer.innerHTML;
  navigator.clipboard.writeText(coppiedText).then(() => {
    alert('Password has been copied to clipboard!');
  });
});


// COPY TO CLIPBOARD FUNCTIONALITY FOR DESKTOP
function copyToClipboard(desktopSize) {
  if (desktopSize.matches) {
    copyBtn.addEventListener('click', () => {
      let coppiedText = passwordContainer.innerHTML;
      navigator.clipboard.writeText(coppiedText).then(() => {
        copyText.style.display = 'block';
      });
    });
  }
}

let desktopSize = window.matchMedia('(min-width: 1280px)');
copyToClipboard(desktopSize);
desktopSize.addListener(copyToClipboard);

// RANGE SLIDER FUNCTIONALITY

// Change charcter length value
rangeSlider.oninput = function() {
  charLengthVal.innerHTML = this.value;
}


// Change background color of slider
rangeSlider.addEventListener('mousemove', () => {
  let val = rangeSlider.value;
  let color = 'linear-gradient(90deg, var(--neon-green)' + val*5 + '%, var(--almost-white)' + val*5 + '%)';
  rangeSlider.style.background = color;            
});


// BUTTON HOVER EVENTS

// mouseenter
generatePasswordBtn.addEventListener('mouseenter', () => {
  generatePasswordBtn.style.cursor = 'pointer';
  generatePasswordBtn.style.backgroundColor = 'var(--dark-grey)';
  generatePasswordBtn.style.border = '2px solid var(--neon-green)';
  generateBtnCopy.style.color = 'var(--neon-green)';
  arrowRight.style.backgroundImage = 'url(./assets/images/icon-arrow-right-hover.svg)';
});


// mouseleave
generatePasswordBtn.addEventListener('mouseleave', () => {
  generatePasswordBtn.style.backgroundColor = 'var(--neon-green)';
  generatePasswordBtn.style.border = 'none';
  generateBtnCopy.style.color = 'var(--dark-grey)';
  arrowRight.style.backgroundImage = 'url(./assets/images/icon-arrow-right.svg)';
});


// PASSWORD GENERATION

// Check to see if all fields are empty
document.addEventListener('change', () => {
  if (parseInt(charLengthVal.innerHTML) == 0 &&
      !includeUppercase.checked &&
      !includeLowercase.checked &&
      !includeNumbers.checked &&
      !includeSymbols.checked) {
        passwordContainer.style.color = 'var(--grey)';
        passwordStrengthCopy.style.display = 'none';
        resetBarVal();
      } else if (parseInt(charLengthVal.innerHTML) > 0 &&
        (includeUppercase.checked ||
         includeLowercase.checked ||
         includeNumbers.checked ||
         includeSymbols.checked)) {
        passwordContainer.style.color = 'var(--almost-white)';
    }
  });



// MAIN CLICK FUNCTION

// Button event listener
generatePasswordBtn.addEventListener('click', generatePassword);


// FUNCTIONS

// Generate Password Function
function generatePassword() {

  // create array from password component selections
  let newArr = [];
  if (includeUppercase.checked) {
    newArr = newArr.concat(UPPER_CASE_ARR);
  }
  if (includeLowercase.checked) {
    newArr = newArr.concat(LOWER_CASE_ARR);
  }
  if (includeNumbers.checked) {
    newArr = newArr.concat(NUMBERS);
  }
  if (includeSymbols.checked) {
    newArr = newArr.concat(SYMBOLS);
  }

  // Create password
  let password = '';
  let passwordLength = parseInt(charLengthVal.innerHTML);
  
  // Adds random char to password
  while (passwordLength > 0) {
    password += newArr[Math.floor(Math.random() * newArr.length)];
    passwordLength--;
  }

  passwordContainer.innerHTML = password;

  changeBarChart(getStrengthString(checkPasswordStrength(password)));
  copyText.style.display = 'none';

}


// Remove color classes from bar chart
function resetBarVal() {
  barOne.className = '';
  barTwo.className = '';
  barThree.className = '';
  barFour.className = '';
  barOne.classList.add('bar');
  barTwo.classList.add('bar');
  barThree.classList.add('bar');
  barFour.classList.add('bar');
}


// Check password strength
function checkPasswordStrength(password) {
  let weaknessArr = [];
  weaknessArr.push(checkPasswordLength(password));
  weaknessArr.push(checkLowercaseWeakness(password));
  weaknessArr.push(checkUppercaseWeakness(password));
  weaknessArr.push(checkNumberWeakness(password));
  weaknessArr.push(checkSymbolsWeakness(password));
  let sum = 0;
  weaknessArr.forEach(x => sum += x);
  return sum;
}


// check password length weakness
function checkPasswordLength(password) {
  const passwordLength = password.length;

  if (passwordLength <= 5) {
    return 20;
  } else if (passwordLength <= 10) {
    return 10;
  } else if (passwordLength <= 15) {
    return 5;
  } else if (passwordLength > 15) {
    return 0;
  }
}


// Check lowercase weakness
function checkLowercaseWeakness(password) {
  return checkTypeWeakness(password, /[a-z]/g);
}

// Check uppercase weakness
function checkUppercaseWeakness(password) {
  return checkTypeWeakness(password, /[A-Z]/g);
}


// Check number weakness
function checkNumberWeakness(password) {
  return checkTypeWeakness(password, /[0-9]/g);
}


// Check symbols weakness
function checkSymbolsWeakness(password) {
  return checkTypeWeakness(password, /[^0-9a-zA-Z\s]/g);
}


// Helper function to check strength
function checkTypeWeakness(password, regex) {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return 20;
  } else if (matches.length <= 2) {
    return 10;
  } else if (matches.length > 2) {
    return 0;
  }
}


// Get strength string
function getStrengthString(num) {
  let str = '';

  if (num >= 50) {
    str = 'TOO WEAK!';
    passwordStrengthCopy.innerHTML = 'TOO WEAK!';
  } else if (num >= 40 && num < 50) {
    str = 'WEAK';
    passwordStrengthCopy.innerHTML = 'WEAK';
  } else if (num > 20 && num < 40) {
    str = 'MEDIUM';
    passwordStrengthCopy.innerHTML = 'MEDIUM';
  } else if (num >= 20) {
    str = 'STRONG';
    passwordStrengthCopy.innerHTML = 'STRONG';
  }

  return str;
}


// Change strength values
function changeBarChart(strength) {
  switch (strength) {
    case 'TOO WEAK!':
      resetBarVal();
      barOne.classList.add('too-weak-str');
      break;
    case 'WEAK':
      resetBarVal();
      barOne.classList.add('weak-str');
      barTwo.classList.add('weak-str');
      break;
    case 'MEDIUM':
      resetBarVal();
      barOne.classList.add('med-str');
      barTwo.classList.add('med-str');
      barThree.classList.add('med-str');
      break;
    case 'STRONG':
      resetBarVal();
      barOne.classList.add('strong-str');
      barTwo.classList.add('strong-str');
      barThree.classList.add('strong-str');
      barFour.classList.add('strong-str');
      break;
    default:
      break;
  }
}


