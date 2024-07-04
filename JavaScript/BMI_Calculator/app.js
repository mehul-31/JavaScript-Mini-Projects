const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const results = document.querySelector('#results');
 
  if (isNaN(height) || height <= 0) {
    results.innerHTML = "Please give a valid height";
  } else if (isNaN(weight) || weight <= 0) {
    results.innerHTML = "Please give a valid weight";
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    // results.innerHTML = `<span>${bmi}</span>`;

    let classification = '';

    if (bmi < 18.5) {
      classification = 'underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      classification = 'normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      classification = 'overweight';
    } else {
      classification = 'obese';
    }

    results.innerHTML = `<span>${bmi}</span> - You are classified as <strong>${classification}</strong>`;
  


  }
});
