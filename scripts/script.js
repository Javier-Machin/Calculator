
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let isOperation = RegExp("[^0-9^,]");
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
	return operation(value1, value2);
}

function checkStatus(string1) {
	let numberOperations = 0;
	let operationPositions = [];
	for (let i = 0; i < string1.length; i++) {
		let currentChar = string1.charAt(i);
		if (isOperation.test(currentChar)) {
			numberOperations++;
			operationPositions.push(i);
		}
	}
	if (numberOperations >= 2) {
		number1 = Number(string1.slice(0, operationPositions[0]));
		number2 = Number(string1.slice((operationPositions[0] + 1), operationPositions[1]));
		console.log(number1 + " " + number2);
		// we have the 2 numbers, now create function to pick operation
	}
}

function buttonPressed(e) {
	let button = e.target.innerHTML;
	accumulated += button;
	checkStatus(accumulated);
}

calculatorPad.addEventListener("click", buttonPressed);