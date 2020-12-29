const covid = document.querySelector(".covid");

function getCovid() {
  fetch(`https://api.covid19api.com/summary`)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      const korea = json.Countries[88];
      const totalConfirmed = korea.TotalConfirmed;
      const newConfirmed = korea.NewConfirmed;
      const totalRecovered = korea.TotalRecovered;
      covid.innerText = `오늘의 Covid-19 현황 : 신규 확진 환자 ${newConfirmed}명, 누적 확진 환자 ${totalConfirmed}명, 격리 해제 ${totalRecovered}명 입니다. 거리두기에 동참해주셔서 감사합니다.`;
    });
}

function init() {
  getCovid();
}

init();
