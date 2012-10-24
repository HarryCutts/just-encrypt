var pwField, dataField, outputDisplay, encryptRB, decryptRB, button;

function encrypt() {
	var pw = pwField.value;
	var pwConf = pwConfField.value;
	if (pw != pwConf) {
		window.alert("The password and confirm password fields do not match. Try retyping the password.");
		return;
	}
	var data = dataField.value;
	var result = sjcl.encrypt(pw, data);
	output(result);
}

function decrypt() {
	var pw = pwField.value;
	var data = dataField.value
	var result;
	try {
		result = sjcl.decrypt(pw, data);
		output(result);
	} catch (e) {
		if (e instanceof sjcl.exception.corrupt) {
			window.alert("Incorrect password.");
		} else if (e instanceof sjcl.exception.invalid) {
			window.alert("The input data is not valid. It should start and end with curly braces ('{' and '}').");
		}
	}
}

// UI //

function output(text) {
	outputDisplay.value = text;
}

function showPWConfirm() {
	pwConfLabel.style.display = 'inline';
	pwConfField.style.display = 'inline';
}

function hidePWConfirm() {
	pwConfLabel.style.display = 'none';
	pwConfField.style.display = 'none';
}

function checkPWMatch() {
	var newClassName;
	if (pwField.value == "" || pwConfField.value == "") {
		newClassName = "";
	} else if (pwField.value == pwConfField.value) {
		newClassName = "valid";
	} else {
		newClassName = "invalid";
	}
	pwField.className = newClassName;
	pwConfField.className = newClassName;
}

// Event Handlers //

function encryptRB_onclick() {
	decryptRB.checked = false;
	showPWConfirm();
}

function decryptRB_onclick() {
	encryptRB.checked = false;
	hidePWConfirm();
}

function button_onclick() {
	if (encryptRB.checked) {
		encrypt();
	} else {
		decrypt();
	}
}
