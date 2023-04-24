function randomIndex(str) {
  return Math.floor(Math.random() * str.length);
}

console.log(randomIndex("Chicken")); // 0 thru 6

function getRandomLower() {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  return letters[randomIndex(letters)];
}

console.log(getRandomLower());

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
const alertBox = document.querySelectorAll(`.alertBox`)[0];
const alertBox2 = document.querySelectorAll(`.alertBox`)[1];

// range event listener
lengthEl.addEventListener(`input`, (e) => {
  let passwordRange = parseInt(e.target.value);
  rangeOutput.innerText = ` ` + passwordRange;
});

function generatePassword(lower, upper, number, symbol, length) {
  // 1. Create the password variable
  let generatedPassword = "";

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

  let typesArr = [
    ["lower", lower],
    ["upper", upper],
    ["number", number],
    ["symbol", symbol],
  ];
  console.log(typesArr);

  typesArr = typesArr.filter((item) => {
    console.log(item[1]);
    return item[1];
  });
  console.log(typesArr);

  for (i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = type[0];
      console.log(funcName);

      generatedPassword += randomFunctions[funcName]();
      console.log(generatedPassword);
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  console.log(finalPassword);

  return finalPassword;
}

generateEl.addEventListener("click", () => {
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  const length = parseInt(lengthEl.value);

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

    alertBox2.classList.add(`showAlert`);
    container.classList.add(`blur`);
    okay2.addEventListener(`click`, () => {
      alertCustom2.classList.add(`fadeOut`);
      container.classList.remove(`blur`);
      function timeOut() {
        setTimeout(delay, 1000);
      }
      timeOut();
      function delay() {
        alertBox2.classList.remove(`showAlert`);
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
