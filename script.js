function add(a, b) { return +a + +b; }
function subtract(a, b) { return +a - +b; }
function multiply(a, b) { return +a * +b; }
function divide(a, b) {
  if (+b === 0) return "ERROR";
  else return +a / +b;
}

function operate(a, b, operator) {
  let val;
  if (b === "" || a === "ERROR" || b === "ERROR") return "ERROR";
  if (operator === "") return a;
  switch (operator) {
    case "+":
      val = add(a, b);
      break;
    case "-":
      val = subtract(a, b);
      break;
    case "*":
      val = multiply(a, b);
      break;
    case "/":
      val = divide(a, b);
      break;
  }
  if (val > 999999999999 || val < -999999999999) return "ERROR";
  return val;
}

let result = document.getElementById("result");
let a = "";
let b = "";
let operator = "";
let operatorBool = false;
let reset = false;

const operators = document.getElementsByClassName("op");
const opArray = [...operators];
opArray.forEach((element) => {
  element.addEventListener("click", function() {
    if (element.textContent === "=") {
      b = result.textContent;
      result.textContent = operate(a, b, operator).toString().slice(0, 13);
      a = result.textContent;
      b = "";
      operator = "";
      operatorBool = false;
      reset = true;
    } else {
      if (operatorBool) {
        b = result.textContent;
        result.textContent = operate(a, b, operator).toString().slice(0, 13);
        a = result.textContent;
        b = "";
      }
      a = result.textContent;
      operator = element.textContent;
      operatorBool = true;
      reset = true;
    }
  })
})

const btns = document.getElementsByClassName("btn");
const btnArray = [...btns];
btnArray.forEach((element) => {
  element.addEventListener("click", function() {
    let max;
    if (result.textContent.includes("-")) max = 13;
    else max = 12;
    if (result.textContent.length < max || reset) {
      if (result.textContent === "ERROR" || result.textContent === "0" || reset) {
        result.textContent = element.textContent;
        reset = false;
      } else {
        result.textContent += element.textContent;
      }
    }
  })
})

const zero = document.getElementById("zero");
zero.addEventListener("click", function() {
  let max;
  if (result.textContent.includes("-")) max = 13;
  else max = 12;
  if (result.textContent.length < max || reset) {
    if (result.textContent === "ERROR" || reset) result.textContent = "0";
    if (result.textContent != "0") result.textContent += "0";
  }
})

const dot = document.getElementById("dot");
dot.addEventListener("click", function() {
  if (result.textContent === "ERROR" || reset) {
    result.textContent = "0.";
    reset = false;
  }
  if (!(result.textContent.includes("."))) {
    result.textContent += ".";
    reset = false;
  }
})

const clr = document.getElementById("AC");
clr.addEventListener("click", function() {
  operator = "";
  a = "";
  b = "";
  operatorBool = false;
  reset = false;
  result.textContent = "0";
})

const pm = document.getElementById("pm");
pm.addEventListener("click", function() {
  if (!(result.textContent === "ERROR")) {
    result.textContent = (+result.textContent * -1).toString();
  }
})

const percent = document.getElementById("%");
percent.addEventListener("click", function() {
  if (!(result.textContent === "ERROR")) {
    result.textContent = (+result.textContent / 100).toString();
  }
})