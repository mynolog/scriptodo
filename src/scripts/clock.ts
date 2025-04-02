const clockContainer = document.querySelector<HTMLDivElement>('.js-clock')!
const clockMode = document.querySelector<HTMLInputElement>('.js-clock-mode')!
const clockTitle = clockContainer.querySelector<HTMLHeadingElement>('.js-clock-title')!
const clockSubtitle =
  clockContainer.querySelector<HTMLHeadingElement>('.js-clock-subtitle')!
const clockSecond = clockContainer.querySelector<HTMLHeadingElement>('.js-clock-second')!
const dateTitle = clockContainer.querySelector<HTMLHeadingElement>('.date-title')!

const CLOCK_MODE_LS = 'is24Hours'
let is24HoursClock: boolean

const loadClockMode = () => {
  is24HoursClock = JSON.parse(localStorage.getItem(CLOCK_MODE_LS)!)
  if (is24HoursClock === null) {
    clockMode.checked = true
    return is24HoursClock
  } else {
    clockMode.checked = is24HoursClock
    return is24HoursClock
  }
}

const saveClockMode = (status: boolean) => {
  localStorage.setItem(CLOCK_MODE_LS, JSON.stringify(status))
}

const handleClockMode = (e: Event) => {
  const target = e.target as HTMLInputElement
  const isChecked = target.checked
  saveClockMode(isChecked)
}

const getCurrentTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  if (is24HoursClock) {
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`
  } else {
    clockTitle.innerText = `${hours > 12 ? `${hours - 12}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`
    clockSubtitle.innerText = `${hours > 11}` ? 'PM' : 'AM'
  }
  clockSecond.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`
}

const getCurrentDate = () => {
  const currentDate = new Date()
  const month = currentDate.getMonth()
  const date = currentDate.getDate()
  const day = currentDate.getDay()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  dateTitle.innerText = `${days[day]}, ${months[month]} ${date}`
}

clockMode.addEventListener('click', handleClockMode)

const initClock = () => {
  loadClockMode()
  setInterval(() => {
    getCurrentTime()
    getCurrentDate()
  }, 1000)
}

initClock()
