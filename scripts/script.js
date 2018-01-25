let numbersPad = document.getElementById("numbersPad");

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

