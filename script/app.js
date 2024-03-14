import { aormatedTime } from "./helper.js"

const listCell = document.querySelectorAll('.wrapper__field-cell')
const timeTablo = document.querySelector('.time')
const totalTimeTablo = document.querySelector('.totalTime')
const buttonLeft = document.querySelector('.button-left')
const buttonRight = document.querySelector('.button-right')
const mainStart = document.querySelector('.main__start')
const wrapper = document.querySelector('.wrapper')
const speedCheck = document.querySelector('#quickGame__checkbox')
const wrapperWin = document.querySelector('.wrapper__win')
const textWin = document.querySelector('#wrapper_win-p')
let x = true
let checkClick = true
let totalTime = '0'
const DEFAULT__TIME = '0:05'
const SPEED__TIME = '0:03'
const PLAYER__ONE = `Player 1's Turn`
const PLAYER__TWO = `Player 2's Turn`

localStorage.setItem('one', JSON.stringify({
  person: 'Первый',
  wins: 0
}))

localStorage.setItem('two', JSON.stringify({
  person: 'Второй',
  wins: 0
}))

let intervalId;
function updateTime() {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    let time = Number(timeTablo.textContent.slice(3))
    totalTime = Number(totalTime) + 1
    let totalTimeMinute = Math.floor( totalTime / 60)
    let totalSeconds = totalTime - totalTimeMinute * 60
    totalTimeTablo.innerHTML = `${aormatedTime(totalTimeMinute)}:${aormatedTime(totalSeconds)}`
    let textGamer = document.querySelector('h2')
    time -= 1

    if (time === -1 && !speedCheck.checked) {
      timeTablo.innerHTML = DEFAULT__TIME
      if (checkClick) {
        winChecked()
      } else {
        checkClick = true
      }
      x = !x
      textGamer.innerHTML = textGamer.textContent === PLAYER__ONE ? PLAYER__TWO : PLAYER__ONE
    }
    else if (time === -1 && speedCheck.checked) {
      timeTablo.innerHTML = SPEED__TIME
      if (checkClick) {
        winChecked()
      } else {
        checkClick = true
      }
      x = !x
      textGamer.innerHTML = textGamer.textContent === PLAYER__ONE ? PLAYER__TWO : PLAYER__ONE
    }
    else {
      timeTablo.innerHTML = `0:0${time}`
    }
}, 1000)}

//Выбор крестик первый или нолик
function buttonChoice() {
  mainStart.style.cssText = 'display: none'
  wrapper.style.cssText = 'display: flex'
  !speedCheck.checked ? timeTablo.innerHTML = `${DEFAULT__TIME}` : timeTablo.innerHTML = `${SPEED__TIME}`
  let textGamer = document.querySelector('h2')
  textGamer.innerHTML = PLAYER__ONE

  listCell.forEach(item => {
    item.innerHTML = ''
  })

  wrapperWin.style.display = 'none'
  listCircleCross = []
  checkClick = true
  updateTime()
}

let right = false
buttonRight.addEventListener('click', () => {
  buttonChoice()
  totalTime = 0
  totalTimeTablo.innerHTML = `00:00`
  x = true
  right = true
})

let left = false
buttonLeft.addEventListener('click', () => {
  buttonChoice()
  totalTime = 0
  totalTimeTablo.innerHTML = `00:00`
  x = false
  left = true
  console.log(left)
})

//Вставляем крестики и нолики
let listCircleCross = []
listCell.forEach((item, index) => {
  item.addEventListener('click', function() {
    if (x && checkClick) {
      item.innerHTML = `<img src="./img/circle.svg" alt="">`
      checkClick = false
      listCircleCross[index] = 0
      timeTablo.textContent = '0:00'

    } else if (!x && checkClick) {
      item.innerHTML = `<img src="./img/cross.svg" alt="">`
      checkClick = false
      listCircleCross[index] = 1
      timeTablo.textContent = '0:00'
    }

    winChecked()
  })
})

const listWinValue = [
  [0,4,8], [2,4,6], //диагональ
  [0,1,2], [3,4,5], [6,7,8], //горизонталь
  [0,3,6], [1,4,7], [2,5,8], //вертикаль
]

//Проверяем на выигрышность комбинации
function winChecked() {
  const buttonRestart = document.querySelector('.wrapper__win-button')
  const personOne = JSON.parse(localStorage.getItem('one'))
  const personTwo = JSON.parse(localStorage.getItem('two'))
  let textGamer = document.querySelector('h2')

  listWinValue.forEach((item) => {
    if (listCircleCross[item[0]] === 0 && listCircleCross[item[1]] === 0 && listCircleCross[item[2]] === 0) {
      wrapperWin.style.display = 'flex'
      if (right) {
        textWin.innerHTML = `Win 1`
        personOne.wins = personOne.wins + 1
        localStorage.setItem('one', JSON.stringify(personOne))
      } else {
        textWin.innerHTML = `Win 2`
        personTwo.wins = personTwo.wins + 1
        localStorage.setItem('two', JSON.stringify(personTwo))
      }
      right = false
      clearInterval(intervalId);

    } else if (listCircleCross[item[0]] === 1 && listCircleCross[item[1]] === 1 && listCircleCross[item[2]] === 1) {
      wrapperWin.style.display = 'flex'
      if (left) {
        textWin.innerHTML = `Win 1`
        personOne.wins = personOne.wins + 1
        localStorage.setItem('one', JSON.stringify(personOne))
      } else {
        textWin.innerHTML = `Win 2`
        personTwo.wins = personTwo.wins + 1
        localStorage.setItem('two', JSON.stringify(personTwo))
      }
      left = false
      clearInterval(intervalId);
    }
  }) // Проверка условия на выигрышность

  if (listCircleCross.filter(() => !undefined).length === 9) {
    wrapperWin.style.display = 'flex'
    textWin.innerHTML = `No Win`
    listWinValue.forEach((item) => {
      if (listCircleCross[item[0]] === 0 && listCircleCross[item[1]] === 0 && listCircleCross[item[2]] === 0) {
        wrapperWin.style.display = 'flex'
        textWin.innerHTML = `Win 1`
        personOne.wins = personOne.wins + 1
        localStorage.setItem('one', JSON.stringify(personOne))

      } else if (listCircleCross[item[0]] === 1 && listCircleCross[item[1]] === 1 && listCircleCross[item[2]] === 1) {
        wrapperWin.style.display = 'flex'
        textWin.innerHTML = `Win 2`
        personTwo.wins = personTwo.wins + 1
        localStorage.setItem('two', JSON.stringify(personTwo))

      }


    })
    clearInterval(intervalId);
  } // проверка если все поле заполнено

  if (checkClick && textGamer.textContent === PLAYER__ONE) {
    wrapperWin.style.display = 'flex'
    textWin.innerHTML = `Win 2`
    personTwo.wins = personTwo.wins + 1
    localStorage.setItem('two', JSON.stringify(personTwo))
    clearInterval(intervalId);
  } else if (checkClick && textGamer.textContent === PLAYER__TWO) {
    wrapperWin.style.display = 'flex'
    textWin.innerHTML = `Win 1`
    personOne.wins = personOne.wins + 1
    localStorage.setItem('one', JSON.stringify(personOne))
    clearInterval(intervalId);
  } // проверкка на выигрышность если закончилось время

  buttonRestart.addEventListener('click', () => {
    mainStart.style.cssText = 'display: flex'
    wrapper.style.cssText = 'display: none'
  })
}

setInterval(() => {
  const personOne = document.querySelector('#personOne')
  const personTwo = document.querySelector('#personTwo')
  personOne.innerHTML = `${JSON.parse(localStorage.getItem('one')).person} : ${JSON.parse(localStorage.getItem('one')).wins}`
  personTwo.innerHTML = `${JSON.parse(localStorage.getItem('two')).person} : ${JSON.parse(localStorage.getItem('two')).wins}`
},1000)

