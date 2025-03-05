const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols"); // Fixed typo
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type='checkbox']");

const symbols = "~!@#$%^&*(){}[]=<>/,.";
let password = "";
let passwordLength = 8; // Converted to number
let checkCount = 0;

handleSlider();

// Function to handle slider updates
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

// Function to set the strength indicator color
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 2px ${color}`;
}

// Function to generate a random integer in a given range
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Functions to generate characters
function generateRandomNumber() {
  return String.fromCharCode(getRndInt(48, 58)); // ASCII for 0-9
}

function generateLowercase() {
  return String.fromCharCode(getRndInt(97, 123)); // ASCII for a-z
}

function generateUppercase() {
  return String.fromCharCode(getRndInt(65, 91)); // ASCII for A-Z
}

function generateSymbols() {
  const randNum = getRndInt(0, symbols.length);
  return symbols.charAt(randNum);
}

// Function to shuffle password using Fisher-Yates Algorithm
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}

// Function to calculate password strength
function calcStrength() {
  let hasUpper = uppercaseCheck.checked;
  let hasLower = lowercaseCheck.checked;
  let hasNum = numberCheck.checked;
  let hasSym = symbolCheck.checked;

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0"); // Strong
  } else if ((hasUpper || hasLower) && (hasNum || hasSym) && passwordLength >= 6) {
    setIndicator("#ff0"); // Medium
  } else {
    setIndicator("#f00"); // Weak
  }
}

// Function to copy password to clipboard
async function copyContent() {
  if (!passwordDisplay.value) return; // Prevent copying if password is empty

  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied!";
  } catch (e) {
    copyMsg.innerText = "Failed!";
  }

  copyMsg.classList.add("active");
  setTimeout(() => copyMsg.classList.remove("active"), 2000);
}

// Event Listeners
inputSlider.addEventListener("input", (e) => {
  passwordLength = parseInt(e.target.value); // Ensure it's a number
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  copyContent();
});

// Function to handle checkbox changes
function handleCheckBoxChange() {
  checkCount = Array.from(allCheckBox).filter((cb) => cb.checked).length;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBoxChange);
});

// Generate Password Function
generateBtn.addEventListener("click", () => {
  if (checkCount === 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";
  let funcArr = [];

  if (uppercaseCheck.checked) funcArr.push(generateUppercase);
  if (lowercaseCheck.checked) funcArr.push(generateLowercase);
  if (numberCheck.checked) funcArr.push(generateRandomNumber);
  if (symbolCheck.checked) funcArr.push(generateSymbols);

  // Ensure at least one character from each selected type
  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  // Fill the rest with random characters
  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randIndex = getRndInt(0, funcArr.length);
    password += funcArr[randIndex]();
  }

  // Shuffle and display password
  password = shufflePassword(password.split(""));
  passwordDisplay.value = password;

  // Calculate strength
  calcStrength();
});
