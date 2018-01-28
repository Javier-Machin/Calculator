
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let isOperation = RegExp("[^0-9^.]");
let number1;
let number2;
let currentOperation = "";
let accumulated ="";
let operationPositions = [];

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
	console.log(operation);
	console.log(value1);
	console.log(value2);
	return operation(value1, value2);
}

function selectOperation(string1, operationPositions) {
	let operation;
	let operationCharacter = string1.charAt(operationPositions[0]);
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

function checkStatus(string1) {
	let numberOperations = 0;
	let operationPositions = [];
	for (let i = 0; i < string1.length; i++) {
		let currentChar = string1.charAt(i);
		if (isOperation.test(currentChar) && i != 0) {
			numberOperations++;
			if (operationPositions.length < 2) {
				operationPositions.push(i);
			} else {
				operationPositions[1] = i;
			}
		}
	}
	if (numberOperations >= 2) {
		number1 = Number(string1.slice(0, operationPositions[0]));
		number2 = Number(string1.slice((operationPositions[0] + 1), operationPositions[1]));
		if (!number1) number1 = 0;
		if (!number2) number2 = 0;
		let operation = selectOperation(string1, operationPositions);
		displayNumbers.innerHTML = Operate(operation, number1, number2);
		number1 = Operate(operation, number1, number2);
		number2 = undefined;
		operationPositions[0] = operationPositions[1];
		accumulated = number1 + string1.charAt(operationPositions[1]);
		// division 0 breaks it
		// what happens when equal is clicked
	}
}

function buttonPressed(e) {
	let button = e.target.innerHTML;
	accumulated += button;
	checkStatus(accumulated);
}

calculatorPad.addEventListener("click", buttonPressed);