
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let isOperation = RegExp("[^0-9^.]");
let number1;
let number2;
let accumulated = ""; //This is where all the inputs are stored, numbers and operators

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

function clearAll() {
	number1 = undefined;
	number2 = undefined;
	accumulated = "";
	operationPositions = [];
	displayNumbers.innerHTML = 0;
}

//Save the inputs and prevents storing many operators, taking only the last one introduced.
function saveInput(button) {
	if (isOperation.test(accumulated.charAt(accumulated.length - 1)) && isOperation.test(button)) {
		if (accumulated.length > 1 || button == "-" || button == "+") {
			accumulated = accumulated.slice(0, accumulated.length - 1) + button;
	}
	} else { 
		accumulated += button;
	}
}

function splitNumbers(operationPositions) {
	number1 = accumulated.slice(0, operationPositions[0]);
	number2 = accumulated.slice((operationPositions[0] + 1), operationPositions[1]);
	if (number1.length > 20) number1 = number1.slice(0, 20);
	if (number2.length > 20) number2 = number2.slice(0, 20);
	if (!number1) number1 = 0;
	if (!number2) number2 = 0;
	number1 = Number(number1);
	number2 = Number(number2);
}

function invalidInput(button) {
	let isInvalid = false;
	let decimalCount = 0; // count how many decimals and invalid if more than one before operation // loop that check if previous char is operation and current char is, if yes , invalid
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


function checkStatus(button) {
	numberOperations = 0;
	let operationPositions = [];
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

	if (numberOperations >= 2|| accumulated.charAt(operationPositions[1]) == "=" && numberOperations > 0) {
	
		splitNumbers(operationPositions);
		
		let operation = selectOperation(operationPositions);
		
		if (operation == divideNumbers && number2 == 0) { // check division by 0
			alert("One does not simply divide by zero");
			clearAll();
			return;
		}

		displayNumbers.innerHTML = Operate(operation, number1, number2);  // update screen
		number1 = displayNumbers.innerHTML; // use result as number1
		if (number1 > Number.MAX_SAFE_INTEGER) number1 = Number.MAX_SAFE_INTEGER // if the number is too big reduce to max safe integer
		number1 = Number(number1);
		accumulated = String(number1);
		numberOperations = 0;
	}
}

function buttonPressed(e) {
	let button = e.target.innerHTML;
	if (invalidInput(button)) return; //check if the input is valid
	saveInput(button);
	checkStatus(accumulated, button); //check if there is atleast 2 numbers and one operator 
	                                  //and proceeds to call the function for the operation wanted
}

calculatorPad.addEventListener("click", buttonPressed);