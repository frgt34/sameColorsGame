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
const colorList = ["green", "gold", "skyblue", "tomato", "brown", "gray"];
let rememberedColor = null;
const allSquares = document.querySelectorAll(".square");
const startGameBtn = document.querySelector(".startGame");
let counter = 0;
let newCheckElem;
// is old element was checked
// wasElemChoosen
// oldCheckedElem

// СЛУШАЕМ КЛИК НА ПОЛЕ
const gameBorder = document.querySelector(".gameBorder");

gameBorder.addEventListener("click", function (event) {
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
    console.log(newCheckElem);
  }
  // Сравниваем со старым цветом
  // Если цвета свопададают - победа
  // - сранивать не только цвет, но и учитывать что мы должны кликать на разные квадраты, а не один и тот же
  if (squareColor == rememberedColor && event.target !== newCheckElem) {
    alert("Вы выиграли");
    console.log(newCheckElem);
  } else {
    // Если цвета не совпадаюат - запомнить "новый цвет", который при следуюдем клике уже будет "старым цвет"
    rememberedColor = squareColor;
  }
});

function createSquare() {
  const el = document.createElement("div");
  el.className = "square";
  return el;
}

function createNewGameField() {
  gameBorder.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const newSquare = createSquare();
    gameBorder.append(newSquare);
  }
}

// function createLevel() {
//   for (let i = 0; i < 9; i++) {
//     const el = document.createElement("div");
//     el.className = "square";
//     gameBorder.append(el);
//   }
// }

const testConfig = {
  hardness: 1,
  playerName: "Alex9000",
  fadeDelay: 1.5, // 1.5s == 1500ms  
  fieldSize: 5 // 5x5
}

function startNewGame(config) {
  // если нужно, обнулять старые переменные до начальных значений (например счёт игрока)
  // возможно, создать/задать новые переменные (типа имя игрока...)
  // создаётс новое игровое поле из конфига
  createNewGameField();
}

startGameBtn.addEventListener("click", startNewGame);

// НЕ путать game (череда уровней) и level (текущий уровень где надо отгадать)

//level.addEventListener("click", createLevel);


// При запуске окна
window.addEventListener("load", function (event) {
  // РАССКШРАШВИАЕМ КВАДРАТИКИ
  // setColorsToAllSquares

  console.log(allSquares);

  const chosenColors = [];
  let tempColors = colorList;

  // Расскрасить все квадратики в случайные НЕПОВТОРЯЩИЕСЯ цвета
  allSquares.forEach(function (elem) {
    // setColorToSquare
    // вынести рандомную часть в отдельную функцию getRand(arr);
    var rand = Math.floor(Math.random() * tempColors.length);
    // const rand = getRand(colorList);

    // перед расскрашиванием проверять что такого цвета нет в наборе, иначе - снова получить рандомный цвет
    const randik = tempColors[rand];
    console.log(randik);
    chosenColors.push(tempColors[rand]);
    elem.style.backgroundColor = tempColors[rand];
    tempColors.splice(tempColors.indexOf(randik), 1);
    console.log(tempColors);
    console.log(chosenColors);
  });
  randDiv = Math.floor(Math.random() * allSquares.length);
  chosenColors.splice(randDiv, 1);
  console.log(chosenColors);
  console.log(randDiv);
  console.log(allSquares[randDiv]);
  if (randDiv == 3) {
    randDiv = randDiv - 1;
    console.log(randDiv);
    allSquares[randDiv + 1].style.backgroundColor = chosenColors[randDiv];
    console.log(chosenColors[randDiv]);
  } else {
    allSquares[randDiv].style.backgroundColor = chosenColors[randDiv];
    console.log(chosenColors[randDiv]);
  }

  console.log(tempColors);
  // Выбрать случайный квадратик
  //const randSquare = getRand(allSquares);

  // Перекрашиваем этот квадратик в один из набора ВЫБРАННЫХ цветов, чтобы получить два квадратика одного цвета
});
