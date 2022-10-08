const screens = document.querySelectorAll(".screen");
const choose_product_btns = document.querySelectorAll(".choose-favorite-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const startSound = new Audio("Media/start.wav");
const clickSound = new Audio("Media/click.wav");

let seconds = 0;
let score = 0;
let selected_product = {};
let player = "";

start_btn.addEventListener("click", function start() {
  screens[0].classList.add("up");
  startSound.play();
  player = document.getElementById("name").value;
  if (player === "") {
    player = "Picker";
  }
});

choose_product_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_product = { src, alt };
    screens[1].classList.add("up");
    startSound.play();
    setTimeout(createProduct, 1000);
    startGame();
    alert(`${player}, start picking by clicking on the product!`);
  });
});

function startGame() {
  setInterval(increseTime, 1000);
}

function increseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createProduct() {
  const product = document.createElement("div");
  product.classList.add("product");
  const { x, y } = getRandomLocation();
  product.style.top = `${y}px`;
  product.style.left = `${x}px`;
  product.innerHTML = `<img src="${selected_product.src}" alt="${
    selected_product.alt
  }" style="transform: rotate(${Math.random() * 360}deg)"/>`;
  product.addEventListener("click", pickProduct);
  game_container.appendChild(product);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function pickProduct() {
  clickSound.play();
  increaseScore();
  this.classList.add("caught");
  this.remove();
  addProduct();
}

function addProduct() {
  setTimeout(createProduct, 1000);
  setTimeout(createProduct, 1500);
}

function increaseScore() {
  score++;
  if (score < 21) {
    if (score > 10) {
      message.classList.add("visible");
    }
    scoreEl.innerHTML = `Score: ${score}`;
  } else if (score == 21) {
    alert(
      `${player}, you have picked only ${
        score - 1
      } products in ${seconds} seconds! Press "Reset Game" and try harder!`
    );
  } else {
    alert(
      "Just stop picking! No overtime! If you want to start again, press 'Reset Game'"
    );
    score--;
  }
}
