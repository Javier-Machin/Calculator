let numbersPad = document.getElementById("numbersPad");
let currentOperation;
let currentInputs;
let number1;
let number2;
let isOperator = RegExp("[+\-x÷]");
let displayNumbers = document.getElementById("displayNumbers");
let displayOperation = document.getElementById("displayOperation");

function drawKeypad() {
	for (let i = 12; i >= 1; i--) {
		let newButton = document.createElement("button");
		newButton.setAttribute('id', 'button' + (13 - i));
		if (i - 3 >= 1) newButton.innerHTML = 13 - i;
		numbersPad.append(newButton);
	}

	document.getElementById("button12").innerHTML = "=";
	document.getElementById("button11").innerHTML = "0";
	document.getElementById("button10").innerHTML = ",";

	for (let i = 1; i <= 3; i++) {
		document.getElementById("button" + i).innerHTML = document.getElementById("button" + (i + 6)).innerHTML;
		document.getElementById("button" + (i + 6)).innerHTML = i;
	}
}

drawKeypad();

keypadButtons = document.getElementsByTagName("button");

function addNumbers(value1, value2) {
	return Number(value1) + Number(value2);
}

function subtractNumbers(value1, value2) {
	return Number(value1) - Number(value2);
}

function multiplyNumbers(value1, value2) {
	return Number(value1) * Number(value2);
}

function divideNumbers(value1, value2) {
	return Number(value1) / Number(value2);
}

function addInputs(value) {
	if ((isOperator.test(value))) {
		if (currentOperation == "-" && currentInputs != undefined && value != "-") {
			currentInputs = 0 - currentInputs;
			return;
		}

		if (currentInputs != undefined && number1 == undefined && value != "=") {
			number1 = currentInputs;
			displayNumbers.innerHTML = currentInputs;
			currentInputs = undefined;
			currentOperation = value;
			return;
		}

		if (number1 != undefined && currentInputs != undefined && value != "=") {
			number2 = currentInputs;
			if (currentOperation == "+") {
				currentInputs = addNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = value;
				return;
			} else if (currentOperation == "-") {
				currentInputs = subtractNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = value;
				return;
			} else if (currentOperation == "x") {
				currentInputs = multiplyNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = value;
				return;
			} else if (currentOperation == "÷") {
				currentInputs = divideNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = value;
				return;
			}
		}

		if (value == "=" && number1 != undefined && currentInputs != undefined) {
			number2 = currentInputs;
			if (currentOperation == "+") {
				currentInputs = addNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = undefined;
				return;
			} else if (currentOperation == "-") {
				currentInputs = subtractNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = undefined;
				return;
			} else if (currentOperation == "x") {
				currentInputs = multiplyNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = undefined;
				return;
			} else if (currentOperation == "÷") {
				currentInputs = divideNumbers(number1, number2);
				displayNumbers.innerHTML = currentInputs;
				number1 = currentInputs;
				currentInputs = undefined;
				number2 = undefined;
				currentOperation = undefined;
				return;
			}
		}
	}
	if (currentInputs == undefined) {
		currentInputs = value;
	} else {
		currentInputs += value;
	}
	displayNumbers.innerHTML = currentInputs;
}

function selectTarget(e) {
	console.log(e.target.innerHTML);
	addInputs(e.target.innerHTML);

}

document.addEventListener("click", selectTarget);
