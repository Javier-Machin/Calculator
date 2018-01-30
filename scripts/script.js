
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let isOperation = RegExp("[^0-9^.]"); // Regular expression used to look for operator characters
let number1;
let number2;
let accumulated = ""; // All the inputs are stored in this variable, numbers and operators
let numberOperations = 0;
let operatorCount = 0;


function addNumbers(value1, value2) {
	return value1 + value2;
}

function subtractNumbers(value1, value2) {
	return value1 - value2;
}

function multiplyNumbers(value1, value2) {
	return value1 * value2;
}

function divideNumbers(value1, value2) {
	return value1 / value2;
}

function Operate(operation, value1, value2) {
	return operation(value1, value2);
}

function selectOperation(operationPositions) {
	let operation;
	let operationCharacter = accumulated.charAt(operationPositions[0]);
	switch (operationCharacter) {
		case "+":
		operation = addNumbers;
		break;
		case "-":
		operation = subtractNumbers;
		break;
		case "x":
		operation = multiplyNumbers;
		break;
		case "÷":
		operation = divideNumbers;
		break;
	}
	return operation;
}
// Resets the app
function clearAll() {
	number1 = undefined;
	number2 = undefined;
	accumulated = "";
	operationPositions = [];
	displayNumbers.innerHTML = 0;
}

// Save the inputs and prevents storing many operators, taking only the last one introduced.
function saveInput(button) {
	if (isOperation.test(accumulated.charAt(accumulated.length - 1)) && isOperation.test(button)) {
		if (accumulated.length > 1 || button == "-" || button == "+") {
			accumulated = accumulated.slice(0, accumulated.length - 1) + button;
	}
	} else { 
		accumulated += button;
	}
}

// Checks the inputs for extra "dots" and remove all of them but the first
function removeExtraDecimals(number) { 
	let dotIndex;
	number = number.split("");
	for (let i = 0; i < number.length; i++) {
		if (number[i] == "." && dotIndex == undefined) { 
			dotIndex = i;
		} else if (number[i] == "." && dotIndex != undefined) {
			number[i] = "";
		}
	}	
	number = number.join("");
	return number;
}
// Splits the inputs to create to operable numbers, using the index of the operators to identify them
function splitNumbers(operationPositions) {
	let dotIndex;
	number1 = accumulated.slice(0, operationPositions[0]);
	number2 = accumulated.slice((operationPositions[0] + 1), operationPositions[1]);
	if (number1.length > 20) number1 = number1.slice(0, 20);
	if (number2.length > 20) number2 = number2.slice(0, 20);
	number1 = removeExtraDecimals(number1);
	number2 = removeExtraDecimals(number2);
	if (!number1) number1 = 0;
	if (!number2) number2 = 0;
	number1 = Number(number1);
	number2 = Number(number2);
}
// Raises a flag and prevents different operations that would cause the app to crash
function invalidInput(button) {
	let isInvalid = false;
	if (button == "C") { 
		clearAll()
		isInvalid = true;
		return isInvalid; 
	}
	if (button == "=" && numberOperations == 0) { 
		isInvalid = true;
		return isInvalid; 
	}
	if (isOperation.test(button) && button != "-" && accumulated.length < 1) {
		isInvalid = true;
		return isInvalid; 
	}
	if (button == "." && accumulated.length < 1) {
		isInvalid = true;
		return isInvalid; 
	}
	return isInvalid;  
}

// Updates the screen and sets the calculator ready for the next operation
function updateState(operation) { 
	let result = Operate(operation, number1, number2);
	result = String(result);
	if (result.length > 20) result = result.slice(0, 20);
	displayNumbers.innerHTML = result  // update screen
	accumulated = result;
	number1 = Number(result);
}
// Checks if there is atleast 2 numbers and one operator 
// and proceeds to call the function for the operation wanted
function checkState(button) {
	numberOperations = 0; // Keep track of the amount of operators inputted
	let operationPositions = []; // Contents the Index for each operator in the string containing all the inputs
	let previousChar;
	displayNumbers.innerHTML = accumulated;
	for (let i = 0; i < accumulated.length; i++) {
		let currentChar = accumulated.charAt(i);
		if (isOperation.test(currentChar) && i != 0 && (!isOperation.test(previousChar))) {
			if (currentChar != "=" && currentChar != ".") {
				numberOperations++;
			}
			if (!(operationPositions[0]) && currentChar != "=") {
				operationPositions[0] = i;
			} else {
				operationPositions[1] = i;
			}
		}
		previousChar = currentChar;
	}
	// If 2 operators or the equal button are saved, operates the numbers
	if (numberOperations >= 2 || accumulated.charAt(operationPositions[1]) == "=" && numberOperations > 0) { 
		splitNumbers(operationPositions);
		let operation = selectOperation(operationPositions);
		if (operation == divideNumbers && number2 == 0) { // check division by 0
			alert("One does not simply divide by zero");
			clearAll();
			return;
		}
		updateState(operation);
		numberOperations = 0;
	}
}

function buttonPressed(e) {
	let button = e.target.innerHTML;
	if (accumulated.includes("e")) { // If the last result had an exponent, resets the app
		clearAll();
		return;
	}
	if (invalidInput(button)) return; //check if the input is valid
	saveInput(button);
	checkState(accumulated, button); 
}

calculatorPad.addEventListener("click", buttonPressed);