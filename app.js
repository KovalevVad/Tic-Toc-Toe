const listCell = document.querySelectorAll('.wrapper__field-cell')
const listWin = document.querySelectorAll('.wrapper__field-cell > img')
const timeTablo = document.querySelector('.time')
const totalTimeTablo = document.querySelector('.totalTime')
const buttonLeft = document.querySelector('.button-left')
const buttonRight = document.querySelector('.button-right')
const mainStart = document.querySelector('.main__start')
const wrapper = document.querySelector('.wrapper')
const speedCheck = document.querySelector('#quickGame__checkbox')
const wrapperWin = document.querySelector('.wrapper__win')
let x = true
let checkClick = true
let totalTime = '0'
const DEFAULT__TIME = '0:05'
const SPEED__TIME = '0:01'

localStorage.setItem('one', JSON.stringify({
  person: 'Первый',
  wins: 0
}))

localStorage.setItem('two', JSON.stringify({
  person: 'Второй',
  wins: 0
}))


function updateTime() {
  setInterval(() => {
    let time = Number(timeTablo.textContent.slice(3))
    totalTime = Number(totalTime) + 1
    totalTime = +totalTime < 10 ? '0' + +totalTime : totalTime
    totalTimeTablo.innerHTML = `0:${totalTime}`
    let textGamer = document.querySelector('h2')
    time -= 1

    if (time === -1 && !speedCheck.checked) {
      timeTablo.innerHTML = DEFAULT__TIME
      checkClick = true
      x = x ? false : true
      textGamer.textContent === `Player 1's Turn` ? textGamer.innerHTML = `Player 2's Turn` :  textGamer.innerHTML = `Player 1's Turn`
    }
    else if (time === -1 && speedCheck.checked) {
      timeTablo.innerHTML = SPEED__TIME
      checkClick = true
      x = x ? false : true
      textGamer.textContent === `Player 1's Turn` ? textGamer.innerHTML = `Player 2's Turn` :  textGamer.innerHTML = `Player 1's Turn`
    }
    else {
      timeTablo.innerHTML = `0:0${time}`
    }
}, 1000)}

function buttonСhoice() {
  mainStart.style.cssText = 'display: none'
  wrapper.style.cssText = 'display: flex'
  !speedCheck.checked ? timeTablo.innerHTML = `${DEFAULT__TIME}` : timeTablo.innerHTML = `${SPEED__TIME}`

  listCell.forEach(item => {
    item.innerHTML = ''
  })

  wrapperWin.style.display = 'none'
  listCircleCross = []
  updateTime()
}

buttonRight.addEventListener('click', () => {
  buttonСhoice()
  totalTime = 0
  totalTimeTablo.innerHTML = `0:00`
  x = true
})

buttonLeft.addEventListener('click', () => {
  buttonСhoice()
  totalTime = 0
  totalTimeTablo.innerHTML = `0:00`
  x = false
})

//Вставляем крестики и нолики
let listCircleCross = []
listCell.forEach((item, index) => {
  item.addEventListener('click', function() {
    if (x && checkClick) {
      item.innerHTML = `<img src="./img/Ellipse 1.svg" alt="">`
      checkClick = false
      listCircleCross[index] = 0

    } else if (!x && checkClick) {
      item.innerHTML = `<img src="./img/Vector 1.svg" alt="">`
      checkClick = false
      listCircleCross[index] = 1
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
  const textWin = document.querySelector('#wrapper_win-p')
  const buttonRestart = document.querySelector('.wrapper__win-button')
  const personOne = JSON.parse(localStorage.getItem('one'))
  const personTwo = JSON.parse(localStorage.getItem('two'))

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

  if (listCircleCross.filter(item => !undefined).length === 9) {
    console.log(listCircleCross)
    wrapperWin.style.display = 'flex'
    textWin.innerHTML = `No Win`
  }
  // Условие срабатывает раньше чем ForEach ListWinValue

  buttonRestart.addEventListener('click', () => {
    mainStart.style.cssText = 'display: flex'
    wrapper.style.cssText = 'display: none'
  })
}

