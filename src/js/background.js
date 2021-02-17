const body = document.querySelector("body");

const IMG_NUMBER = 4;

const paintImage = (imgNumber) => {
  const image = new Image();
  image.src = `src/img/${imgNumber}.jpg`;
  image.classList.add("background-image");
  body.prepend(image);
};

const genRandomNumber = () => {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
};

const initBackground = () => {
  const randomNumber = genRandomNumber();
  paintImage(randomNumber);
};
initBackground();
