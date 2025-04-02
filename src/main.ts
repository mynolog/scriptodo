import './styles/style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <header class="header">
      <div class="weather">
        <div class="weather__column active">
          <button
            class="weather__active-button"
            title="Click to get current weather"
          >
            <i class="fas fa-map-marker-alt"></i>
          </button>
          <span class="weather__active-text">Get current weather</span>
        </div>
        <div class="weather__column display"></div>
      </div>

      <div class="js-clock clock">
        <div class="clock-options">
          <input
            type="checkbox"
            class="js-clock-mode clock-switch"
            id="clock-mode"
          />
          <label for="clock-mode">24 Hours</label>
        </div>
        <div class="clock-main">
          <div class="clock-main__column">
            <h1 class="js-clock-title clock-title">00:00</h1>
          </div>
          <div class="clock-main__column">
            <h2 class="js-clock-second clock-second">00</h2>
            <h2 class="js-clock-subtitle clock-subtitle"></h2>
          </div>
        </div>
        <h3 class="date-title"></h3>
      </div>
    </header>
    <div class="main">
      <form class="js-nameForm name-form">
        <input
          type="text"
          class="name-input"
          placeholder="What is your name?"
        />
      </form>
      <h4 class="js-greetings greeting"></h4>
    
      <form class="js-toDoForm todo-form">
        <input type="text" class="todo-input" placeholder="Write a to do" />
      </form>
      <ul class="js-toDoList todo-list"></ul>
    </div>
   
`
