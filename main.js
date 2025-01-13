const buttons = document.querySelectorAll(".button");
const operators = document.querySelectorAll(".operator");
const number = document.getElementById("show-item");
const add = document.getElementById("name");
let operand_one = 0;
let operand_two = 0;
let flag = 1;
function calculate_box(value) {
  number.innerHTML += value;
}

function calculation(value) {
  flag = 0;
  if (value === "+") {
    number.innerHTML=operand_one+operand_two
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (number.innerText === "0" || flag === 0) number.innerText = "";
    calculate_box(button.innerHTML);
    flag = 1;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if(operator.innerHTML=== "=")
    {
      operand_two=Number(number.innerHTML)
    }
    calculation(operator.innerHTML);
    operand_one=Number(number.innerHTML) 
  });
});
