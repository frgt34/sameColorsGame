// Поле 2х2 появляются квадратики с цветами
// после прошествия 2 секунд квадратики скрываются
// Цель найти одинаковые квадратики
// html - создать блок и в нем 3х3 квадратики разных цветов

// JS
// При клике на квадратик запоминаем цвет
// - слушатель события - клик
// - как запоминать цвет?
// При клике на второй квадартик сравниваем цвет и в случае соотвествия удаляем оба квадрата (победа)
// При неверном - заново
// -- как начинать игру заново? Цвета те же или случайные?

// Новый уровень увеличивается область до 3х3
// Квадратики имеют случайные цвета (из определнного набора цветов)
// - Как генерировать цвета? Как генерировать случайые цвета? Как генерировать случайые цвета (из определнного набора цветов).
// -- проверять чтобы не было трёх квадратиков одинаокого цвета и обязательно было два одинаковых

// Выбор сложности
// Сложность является определяющей для создания цветов, квадратов и прочих настроек игры
// 1 - 2 - 3
//
// 1 - 2^2= 4
// 2 - 3^2= 9
// 3 - 4^2= 16

// 
const colorListEasy = ["green", "gold", "skyblue", "tomato", "brown", "gray"]; //использовать несколько массивов с цветами или один?
const colorListMedium = ["green", 'AntiqueWhite', 'Aqua', 'Aquamarine', 'BlueViolet', 'Blue', "gold", "skyblue", "tomato", "brown", "gray"]; //использовать несколько массивов с цветами или один?
const colorListHard = ["green", 'Brown', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'BlueViolet', 'Blue', 'Chartreuse', "gold", "skyblue", "tomato", "brown", "gray", 'DarkCyan', 'DarkOrchid', 'IndianRed', 'GreenYellow']; //использовать несколько массивов с цветами или один?
let rememberedColor = null;
const startGameBtn = document.querySelector(".startGame");
const gameBorder = document.querySelector(".gameBorder"); // постараться убрать
let counter = 0;
let newCheckElem;
let chosenHardness = 'Easy';
var select = document.getElementById("select");





const HARDNESS_NAMES = ['Easy', 'Medium', 'Hard'];


console.log(chosenHardness);

// Обработка клика по полю (кваратам)
// Handle click
function gameboardHandler(event) {
  if (counter < 2) {
    counter += 1;
  } else if (counter >= 2) {
    counter = 1;
  }
  console.log(counter);
  // СРАВНЕНИЕ ЦВЕТОВ
  console.log(event.target);
  // Запоминаем новый цвет
  const squareColor = event.target.style.backgroundColor;
  console.log(squareColor);
  const checkElem = event.target;
  console.log(checkElem);

  if (counter == 1) {
    newCheckElem = checkElem;
  }
  // Сравниваем со старым цветом
  // Если цвета свопададают - победа
  // - сранивать не только цвет, но и учитывать что мы должны кликать на разные квадраты, а не один и тот же
  
  // Сравниваем цвет текущего квадра и цветов предыдущего квадра
  const isSameColor = squareColor == rememberedColor;

  const isSameSquare = event.target == newCheckElem;

  if (isSameColor && !isSameSquare) {
    alert("Вы выиграли");
    console.log(newCheckElem);
  } else {
    // Если цвета не совпадаюат - запомнить "новый цвет", который при следуюдем клике уже будет "старым цвет"
    rememberedColor = squareColor;
  }

}

// СЛУШАЕМ КЛИК НА ПОЛЕ

gameBorder.addEventListener("click", gameboardHandler);

function createSquare() {
  const el = document.createElement("div");
  el.className = "square";
  return el;
}

function createNewGameField(state) {
  state.parentElem.innerHTML = "";

  // Перезапиываем ВСЕ старые классы на оди оригинальный (как бы удаляем ненужные)
  state.parentElem.className = 'gameBorder';

  const gameBorderHardName = 'gameBorder_' + HARDNESS_NAMES[state.hardness - 1];
  state.parentElem.classList.add(gameBorderHardName);


  for (let i = 0; i < state.squaresNumber; i++) {
    const newSquare = createSquare();
    state.parentElem.append(newSquare);
  }
  paintSquares(state);
}

// function createLevel() {
//   for (let i = 0; i < 9; i++) {
//     const el = document.createElement("div");
//     el.className = "square";
//     gameBorder.append(el);
//   }
// }

const testConfigEasy= {
  hardness: 1,
  playerName: "Alex9001",
  fadeDelay: 1.5, // 1.5s == 1500ms
  fieldSize: 3, // 5x5
  appSelector: ".gameBorder",
  colorList: colorListEasy
};

const testConfigMedium = {
  hardness: 2,
  playerName: "Alex9000",
  fadeDelay: 1.5, // 1.5s == 1500ms
  fieldSize: 4, // 5x5
  appSelector: ".gameBorder",
  colorList: colorListMedium
};
const testConfigHard = {
  hardness: 3,
  playerName: "Alex9000",
  fadeDelay: 1.5, // 1.5s == 1500ms
  fieldSize: 5, // 5x5
  appSelector: ".gameBorder",
  colorList: colorListHard
};

const DanilConfig = {
  hardness: 1,
  playerName: "Danil",
  fadeDelay: 1.5, // 1.5s == 1500ms
  fieldSize: 5, // 5x5
  appSelector: ".gameBorder__DANIL",
};

let chosenConfig = testConfigEasy;

// обработка сложности из селекта
select.addEventListener("change", function(){
  chosenHardness = this.options[this.selectedIndex].text;
})

function changeConfig(){
  console.log(chosenHardness);

  if (chosenHardness == 'Easy')
    chosenConfig = testConfigEasy
  else if (chosenHardness == 'Medium')
    chosenConfig = testConfigMedium
  else if (chosenHardness == 'Hard') {
    console.log('We are in hard');
    chosenConfig = testConfigHard;
  }
  return chosenConfig
}

console.log(startNewGame(chosenConfig));

function startNewGame(config) {
  const state = {
    hardness: config.hardness,
    squaresNumber: 0,
    playerName: config.playerName,
    parentElem: document.querySelector(config.appSelector), // включить в работу
    score: 0, // количество набранных очков
    currentLevel: 0, // текущий уровень игры у игрока (сколько уровней прошел)
    colorList: config.colorList
  };
  const newConfig = changeConfig()

  console.log(newConfig);

  state.hardness = newConfig.hardness;
  state.colorList = newConfig.colorList;
 

  console.log(state);
  console.log(encodeURIComponent(JSON.stringify(state)));

  state.squaresNumber = Math.pow(state.hardness + 1, 2)
  console.log(state.squaresNumber);

  createNewGameField(state);
}

startGameBtn.addEventListener("click", function(){
  startNewGame(chosenConfig);
});

// НЕ путать game (череда уровней) и level (текущий уровень где надо отгадать)

//level.addEventListener("click", createLevel);

// РАССКШРАШВИАЕМ КВАДРАТИКИ
function paintSquares (state) {
  const allSquares = state.parentElem.querySelectorAll(".square");
  const chosenColors = [];
  console.log(state);
  let tempColors = state.colorList.slice();

  // Расскрасить все квадратики в случайные НЕПОВТОРЯЩИЕСЯ цвета
  allSquares.forEach(function (elem) {
    // setColorToSquare
    // вынести рандомную часть в отдельную функцию getRand(arr);
    var rand = Math.floor(Math.random() * tempColors.length);
    // перед расскрашиванием проверять что такого цвета нет в наборе, иначе - снова получить рандомный цвет
    const forTwoSquares = tempColors[rand];
    chosenColors.push(tempColors[rand]);
    elem.style.backgroundColor = tempColors[rand];
    tempColors.splice(tempColors.indexOf(forTwoSquares), 1);
  });

  randDiv = Math.floor(Math.random() * allSquares.length);
  chosenColors.splice(randDiv, 1);
  if (randDiv == 3) {
    randDiv = randDiv - 1;
    allSquares[randDiv + 1].style.backgroundColor = chosenColors[randDiv];
  } else {
    allSquares[randDiv].style.backgroundColor = chosenColors[randDiv];
    console.log(chosenColors[randDiv]);
  }
}

// При запуске окна
window.addEventListener("load", function(){
  startNewGame(chosenConfig);
});
// window.addEventListener("load", function(){
//   startNewGame(DanilConfig);
// });


// hideColors 
// startNewLevel
// save stae to cookie
// load state from cookie
// подсчет итоговых очков юзера
// подсчёт жизней (право на ошибку) у юзера

// ДЗ:
// 1. почистить код от лишних комментов и логов
// 2. переименовать переенные и функции если требуется
// 3. по возможности всё понемногу переносить в state и рабоатть через него
// 4. болшинство функицй будут принимать стейт или его часть в качестве аргумента


var capitals = function (word) {
  let splittedArr = word.split('');
  let capArr = [];
  // console.log(splittedArr);
  splittedArr.forEach(function(elem, index){
   if (elem == elem.toUpperCase() && elem === 0)
     capArr.push('+' + index);
    // else if (elem == elem.toUpperCase())
    //  capArr.push(index)
console.log(capArr);
      })
      return capArr;
  }
 ;