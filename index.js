// Math functions
function add(a, b){
    return (+a + +b).toString();
}

function subtract(a, b){
    return (+a - +b).toString();
}

function multiply(a, b){
    return (+a * +b).toString();
}

function divide(a, b){
    if(+a === 0 && +b === 0){
        return "NaN";
    } else if(+a === 0){
        return "0";
    } else if(+b === 0){
        return "Trying to end the universe, are we?";
    } else{
        return (+a / +b).toString();
    }
}

function mod(a, b){ 
    if(+a === 0 && +b === 0){
        return "NaN";
    } else if(+a === 0){
        return "0";
    } else if(+b === 0){
        return "Trying to end the universe, are we?";
    } else{
        return (+a % +b).toString();
    }
}

// DOM interaction
// Constants
const matchRegex = /([%|+|\-|x|\u00f7;]|.+?(?=[%|+|\-|x|\u00f7;]|$))/g;
const operatorRegex = /[%|+|\-|x|\u00f7;]/;
const opsPlusDotRegex = /[%|+|\-|x|\u00f7;|\.]/;
const highPriorityOpsRegex = /[x|\u00f7;|%]/;
const lowPriorityOpsRegex = /[+|\-]/;
const input = document.querySelector(".input");
const results = document.querySelector(".results");

// Functions
function buttonPress(e){
    //console.log(e.target.textContent);
    let entry = e.target.textContent;
    enterKey(entry);
}

function enterKey(entry){
    let splitInput = input.textContent.match(matchRegex);
    console.log(splitInput)
    // console.table(splitInput[0]);
    if(entry === "."){
        // console.log("dot");
        if (splitInput == null || 
                splitInput[splitInput.length-1].search(opsPlusDotRegex) === -1){
            input.textContent += entry;
        }
    } else if(entry.search(operatorRegex) > -1){
        // console.log("operator");
        if(splitInput[0] !=null && 
            splitInput[splitInput.length-1].search(operatorRegex) === -1){
            input.textContent += entry;
        }
    } else if(entry === "=") {
        let result = operate(splitInput);
        results.appendChild(getResultsRow(result));
        clearInput();
    } else {
        // console.log("other (number)");
        input.textContent += entry;
    }
}

// Parse input and perform appropriate operations
function operate(inputArr){
    let nextOp = inputArr.findIndex(
        entry=>entry.search(highPriorityOpsRegex) > -1);
    let temp;
    while(nextOp > -1){
        console.table(inputArr);
        switch(inputArr[nextOp]){
            case "x":
                temp = multiply(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp); //replace "axb" with result
                break;
            case "%":
                temp = mod(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp); //replace "a%b" with result
                break;
            case "\u00f7":
                temp = divide(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp); //replace "a/b" with result
                break;
            default:
                console.log("broken!");
                inputArr = [];
        }
        nextOp = inputArr.findIndex(
            entry=>entry.search(highPriorityOpsRegex) > -1);
    }
    nextOp = inputArr.findIndex(
        entry=>entry.search(lowPriorityOpsRegex) > -1);
    while(nextOp > -1 ){
        switch(inputArr[nextOp]){
            case "+":
                temp = add(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp); //replace "a+b" with result
                break;
            case "-":
                temp = subtract(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp); //replace "a-b" with result
                break;
            default:
                console.log("broken!");
                inputArr = [];
        }
        nextOp = inputArr.findIndex(
            entry=>entry.search(lowPriorityOpsRegex) > -1);
    }
    return inputArr[0];
}

// Generate results row with result
function getResultsRow(result) {
    const resultRow = document.createElement("div");
    resultRow.classList.add("grid", "result");
    
    const inputElem = document.createElement("div");
    inputElem.textContent = input.textContent;
    resultRow.appendChild(inputElem);

    const equalsElem = document.createElement("div");
    equalsElem.textContent = "=";
    resultRow.appendChild(equalsElem);

    const resElem = document.createElement("div");
    resElem.style.cssText = "text-align: right;";
    console.log(Math.round((+result + Number.EPSILON) * 100) / 100)
    resElem.textContent = Math.round((+result + Number.EPSILON) * 1000000) / 1000000;
    resultRow.appendChild(resElem);
    return resultRow;
}

function backspace(e){
    input.textContent = input.textContent.substr(0, input.textContent.length-1);
}

function clearInput(e){
    input.textContent = "";
}

function keyPress(e){
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    console.log(e.key);
    console.log(key);
    if(key === null) return;
    if(key.id === "backspace") backspace(e);
    else if(key.id === "clear") clearInput(e);
    else enterKey(key.textContent);
}

let keys = [...document.querySelectorAll(".btn")].filter(
    key=>(key.id.search(/backspace|clear/))
);
keys.forEach(key=>{
    key.addEventListener('click', buttonPress);
});

keys = [];

let delKey = document.querySelector("#backspace");
delKey.addEventListener('click', backspace);
delKey = document.querySelector("#clear");
delKey.addEventListener('click', clearInput);
delKey = [];

window.addEventListener('keydown', keyPress);


// module.exports = {
//     add,
//     subtract,
//     multiply,
//     divide,
//     mod,
//}