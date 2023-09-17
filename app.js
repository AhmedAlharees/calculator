const themeSwitcher = document.querySelector('#theme');
const themes = document.querySelectorAll('input[name = theme]');
const inputContainer = document.querySelector('.themes-input');
const previousResultDisplay = document.querySelector('.previous-result__text');
const cureentResultDisplay = document.querySelector('.current-result__text');
const resetBtn = document.querySelector('.reset-btn');
const deleteBtn = document.querySelector('.delete-btn');
const numbers = document.querySelectorAll('.number');
const operands = document.querySelectorAll('.operand');
const equalBtn = document.querySelector('.equal-btn');
const dotOperand = document.querySelector('.dot-operand');


/* functions */

const changeTheme = function (e) {
  const chosenTheme = e.target.classList.value;
  themeSwitcher.href = `./dist/css/${chosenTheme}.css`;
};

const resetDisplay = function () {
  previousResultDisplay.textContent = '';
  cureentResultDisplay.textContent = '';
};

const deleteLastInput = function () {
  const result = cureentResultDisplay.textContent.slice(0, -1);
  cureentResultDisplay.textContent = result;
};

const display = function (value) {
  cureentResultDisplay.textContent += value;
};

const summation = function () {
  const previousValue = +previousResultDisplay.textContent.slice(0, -1);
  const currentValue = +cureentResultDisplay.textContent;
  previousResultDisplay.textContent = currentValue;
  cureentResultDisplay.textContent = '';
  if (previousValue !== '' && currentValue !== '')
    previousResultDisplay.textContent =
      previousValue + currentValue + ' ' + '+';
};

const subtraction = function () {
  const previousValue = previousResultDisplay.textContent.slice(0, -1);
  const currentValue = cureentResultDisplay.textContent;

  if (previousValue == '') {
    previousResultDisplay.textContent = currentValue + ' ' + '-';
    cureentResultDisplay.textContent = '';
  } else {
    previousResultDisplay.textContent =
      +previousValue - +currentValue + ' ' + '-';
    cureentResultDisplay.textContent = '';
  }
};

const multiplication = function () {
  const previousValue = previousResultDisplay.textContent.slice(0, -1);
  const currentValue = cureentResultDisplay.textContent;
  if (previousValue == '') {
    previousResultDisplay.textContent = currentValue + ' ' + '×';
    cureentResultDisplay.textContent = '';
  } else {
    previousResultDisplay.textContent =
      +previousValue * +currentValue + ' ' + '×';
    cureentResultDisplay.textContent = '';
  }
};
const division = function () {
  const previousValue = previousResultDisplay.textContent.slice(0, -1);
  const currentValue = cureentResultDisplay.textContent;
  if (previousValue == '') {
    previousResultDisplay.textContent = currentValue + ' ' + '/';
    cureentResultDisplay.textContent = '';
  } else {
    previousResultDisplay.textContent =
      +previousValue / +currentValue + ' ' + '÷';
    cureentResultDisplay.textContent = '';
  }
};
const whatOperation = function (operand) {
  if (isNaN(cureentResultDisplay.textContent)) return;
  if (operand === '+') summation();
  else if (operand === '-') subtraction();
  else if (operand === '×') multiplication();
  else if (operand === '/') division();
};

const equality = function () {
  const operand = previousResultDisplay.textContent.slice(-1);
  const previousValue = previousResultDisplay.textContent.slice(0, -1);
  const currentValue = cureentResultDisplay.textContent;
  if (previousValue && currentValue) {
    switch (operand) {
      case '+':
        summation();
        break;
      case '-':
        subtraction();
        break;
      case '/':
        division();
        break;
      case '×':
        multiplication();
      default:
        break;
    }
    cureentResultDisplay.textContent = previousResultDisplay.textContent.slice(
      0,
      -1
    );
    previousResultDisplay.textContent = '';
  }
};

/* event listeners */

themes.forEach((theme) => {
  theme.addEventListener('pointerdown', changeTheme);
});

resetBtn.addEventListener('pointerdown', resetDisplay);

deleteBtn.addEventListener('pointerdown', deleteLastInput);

numbers.forEach((number) => {
  number.addEventListener('pointerdown', () => display(number.value));
});

operands.forEach((operand) => {
  operand.addEventListener('pointerdown', () => whatOperation(operand.value));
});

equalBtn.addEventListener('pointerdown', equality);

dotOperand.addEventListener('pointerdown', () => {
  const currentValue = cureentResultDisplay.textContent;
  console.log(currentValue.slice(0, 1));
  if (currentValue.includes('.')) return;
  display('.');
});
