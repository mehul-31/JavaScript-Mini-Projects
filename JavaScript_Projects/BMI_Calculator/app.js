document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultsDiv = document.getElementById('results');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const height = parseFloat(heightInput.value) / 100; // Convert height to meters
      const weight = parseFloat(weightInput.value);
  
      if (isNaN(height) || isNaN(weight)) {
        resultsDiv.textContent = 'Please enter valid numbers for height and weight.';
        return;
      }
  
      const bmi = (weight / (height * height)).toFixed(2);
  
      let category = '';
      if (bmi < 18.6) {
        category = 'Underweight';
      } else if (bmi >= 18.6 && bmi <= 24.9) {
        category = 'Normal';
      } else {
        category = 'Overweight';
      }
  
      resultsDiv.textContent = `Your BMI is ${bmi} (${category}).`;
    });
  });
  