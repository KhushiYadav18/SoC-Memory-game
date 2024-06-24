let displayValue = '';

function append(value) {
    displayValue += value;
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').innerText = '0';
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById('display').innerText = displayValue;
}

function handleEquals() {
    try {
        let result = eval(displayValue);
        if (isNaN(result) || !isFinite(result)) {
            document.getElementById('display').innerText = 'Error';
        } else {
            document.getElementById('display').innerText = result;
            displayValue = result.toString();
        }
    } catch (error) {
        document.getElementById('display').innerText = 'Error';
    }
}
