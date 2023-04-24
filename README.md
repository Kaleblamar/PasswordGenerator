# PasswordGenerator
This is a JavaScript code that generates a random password based on the user's input. The password can include lowercase letters, uppercase letters, numbers, and symbols. The user can select which types of characters they want to include in the password and set the length of the password using a range input. The generated password is displayed in the result element, and the user can copy the password to the clipboard using the copy button.

The code starts by defining a function `randomIndex` that takes a string as an argument and returns a random index within the range of the string's length. The `getRandomLower`, `getRandomUpper`, `getRandomNumber`, and `getRandomSymbol` functions use the `randomIndex` function to return a random lowercase letter, a random uppercase letter, a random number, and a random symbol, respectively.

The `randomFunctions` object stores these four functions under the `lower`, `upper`, `number`, and `symbol` properties. The `generatePassword` function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string of characters selected based on the user's preferences.

The event listeners are defined for the `range` and `generate` buttons. When the user changes the value of the `range` input, the `generate` button is clicked, or the user clicks the `generate` button, the `generatePassword` function is called, and the result is displayed in the `result` element.

Lastly, there is an event listener for the `copy` button, which copies the password displayed in the `result` element to the clipboard when clicked.
