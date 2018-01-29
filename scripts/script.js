
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let isOperation = RegExp("[^0-9^.]");
let number1;
let number2;
let accumulated ="";
let operationPositions = [];
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
		case "=":
		operation = resultNumbers;
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

function removeRepeatedOps(button) {
	if (isOperation.test(accumulated.charAt(accumulated.length - 1)) && isOperation.test(button)) {
		accumulated = accumulated.slice(0, accumulated.length - 1) + button;
	} else  if (button == "=" && numberOperations == 0) { 
		return;
	} else {
	accumulated += button;
	}
}

function checkStatus(button) {
	operatorCount = 0;
	numberOperations = 0;
	let operationPositions = [];
	let previousChar;
	for (let i = 0; i < accumulated; i++) {
		if (isOperation.test(accumulated.charAt(i))) {
			operatorCount++;
		}
	}
	if (accumulated.includes("=") && operatorCount <= 1) {
		accumulated.replace("=", "");
	}
	displayNumbers.innerHTML = accumulated;
	for (let i = 0; i < accumulated.length; i++) {
		let currentChar = accumulated.charAt(i);
		if (isOperation.test(currentChar) && i != 0 && (!isOperation.test(previousChar))) {
			if (currentChar != "=") {
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
		number1 = Number(accumulated.slice(0, operationPositions[0]));
		number2 = Number(accumulated.slice((operationPositions[0] + 1), operationPositions[1]));
		if (!number1) number1 = 0;
		if (!number2) number2 = 0;
		let operation = selectOperation(operationPositions);
		if (operation == divideNumbers && number2 == 0) {
			alert("One does not simply divide by zero");
			clearAll();
			return;
		}
		displayNumbers.innerHTML = Operate(operation, number1, number2);
		number1 = Number(displayNumbers.innerHTML);
		if (accumulated.charAt(operationPositions[1]) != "=") {
			operationPositions[0] = operationPositions[1];
			accumulated = String(number1 + accumulated.charAt(operationPositions[0]));
		} else {
			accumulated = String(number1);
		}
		if (accumulated.charAt(accumulated.length - 1) == "=") {
			accumulated = accumulated.slice(0, accumulated.length);
		}
		// After clicking equal it allows the equal sign to be included in accumulated while it should not.
	}
}

function buttonPressed(e) {
	let button = e.target.innerHTML;
	removeRepeatedOps(button);
	checkStatus(accumulated, button);

}

calculatorPad.addEventListener("click", buttonPressed);