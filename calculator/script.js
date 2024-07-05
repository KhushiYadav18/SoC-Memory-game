let displayValue = '';
let abc=false;

function append(value) {
    if (abc && !isNaN(value)) {
        displayValue = value;
        abc = false;
    } else {
        displayValue += value;
    }
    document.getElementById('display').innerText = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('display').innerText = '0';
    abc= false;
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    document.getElementById('display').innerText = displayValue ||'0';
}

function handleEquals() {
    try {
        let result = eval(displayValue);
        if (isNaN(result) || !isFinite(result)) {
            document.getElementById('display').innerText = 'Error';
        } else {
            document.getElementById('display').innerText = result;
            displayValue = result.toString();
            abc = true;
        }
    } catch (error) {
        document.getElementById('display').innerText = 'Error';
    }
}
