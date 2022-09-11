// VARIABLES


// Range Slider
const rangeSlider = document.getElementById('rangeSlider');
let charLengthVal = document.getElementById('charLengthValue');



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