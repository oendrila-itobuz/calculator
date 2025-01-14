const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const number = document.getElementById("show-item");
const equals = document.querySelector(".equals");
const allClear = document.querySelector(".all-clear");
const clear = document.querySelector(".clear");
const toggle = document.querySelector('.toggle')

let expression = "";
let currentValue = "";
let result = "";
let currentOperator = null;
let flag = false;
let toggler = true;

function updateDisplay(value) {
  expression += value;
  number.innerHTML = expression;
}

function performCalculation(value) {
  let num1 = Number(result);
  let num2 = Number(value);
  switch (currentOperator) {
    case "+":
      result = (num1 + num2).toString();
      break;
    case "-":
      result = (num1 - num2).toString();
      break;
    case "x":
      result = (num1 * num2).toFixed(2).toString();
      break;
    case "%":
      result = ((num1 / 100) * num2).toFixed(2).toString();
      break;
    case "/":
      if (num2 === 0) {
        expression = "";
        currentOperator = null;
        currentValue = "";
        result = "ERROR";
        flag = null;
      } else result = (num1 / num2).toFixed(2).toString();
      break;
    default:
      result = value;
      break;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerHTML;
    if (value === "." && currentValue.indexOf(".") === -1) {
      currentValue += value;
      updateDisplay(value);
    } else if (value !== ".") {
      currentValue += value;
      updateDisplay(value);
    }
    flag = true;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (flag === true) {
      const value = operator.innerHTML;
      performCalculation(currentValue);
      currentOperator = value;
      currentValue = "";
      updateDisplay(value);
      flag = false;
    }
  });
});

equals.addEventListener("click", () => {
  if (currentValue !== "" && number.innerHTML !== 0 && flag === true) {
    performCalculation(currentValue);
    number.innerHTML = result;
    expression = result;
    currentOperator = null;
    currentValue = "";
  }
});

clear.addEventListener("click", () => {
  let num = number.innerHTML;
  if (num === "ERROR") {
    number.innerHTML = '0'
  }
  num = number.innerHTML;
  if (num !== '0' && num.length > 1) {
    expression = expression.substring(0, expression.length - 1);
    number.innerHTML = expression;
    if (flag === false) {
      currentOperator = null;
      flag = true
    }
    else {
      currentValue = currentValue.substring(0, currentValue.length - 1)
      result = result.substring(0, result.length - 1)
    }
  }
  else if (num.length === 1) {
    number.innerHTML = '0'
    expression = "";
    currentValue = "";
    currentOperator = ""
  }
});

toggle.addEventListener("click", () => {
  if (expression !== "") {
    if (toggler === false && expression.indexOf("+") === -1 && expression.indexOf("-") === 0 && expression.indexOf("x") === -1 && expression.indexOf("/") === -1) {
      expression = expression.substring(1);
      currentValue = expression;
      number.innerHTML = expression
      toggler = true;
    }
    else if (expression.indexOf("+") === -1 && expression.indexOf("-") === -1 && expression.indexOf("x") === -1 && expression.indexOf("/") === -1) {
      if (toggler === true) {
        expression = "-" + expression;
        currentValue = expression;
        number.innerHTML = expression
        toggler = false;
      }
    }
  }
})

allClear.addEventListener("click", () => {
  expression = "";
  currentOperator = null;
  currentValue = "";
  result = "";
  number.innerHTML = "0";
});
