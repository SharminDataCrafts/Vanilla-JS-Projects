
// State variables
let expression =[];
let currentInput = '';
const history = [];
let result;
let resultDisplayed = false;

// Select all buttons
const displayInputs = document.querySelector('.display-inputs');
const ansScreen = document.querySelector('.ans-Scrn');
const numberButtons = document.querySelectorAll('.num-btn');
const funcButtons = document.querySelectorAll('.func-btn');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');
const equalButton = document.getElementById('evalute');
const historyButton = document.querySelector('.history');


// Display update function
function updateDisplay(){ 
    displayInputs.innerText = expression.join('')+(currentInput?' '+currentInput:'')||'0';
}


// Handling number buttons
numberButtons.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
        const value = event.target.value;

        if(resultDisplayed){
            expression.length = 0;
            currentInput = '';
            resultDisplayed = false;
        }

        currentInput+=value;
        updateDisplay();
    }); 
});


// Handling function buttons (+, -, *, /, %,mod)
funcButtons.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const val = e.target.value;

        if(resultDisplayed){
            expression.length = 0;
            currentInput = result;
            resultDisplayed = false;
        }

        if(currentInput){
            expression.push(currentInput);
            currentInput = '';
        }

        if(expression.length>0 && !['+', '-', '*', '/', '%','mod'].includes(expression[expression.length - 1])){
            expression.push(val);
        }
        updateDisplay();
    })
});


// Handle Clear button
clearButton.addEventListener('click',()=>{
    expression = [];
    currentInput = '';
    ansScreen.innerText = '0';
    updateDisplay();
});


// Handle Erase button
eraseButton.addEventListener('click',()=>{
    if(currentInput){
        currentInput = currentInput.slice(0,-1);
    }else if(expression.length>0){
        currentInput = expression.pop();
        currentInput = currentInput.slice(0,-1);
        if(currentInput){
            expression.push(currentInput);
            currentInput ='';
        }
    }
    updateDisplay();
    console.log(expression)
});

// Calculate result without eval (handle equal button)
equalButton.addEventListener('click',()=>{
    if(currentInput){
        expression.push(currentInput);
        currentInput='';
    }
    let result = calculateExpression(expression);
    updateDisplay();
    resultDisplayed = true;
});


// Function to calculate the result
function calculateExpression(exp){

    let expCopy = [...exp];

    for (let i=0;i<expCopy.length;i++){
        const operator = expCopy[i];

        if(operator==='*'||operator==='/'||operator==='%'||operator==='mod'){
            const prevNum = parseFloat(expCopy[i-1]);
            const nextNum = parseFloat(expCopy[i+1]);
            let tempResult = 0;
            switch(operator){
                case '*': 
                    tempResult = prevNum*nextNum;
                    break;
                case '/': 
                    tempResult = prevNum/nextNum;
                    break;
                case '%': 
                    tempResult = prevNum%nextNum;
                    break;  
                case 'mod':
                    tempResult = (prevNum*nextNum)/100;
                    break;  
            }
            expCopy.splice(i-1,3,tempResult);
            i--;    
        }
    }

    for(let i=0;i<expCopy.length;i++){
        const operator = expCopy[i];
        if(operator==='+'||operator==='-'){
            const prevNum = parseFloat(expCopy[i-1]);
            const nextNum = parseFloat(expCopy[i+1]);
            let tempResult = 0;

            switch(operator){
                case '+': 
                    tempResult = prevNum+nextNum;
                    break;
                case '-': 
                    tempResult = prevNum-nextNum;
                    break;
            }
            expCopy.splice(i-1,3,tempResult);
            i--;    
        }
    }
    result = expCopy[0]
    ansScreen.innerText = result;

     // Update history
    if(result!==undefined){
        history.push(result);
        while(history.length>3){
            history.shift()
        }
    }
}

//show previous result
historyButton.addEventListener('click',()=>{

    const historyContainer = document.querySelector('.history-container');
    historyContainer.innerHTML = '';
    historyItem = document.createElement('div');

    
    if(history.length==0){
        historyItem.innerHTML = '0'
    }else{
        for(let i=history.length-1;i>=0;i--){
            historyItem.innerHTML+= history[i]+'<br>'; 
        }
    }
    historyContainer.appendChild(historyItem)
    historyButton.appendChild(historyContainer);
})