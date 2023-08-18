function calculateTriangleArea() {
  const baseField = getInputValue("triangle-base");
  const heightField = getInputValue("triangle-height");

  // validate input: width and length
  if (isNaN(baseField) || isNaN(heightField)) {
    alert("Please insert a number");
    return;
  }

  // Calculate triangle height
  const area = 0.5 * baseField * heightField;

  // show triangle area
  setElementInnerText("triangle-area", area);

  addToCalculationEntry("Triangle", area);
}

function calculateRectangleArea() {
  const widthField = getInputValue("rectangle-width");
  const lengthField = getInputValue("rectangle-length");
  if (isNaN(widthField) || isNaN(lengthField)) {
    alert("Please insert a number");
    return;
  }
  const area = widthField * lengthField;
  setElementInnerText("rectangle-area", area);

  addToCalculationEntry("Rectangle", area);
}

// reusable function --> reduce duplicate code
function calculateParallelogramArea() {
  const base = getInputValue("parallelogram-base");
  const height = getInputValue("parallelogram-height");
  if (isNaN(base) || isNaN(height)) {
    alert("Please insert number");
    return;
  }
  const area = base * height;
  setElementInnerText("parallelogram-area", area);

  addToCalculationEntry("Parallelogram", area);
}

function calculateEllipseArea() {
  const majorRadius = getInputValue("ellipse-major-radius");
  const minorRadius = getInputValue("ellipse-minor-radius");
  if (isNaN(majorRadius) || isNaN(minorRadius)) {
    alert("Please insert number");
    return;
  }
  const area = 3.14 * majorRadius * minorRadius;
  const areaTwoDecimal = area.toFixed(2);
  setElementInnerText("ellipse-area", areaTwoDecimal);

  addToCalculationEntry("Ellipse", areaTwoDecimal);
}
function calculatePentagonArea() {
  const pentagonPerimeter = getInputValue("pentagon-perimeter");
  const pentragonApothem = getInputValue("pentagon-apothem");
  if (isNaN(pentagonPerimeter) || isNaN(pentragonApothem)) {
    alert("Please insert number");
    return;
  }
  const area = 0.5 * pentagonPerimeter * pentragonApothem;
  const areaTwoDecimal = area.toFixed(2);
  setElementInnerText("pentagon-area", areaTwoDecimal);

  addToCalculationEntry("Pentagon", areaTwoDecimal);
}
function calculateRhombusArea() {
  const rhombusOne = getInputValue("rhombus-one");
  const rhombusTwo = getInputValue("rhombus-two");
  if (isNaN(rhombusOne) || isNaN(rhombusTwo)) {
    alert("Please insert number");
    return;
  }
  const area = 0.5 * rhombusOne * rhombusTwo;
  const areaTwoDecimal = area.toFixed(2);
  setElementInnerText("rhombus-area", areaTwoDecimal);

  addToCalculationEntry("Rhombus", areaTwoDecimal);
}

// reusable get input value field in number
function getInputValue(fieldId) {
  const inputField = document.getElementById(fieldId);
  const inputValueText = inputField.value;
  const value = parseFloat(inputValueText);
  return value;
}

// reusable set span, p, div, etc text
function setElementInnerText(elementId, area) {
  const element = document.getElementById(elementId);
  element.innerText = area;
}

function validateElement(inputOne, inputTwo) {
  if (isNaN(inputOne) || isNaN(inputTwo)) {
    alert("Please insert number");
    return;
  }
}

// add to calculation entry
/**
 * 1. get the element where you want to add the dynamic HTML
 * 2. create an element you want to add
 * 3. if needed add some class
 * 4. set inner HTML. it could be dynamic Template string
 * 5. append the created element as a child of the parent
 */
function addToCalculationEntry(areaType, area) {
  console.log(areaType + " " + area);
  const calculationEntry = document.getElementById("calculation-entry");

  const count = calculationEntry.childElementCount;

  const p = document.createElement("p");
  p.classList.add(`my-${count + 1}`);
  p.innerHTML = `${
    count + 1
  }. ${areaType} ${area} cm<sup>2</sup> <button class="btn btn-sm btn-success" id="convertm">Convert</button>`;

  calculationEntry.appendChild(p);

  //
  //   document.getElementById("convertm").addEventListener("click", function () {
  //     miter = area * 0.0001;
  //     document.querySelector(`.my-${count + 1}`).innerHTML = `${
  //       count + 1
  //     }. ${areaType} ${miter} cm<sup>2</sup> `;
  //   });
}

// Data validation
/**
 * 1. set the proper type of the input field. (number, data, email)
 * 2. check type using typeof
 * 3. NaN means: Not a Number.  isNaN is checking whether the input is not a number or not
 */
