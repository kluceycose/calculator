// module "math.js"
function add (a, b){
    return (+a + +b).toString();
}

function subtract (a, b){
    return (+a - +b).toString();
}

function multiply (a, b){
    return (+a * +b).toString();
}

function divide (a, b){
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

function mod (a, b){ 
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

export {
    add,
    subtract,
    multiply,
    divide,
    mod,
};
