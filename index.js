/*************/
/* Functions */
/*************/
// Import math functions
import {add, subtract, multiply, divide, mod} from './math.js';

// UI Functions
// Handle GUI button presses
function buttonPress(e){
    let entry = e.target;
    handleEntry(entry);
}

// Handle keyboard key presses
function keyPress(e){
    const entry = document.querySelector(`.key[data-key="${e.key}"]`);
    if(entry === null) return;
    handleEntry(entry);
}

// Perform function based on entry
function handleEntry(entry){
    const entryKey = entry.dataset.key;
    const splitInput = input.textContent.match(matchRegex);

    switch(entryKey){
        case ".":
            if (splitInput == null || 
                    splitInput[splitInput.length-1]
                    .search(opsPlusDotRegex) === -1){
                input.textContent += entry.textContent;
            }
            break;
        
        case "+":
        case "-":
        case "*":
        case "/":
            if(splitInput[0] !=null && 
                    splitInput[splitInput.length-1]
                    .search(operatorRegex) === -1){
                input.textContent += entry.textContent;
            }
            break;
        
        case "Backspace":
            input.textContent = 
                input.textContent.substr(0, input.textContent.length-1);
            break;
        
        case "Escape":
            clearInput();
            break;
        
        case "Enter":
            let result = operate(splitInput);
            results.appendChild(getResultsRow(result));
            clearInput();
            break;

        default:
            input.textContent += entry.textContent;
    }
}

// Clear entire input
function clearInput(e){
    input.textContent = "";
}

// Parse input and perform appropriate operations, following PEMDAS priority
// This works by taking the number before and after the operator and
//  passing it to the appropriate function. The two numbers and the 
//  operator are then replaced by the result of that operation, eventually
//  reducing the entire input array to a single value, the end result
function operate(inputArr){
    let result;

    let nextOp = inputArr.findIndex(
        entry=>entry.search(highPriorityOpsRegex) > -1);
    while(nextOp > -1){
        switch(inputArr[nextOp]){
            case "x":
                result = multiply(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, result); //replace "axb" with result
                break;
            case "%":
                result = mod(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, result); //replace "a%b" with result
                break;
            case "\u00f7":
                result = divide(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, result); //replace "a/b" with result
                break;
            default:
                console.log("High Priority broken!");
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
                result = add(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, result); //replace "a+b" with result
                break;
            case "-":
                result = subtract(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, result); //replace "a-b" with result
                break;
            default:
                console.log("Low Priority broken!");
                inputArr = [];
        }
        nextOp = inputArr.findIndex(
            entry=>entry.search(lowPriorityOpsRegex) > -1);
    }
    return inputArr[0];
}

// Generate and return new results row showing the result
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
    resElem.textContent = // Show max 8 decimal places
        Math.round((+result + Number.EPSILON) * 100000000) / 100000000;
    
    resultRow.appendChild(resElem);
    return resultRow;
}

// Constants
const matchRegex = /([%|+|\-|x|\u00f7;]|.+?(?=[%|+|\-|x|\u00f7;]|$))/g;
const operatorRegex = /[%|+|\-|x|\u00f7;]/;
const opsPlusDotRegex = /[%|+|\-|x|\u00f7;|\.]/;
const highPriorityOpsRegex = /[x|\u00f7;|%]/;
const lowPriorityOpsRegex = /[+|\-]/;
const input = document.querySelector(".input");
const results = document.querySelector(".results");

// Initial setup
const keys = [...document.querySelectorAll(".key")];
keys.forEach(key=>{
    key.addEventListener('click', buttonPress);
});

window.addEventListener('keydown', keyPress);