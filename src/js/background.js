const body = document.querySelector("body");

const IMG_NUMBER = 4;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `src/img/${imgNumber}.jpg`;
  image.classList.add("background-image");
  body.prepend(image);
}

function genRandom() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
