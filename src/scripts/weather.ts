interface Coords {
  latitude: number
  longitude: number
}

const apiKey: string = import.meta.env.VITE_OPEN_WEATHER_API_KEY! as string
const weather = document.querySelector<HTMLDivElement>('.weather')!
const currentWeather = document.querySelector<HTMLSpanElement>('.weather__active-text')!
const activeBtn = weather.querySelector<HTMLButtonElement>('.weather__active-button')!

const ACTIVE_WEATHER = 'activeGetWeather'

const getCurrentWeather = (lat: number, lon: number) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((json) => {
      const temperture = Math.round(json.main.temp)
      const description = json.weather[0].description.toUpperCase()
      const city = json.name.toUpperCase()
      const country = json.sys.country
      currentWeather.innerText = `${temperture}° ${description} @ ${city}, ${country}`
    })
    .catch((err) => console.log(err))
}

const saveLocation = (lat: number, lon: number) => {
  const coordsObj = {
    latitude: lat,
    longitude: lon,
  }
  localStorage.setItem('coords', JSON.stringify(coordsObj))
}

const geoSuccess = (position: GeolocationPosition) => {
  const { latitude, longitude } = position.coords
  saveLocation(latitude, longitude)
  getCurrentWeather(latitude, longitude)
}

const geoError = (error: unknown) => {
  console.log(
    `${error}: Something went wrong! Can't access to get your current locations..`
  )
}

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
}

const loadLocation = () => {
  const stored = localStorage.getItem('coords')
  if (stored !== null) {
    const coords: Coords = JSON.parse(stored)
    getCurrentWeather(coords.latitude, coords.longitude)
  } else {
    getLocation()
  }
}

const handleActiveBtn = (e: Event) => {
  e.preventDefault()
  loadLocation()
  const activeGetWeather = true
  localStorage.setItem(ACTIVE_WEATHER, JSON.stringify(activeGetWeather))
}
activeBtn.addEventListener('click', handleActiveBtn)

const initWeather = () => {
  const activeGetWeather = JSON.parse(localStorage.getItem('activeGetWeather') ?? 'false')
  if (activeGetWeather === true) {
    const stored = localStorage.getItem('coords')

    if (stored !== null) {
      const coords: Coords = JSON.parse(stored)
      getCurrentWeather(coords.latitude, coords.longitude)
    }
  }
}

initWeather()
