import * as PIXI from "pixi.js";
/// <reference path="../node_modules/pixi-module/stuff.d.ts">

// Aliases
const Application = PIXI.Application;
const Container = PIXI.Container;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const TextureCache = PIXI.utils.TextureCache;
const Sprite = PIXI.Sprite;
const Rectangle = PIXI.Rectangle;

// Create a Pixi Application
const app = new Application({
  antialias: true,
  transparent: false,
  resolution: 1,
  height: 650,
  width: 1150,
});

app.renderer.backgroundColor = 0x00b721;

// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let state: () => void;
const homeScene = new Container();
const gameWheelsArray: object[] = [];
let wheelSpeed: number[] = [];

loader
  .add(["../assets/img/slotOverlay.png",
    "../assets/img/winningFrameBackground.jpg",
    "../assets/img/symbols/01.png",
    "../assets/img/symbols/02.png",
    "../assets/img/symbols/03.png",
    "../assets/img/symbols/04.png",
    "../assets/img/symbols/05.png",
    "../assets/img/symbols/06.png",
    "../assets/img/symbols/07.png",
    "../assets/img/symbols/08.png",
    "../assets/img/symbols/09.png",
    "../assets/img/symbols/10.png",
    "../assets/img/symbols/11.png",
    "../assets/img/symbols/12.png",
    "../assets/img/symbols/13.png",
  ])
  .load(setup);

function setup() {

  // home Scene

  const slotOverlay = new Sprite(resources["../assets/img/slotOverlay.png"].texture);
  homeScene.addChild(slotOverlay);

  for (let j = 0; j < 5; j++) {
    const slotColumn = new Container();
    for (let i = 1; i <= 4; i++) {
      const slotBackground = new Sprite(resources["../assets/img/winningFrameBackground.jpg"].texture);
      slotBackground.position.set(60, 139 * i);
      slotColumn.addChild(slotBackground);
    }
    slotColumn.position.set(196 * j, -101);
    homeScene.addChild(slotColumn);
  }
  const rectangle = new Rectangle(192, 128, 64, 64);
  app.stage.addChild(homeScene);

  // gaming wheel (5 instance)
  for (let i = 0; i < 5; i++) {
    const gameWheel = new Container();
    let imageCounter = 1;
    for (let j = 0; j < 39; j++) {
      if (imageCounter % 13 === 0) {
        imageCounter = 1;
      }
      const imageNumber = imageCounter > 9 ? imageCounter : `0${imageCounter}`;
      const weelElement = new Sprite(resources[`../assets/img/symbols/${imageNumber}.png`].texture);
      weelElement.position.set(80, 196 * j + 15);
      gameWheel.addChild(weelElement);
      imageCounter++;
    }
    Object.defineProperty(gameWheel, "vy", {
      value: 0,
      configurable: true,
      writable: true,
      enumerable: true,
    });
    gameWheel.position.set(178 * i, -4094);
    gameWheelsArray.push(gameWheel);
    homeScene.addChild(gameWheel);
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 && state !== spin) {
      wheelSpeed = [5, -5, 5, -5, 5, -5];
      if (state) {
        state = spin;
      } else {
        state = spin;
        app.ticker.add(() => gameLoop());
      }
    } else if (e.keyCode === 32 && state === spin) {
      state = stop;
    }
  });
}

function gameLoop() {
  state();
}

function spin() {
  // Configure speed of wheels
  gameWheelsArray.forEach((wheel: PIXI.Sprite, index) => {
    wheel.y += wheelSpeed[index];
    if (Math.abs(Math.abs(wheel.y) - wheel.height) - 556 < 556
      || Math.abs(wheel.y) - 556 < 556) {
      wheelSpeed.reverse();
      const params = {
        wheel,
        speed: wheelSpeed[index],
      };
      // const event = new KeyboardEvent("keydown", {
      //   code: "32",
      // });
      // window.dispatchEvent(event);
      // state = stop;
    }
  });
}

function stop() {
  gameWheelsArray.forEach((wheel: PIXI.Sprite, index) => {
    if ( (Math.abs(wheel.y) + 420) % 196 === 0) {
      return true;
    } else { wheel.y += wheelSpeed[index]; }
  });
}
