const listCell = document.querySelectorAll('.wrapper__field-cell')
const listWin = document.querySelectorAll('.wrapper__field-cell > img')
const timeTablo = document.querySelector('.time')
const buttonLeft = document.querySelector('.button-left')
const buttonRight = document.querySelector('.button-right')
const mainStart = document.querySelector('.main__start')
const wrapper = document.querySelector('.wrapper')
const speedCheck = document.querySelector('#quickGame__checkbox')
let x = true
let checkClick = true
const DEFAULT__TIME = '0:05'
const SPEED__TIME = '0:03'

//Переменная которая будет меняться в updateTime

function updateTime() {
  setInterval(() => {
    let time = Number(timeTablo.textContent.slice(3))
    time -= 1

    if (time === -1 && !speedCheck.checked) {
      timeTablo.innerHTML = `${DEFAULT__TIME}`
      checkClick = true
      x = x ? false : true
    }
    else if (time === -1 && speedCheck.checked) {
      timeTablo.innerHTML = `${SPEED__TIME}`
      checkClick = true
      x = x ? false : true
    }
    else {
      timeTablo.innerHTML = `0:0${time}`
    }

}, 1000)}

updateTime()



buttonRight.addEventListener('click', () => {
  mainStart.style.cssText = 'display: none'
  wrapper.style.cssText = 'display: flex'

  if (!speedCheck.checked) {
    timeTablo.innerHTML = `${DEFAULT__TIME}`
  } else {
    timeTablo.innerHTML = `${SPEED__TIME}`
  }
  x = true
})

buttonLeft.addEventListener('click', () => {
  mainStart.style.cssText = 'display: none'
  wrapper.style.cssText = 'display: flex'

  if (!speedCheck.checked) {
    timeTablo.innerHTML = `${DEFAULT__TIME}`
  } else {
    timeTablo.innerHTML = `${SPEED__TIME}`
  }
  x = false
})


listCell.forEach((item) => {
  item.addEventListener('click', function(event) {
    if (x && checkClick) {
      item.innerHTML = `<img src="./img/Ellipse 1.svg" alt="">`
      checkClick = false
    } else if (!x && checkClick) {
      item.innerHTML = `<img src="./img/Vector 1.svg" alt="">`
      checkClick = false
    }
  })
})

const listWinValue = [
  [0,4,8], [2,4,6], //диагональ
  [0,1,2], [3,4,5], [6,7,8], //горизонталь
  [0,3,6], [1,4,7], [2,5,8], //вертикаль
]

function winChecked() {

}

