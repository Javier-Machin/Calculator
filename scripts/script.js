
let calculatorPad = document.getElementById("calculatorPad");
let diplayNumbers = document.getElementById("displayNumbers");
let numberOperations = 0;
let number1;
let number2;
let currentOperation = "";
let accumulated = 0;

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

function buttonPressed(e) {
	let button = e.target.innerHTML;
	switch (button) {
		case "+":
		if (number1 == undefined) {
			number1 = Number(accumulated);
		} else if (number1 != undefined) {
			number2 = Number(accumulated);
		}
		accumulated = 0;
		currentOperation = addNumbers;
		break;

		case "-":
		if (number1 == undefined) {
			number1 = Number(accumulated);
		} else if (number1 != undefined) {
			number2 = Number(accumulated);
		}
		accumulated = 0;
		currentOperation = subtractNumbers;
		break;

		case "x":
		if (number1 == undefined) {
			number1 = Number(accumulated);
		} else if (number1 != undefined) {
			number2 = Number(accumulated);
		}
		accumulated = 0;
		currentOperation = multiplyNumbers;
		break;

		case "÷":
		if (number1 == undefined) {
			number1 = Number(accumulated);
		} else if (number1 != undefined) {
			number2 = Number(accumulated);
		}
		accumulated = 0;
		currentOperation = divideNumbers;
		break;

		case "=":
		if (number2 == undefined) { 
			number2 = Number(accumulated);
			accumulated = 0;
		}	
		displayNumbers.innerHTML = Operate(currentOperation, number1, number2);
	}
	if (Number(button) >= 0 && Number(button) <= 9) {
		if (accumulated == 0) { 
			accumulated = Number(e.target.innerHTML);
		} else { 
			accumulated += Number(e.target.innerHTML);
		}
	}
}

// for some reason it only operates one digit

calculatorPad.addEventListener("click", buttonPressed);