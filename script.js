function randomIndex(str) {
  return Math.floor(Math.random() * str.length);
}

console.log(randomIndex("Chicken")); // 0 thru 6

function getRandomLower() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  // Returns a random letter using a random index from the randomIndex function on the letters string
  return letters[randomIndex(letters)];
}

console.log(getRandomLower()); // random lowercase letter

function getRandomUpper() {
  const letter = getRandomLower();
  return letter.toUpperCase();
}

console.log(getRandomUpper());

function getRandomNumber() {
  const numbers = "1234567890";

  return numbers[randomIndex(numbers)];
}

console.log(getRandomNumber());

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  // Return a random symbol using a random index from the symbols string
  return symbols[randomIndex(symbols)];
}

console.log(getRandomSymbol());

// Object to store all the character generator functions
const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Selecting the DOM Elements
const resultWindow = document.querySelector(`#resultContainer`);
const resultEl = document.querySelector("#result");
const clipboardEl = document.querySelector("#clipboard");
const lowercaseEl = document.querySelector("#lowercase");
const uppercaseEl = document.querySelector("#uppercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const lengthEl = document.querySelector("#length");
const generateEl = document.querySelector("#generate");
let passwordRange;
let lengthLabel = document.querySelector(`#lengthLabel`);
let rangeOutput = document.querySelector(`#rangeOutput`);
const copy = document.querySelector(`.copy`);
const alertCustom = document.querySelector(`.alert`);
const alertCustom2 = document.querySelector(`.alert2`);
const okay = document.querySelector(`.okay`);
const okay2 = document.querySelector(`.okay2`);
const container = document.querySelector(`#container`);
const alertBox = document.querySelector(`.alertBox`);

// range event listener
lengthEl.addEventListener(`input`, (e) => {
  let passwordRange = parseInt(e.target.value);
  rangeOutput.innerText = ` ` + passwordRange;
});

function generatePassword(lower, upper, number, symbol, length) {
  // 1. Create the password variable
  let generatedPassword = "";

  // 2. Filter Out Unchecked Options
  // True and false values can be added together (True is equal to 1 and False is equal to 0)
  // NOTE: the values set to the typesCount variable will be used when building out the password
  const typesCount = lower + upper + number + symbol;
  console.log(typesCount);

  // if the user has NOT selected any of the four options then the alert will be displayed
  if (typesCount === 0) {
    // alert("Please Select at least one option");
    alertBox.classList.add(`showAlert`);
    container.classList.add(`blur`);
    okay.addEventListener(`click`, () => {
      alertCustom.classList.add(`fadeOut`);
      container.classList.remove(`blur`);
      function timeOut() {
        setTimeout(delay, 1000);
      }
      timeOut();
      function delay() {
        alertBox.classList.remove(`showAlert`);
        alertCustom.classList.remove(`fadeOut`);
      }
    });
    return "";
  }

  // The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. The second item in each nested array are the values passed into this function
  let typesArr = [
    ["lower", lower],
    ["upper", upper],
    ["number", number],
    ["symbol", symbol],
  ];
  console.log(typesArr);

  // The filter method creates a new array with all the items that pass the test implemented by the provided function (aka  all the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter)
  // Checking if the value for index of 1 in each item in the typesArr array is true or false. Also removing the item from the typesArr array if it is false
  typesArr = typesArr.filter((item) => {
    console.log(item[1]);
    return item[1];
  });
  console.log(typesArr);

  // 3. Loop over the length and call the generator function for each checked option
  // Note: the value for "length" is the value entered for the length number input
  for (i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = type[0];
      console.log(funcName);
      // Accessing and running the function in the randomFunctions object. Also, concatenating the value returns from the accessed function to the generatedPassword string
      generatedPassword += randomFunctions[funcName]();
      console.log(generatedPassword);
    });
  }

  // 4. Add Generated password to the final password variable and return it from the function
  const finalPassword = generatedPassword.slice(0, length);

  console.log(finalPassword);

  return finalPassword;
}

// Event Listener for when the "Generate Password" Button is clicked
generateEl.addEventListener("click", () => {
  // Checking if the following options are checked and the true false values to the respective variables
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  // Accessing the value for the number input and changing the value from a string to a number
  const length = parseInt(lengthEl.value);

  // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input (length),  as arguments and returns the finalPassword string. Then it is set to the innerText of the resultEl
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// COPY PASSWORD
clipboardEl.addEventListener("click", () => {
  // Access the password result
  const password = resultEl.innerText;
  if (password === "") {
    // alert("Please generate a password first");

    alertBox.classList.add(`showAlert`);
    container.classList.add(`blur`);
    okay2.addEventListener(`click`, () => {
      alertCustom2.classList.add(`fadeOut`);
      container.classList.remove(`blur`);
      function timeOut() {
        setTimeout(delay, 1000);
      }
      timeOut();
      function delay() {
        alertBox.classList.remove(`showAlert`);
        alertCustom2.classList.remove(`fadeOut`);
      }
    });
    return;
  }
  navigator.clipboard.writeText(password).then(() => {
    clipboardEl.style.display = `none`;
    const copied = document.createElement(`p`);
    copied.setAttribute(`class`, `copied`);
    copied.innerText = `Copied!`;
    resultWindow.appendChild(copied);

    setTimeout(() => {
      clipboardEl.style.display = `block`;
      resultWindow.removeChild(copied);
    }, 3000);
  });

  // alert("Copied to clipboard");
});
