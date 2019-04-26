import * as PIXI from "pixi.js";

import { drawGraphics } from "./api/graphics";
import { createWheel, wheelCanStop, wheelSpeedShouldReverse } from "./api/wheel";
import { APP_BACKGROUND, APP_SCREEN_SIZES, SPIN_BTN } from "./config/app-config";
import {
  APP_SOUNDS,  Application,  Container,
  images,  initialWheelSpeed,  loader,
  resources,  Sprite,
  SPRITE_SIZES,
} from "./config/data-config";
import "./index.scss";

// Create a Pixi Application
const app = new Application({
  antialias: true,
  transparent: false,
  resolution: 1,
  height: APP_SCREEN_SIZES.height,
  width: APP_SCREEN_SIZES.width,
});

app.renderer.backgroundColor = APP_BACKGROUND;

document.querySelector("#game-content").appendChild(app.view);

let state: () => void;
const homeScene = new Container();
const wheelContainer: object[] = [];
let wheelSpeed: number[] = [];
let previousWheelSpeed: number[] = [];

loader
  .add(images)
  .load(setup);

function setup() {
  const {wheelInterval, backgroundElementSizes, symbolSizes} = SPRITE_SIZES;

  // draw background
  const slotOverlay = new Sprite(resources["../assets/img/slotOverlay.png"].texture);
  for (let j = 0; j < 6; j++) {
    const slotColumn = new Container();
    for (let i = 0; i < 5; i++) {
      const slotBackground = new Sprite(resources["../assets/img/winningFrameBackground.jpg"].texture);
      slotBackground.position.set(0, backgroundElementSizes.height * i);
      slotColumn.addChild(slotBackground);
    }
    slotColumn.position.set(symbolSizes.width * j, 0);
    homeScene.addChild(slotColumn);
  }

  // gaming wheels (5 instance)
  for (let i = 0; i < 5; i++) {
    const wheel = createWheel(13, "../assets/img/symbols/");
    wheel.position.set(((178 + wheelInterval) * i - wheelInterval),
     -wheel.height / 2 - wheelInterval * 3);
    wheelContainer.push(wheel);
    homeScene.addChild(wheel);
  }

  // draw frame
  const graphics = new PIXI.Graphics();
  drawGraphics(graphics);
  homeScene.addChild(graphics);

  homeScene.addChild(slotOverlay);
  app.stage.addChild(homeScene);

  // add spin-btn handler
  SPIN_BTN.addEventListener("click", () => {
    if (state !== spin) {
      APP_SOUNDS.reelSpin.play();  // play sounds
      SPIN_BTN.setAttribute("disabled", "");
      if (state) {
        state = spin;
        wheelSpeed = [...previousWheelSpeed];
      } else {
        state = spin;
        wheelSpeed = [...initialWheelSpeed];
        previousWheelSpeed = [...initialWheelSpeed];
        app.ticker.add(() => gameLoop());
      }
    }
    setTimeout(() => {
      state = stop;
      APP_SOUNDS.reelSpin.stop();
      APP_SOUNDS.landing.play();
      SPIN_BTN.removeAttribute("disabled");
    }, 5700);
  });
}

function gameLoop() {
  state();
}

function spin() {
  // Configure speed of wheels
  wheelContainer.forEach((wheel: PIXI.Sprite, index) => {
    if (wheelSpeedShouldReverse(wheel.y, wheel.height)) {
      wheelSpeed[index] = - wheelSpeed[index];
      previousWheelSpeed[index] = wheelSpeed[index];
    }
    wheel.y += wheelSpeed[index];
  });
}

function stop() {
  wheelContainer.forEach((wheel: PIXI.Sprite, index) => {
    const stopData = wheelCanStop(wheel.y, wheelSpeed[index]);
    if (stopData.flag) {
      wheel.y += stopData.stopDistance;
      wheelSpeed[index] = 0;
      return true;
    } else {
      if (wheelSpeedShouldReverse(wheel.y, wheel.height)) {
        wheelSpeed[index] = - wheelSpeed[index];
        previousWheelSpeed[index] = - wheelSpeed[index];
      }
      wheel.y += wheelSpeed[index];
    }
  });
}
