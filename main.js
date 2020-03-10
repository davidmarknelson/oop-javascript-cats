const form = document.getElementById("form");
const name = document.getElementById("catName");
const age = document.getElementById("age");
const catsContainer = document.getElementById("cats");

// ============================
// Classes
// ============================
class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  color = Cat.generateGradientStr();
  sayHi = function() {
    alert(`Hello, ${this.name}!`);
  }.bind(this);

  static randomNumberForColor() {
    return Math.floor(Math.random() * 256);
  }

  static generateRandColor() {
    let r = Cat.randomNumberForColor();
    let g = Cat.randomNumberForColor();
    let b = Cat.randomNumberForColor();
    return `rgb(${r},${g},${b})`;
  }
  
  static generateGradientStr() {
    return `linear-gradient(45deg, ${Cat.generateRandColor()}, ${Cat.generateRandColor()})`;
  }

  get ageSentence() {
    return `${this.name} is ${this.age} years old.`;
  }

  set changeName(name) {
    this.name = name;
  }
}

// ============================
// Functions
// ============================

function createCat() {
  // create cat
  let cat = new Cat(name.value, age.value);

  // create cat box
  let div = document.createElement("div");
  div.style.background = cat.color;
  div.classList.toggle("cat-box");

  // create title
  let h3 = document.createElement("h3");
  h3.innerText = cat.name;
  h3.classList.toggle("cat-title");

  // create age
  let p = document.createElement("p");
  p.innerText = cat.ageSentence;
  p.classList.toggle("cat-para");

  // create button container
  let btnDiv = document.createElement("div");
  btnDiv.classList.toggle("cat-btn-container");

  // create button
  let btn = document.createElement("button");
  btn.innerText = "Say hi!";
  btn.classList.toggle("cat-btn");
  btn.addEventListener('click', cat.sayHi);


  div.appendChild(h3);
  div.appendChild(p);
  btnDiv.appendChild(btn);
  div.appendChild(btnDiv);

  catsContainer.appendChild(div)
}

function checkInput() {
  const inputs = document.querySelectorAll("input");

  let isInputEmpty = false;
  for (let input of inputs) {
    if (input.value.length < 1) {
      isInputEmpty = true;
      input.setAttribute("required", "true");
    }
  }

  return isInputEmpty;
}

function clearInputs() {
  name.value = "";
  age.value = "";
  name.removeAttribute("required");
  age.removeAttribute("required");
}

// ============================
// Event listeners
// ============================
form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (checkInput()) return;

  createCat();
  clearInputs();
});