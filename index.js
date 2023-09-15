const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("PassLen");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numEl = document.getElementById("numbers");
const symbEl = document.getElementById("symbols");
const generEl = document.getElementById("GBTN");
const copyEl = document.getElementById("copy-btn");

const randomPass = {
  lower: getRandomLowercase,
  upper: getRandomUppercase,
  number: getRandomNumber,
  symbols: getRandomSymbol,
};

function getRandomUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbol = '~`!@#$%^&*()_-+={}[]|;":><,./?' + "'";
  return symbol[Math.floor(Math.random() * symbol.length)];
}

function generatePassword(upper, lower, number, symbols, length) {
  let generatedPassword = "";
  const typeCount = upper + lower + number + symbols;
  const typeArr = [{ upper }, { lower }, { number }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );
  if (typeCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomPass[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

generEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNum = numEl.checked;
  const hasSymb = symbEl.checked;
  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNum,
    hasSymb,
    length
  );
});

copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});
