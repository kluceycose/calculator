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
        return undefined;
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
        return undefined;
    } else{
        return (+a % +b).toString();
    }
}

// DOM interaction
// Constants
const matchRegex = /([%|+|\-|x|\u00f7;]|.+?(?=[%|+|\-|x|\u00f7;]|$))/g;
const operatorRegex = /[%|+|\-|x|\u00f7;]/;
const opsPlusDotRegex = /[%|+|\-|x|\u00f7;|\.]/;
const input = document.querySelector(".input");
const results = document.querySelector(".results");

// Functions
function enterKey(e){
    //console.log(e.target.textContent);
    let entry = e.target.textContent;
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
        console.log(result);
        const resultElement = document.createElement("div");
        resultElement.textContent = result;
        results.appendChild(resultElement);
        input.textContent = "";
    } else {
        // console.log("other (number)");
        input.textContent += entry;
    }
}

// 
function operate(inputArr){
    let nextOp = inputArr.findIndex(entry=>entry.search(/[x|\u00f7;|%]/) > -1);
    let temp;
    while(nextOp > -1){
        console.table(inputArr);
        switch(inputArr[nextOp]){
            case "x":
                temp = multiply(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp);
                break;
            case "%":
                temp = mod(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp);
                break;
            case "\u00f7":
                temp = divide(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp);
                break;
            default:
                console.log("broken!");
                inputArr = [];
        }
        nextOp = inputArr.findIndex(entry=>entry.search(/[x|\u00f7;|%]/) > -1);
    }
    nextOp = inputArr.findIndex(entry=>entry.search(/[+|\-]/) > -1);
    while(nextOp > -1 ){
        // console.log("nextOp " + nextOp);
        console.table(inputArr);
        switch(inputArr[nextOp]){
            case "+":
                // console.log("add");
                temp = add(inputArr[nextOp-1], inputArr[nextOp+1]);
                // console.log("temp " + temp);
                inputArr.splice(nextOp-1, 3, temp);
                // console.log("inputArr postadd ");
                console.log(inputArr);
                break;
            case "-":
                temp = subtract(inputArr[nextOp-1], inputArr[nextOp+1]);
                inputArr.splice(nextOp-1, 3, temp);
                break;
            default:
                console.log("broken!");
                inputArr = [];
        }
        nextOp = inputArr.findIndex(entry=>entry.search(/[+|\-]/) > -1);
    }
    return inputArr[0];
}

function keyPress(e){
    console.log(e.key);
}

const keys = [...document.querySelectorAll(".btn")];
keys.forEach(key=>{
    key.addEventListener('click', enterKey);
});

window.addEventListener('keydown', keyPress);


module.exports = {
    add,
    subtract,
    multiply,
    divide,
    mod,
}