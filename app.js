const app = document.querySelector("#app");

app.innerHTML = `
    <h1 class="clock">00:00:00</h1>
    <input type="button" class="clock__toggle-btn" value="AM / PM"/>
    <div class="weather"></div>
    <div class="weather-icon">
        <img class="wicon" src="" alt="Weather Icon"/>
        <span class="wdesc"></span>
    </div>
    `;
