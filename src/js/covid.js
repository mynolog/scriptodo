const covid = document.querySelector(".covid");
const summury = covid.querySelector(".covid--summury");

function getCovid() {
  fetch("https://covid-193.p.rapidapi.com/statistics?country=S-Korea", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4a3f424895msh6e9b210d0323fd9p13f1c4jsn63818c9ece13",
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const res = json.response[0];
      console.log(res);
      const date = res.day;
      const cases = res.cases;
      const newConfirmed = Number(cases.new.substring(1)).toLocaleString();
      const totalConfirmed = cases.total.toLocaleString();
      const recovered = cases.recovered.toLocaleString();
      summury.innerText = `New Confirmed ${newConfirmed}명 
                            Total Confirmed ${totalConfirmed}명 
                            Recovered ${recovered}명`;
    });
}

function init() {
  getCovid();
}

init();
