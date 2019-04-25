import * as PIXI from "pixi.js";

import { APP_BACKGROUND } from "./config/app-config";
import {
  Application,
  Container,
  images,
  initialWheelSpeed,
  loader,
  resources,
  Sprite,
  SPRITE_SIZES,
} from "./config/data-config";
import { drawGraphics } from "./graphics";
import { createWheel, wheelCanStop, wheelSpeedShouldReverse } from "./wheelAPI";

// Create a Pixi Application
const app = new Application({
  antialias: true,
  transparent: false,
  resolution: 1,
  height: 650,
  width: 1150,
});

app.renderer.backgroundColor = APP_BACKGROUND;

document.body.appendChild(app.view);

let state: () => void;
const homeScene = new Container();
const wheelContainer: object[] = [];
let wheelSpeed: number[] = [];

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

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 32 && state !== spin) {
      wheelSpeed = [...initialWheelSpeed];
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
  wheelContainer.forEach((wheel: PIXI.Sprite, index) => {
    if (wheelSpeedShouldReverse(wheel.y, wheel.height)) {
      wheelSpeed[index] = - wheelSpeed[index];
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
      }
      wheel.y += wheelSpeed[index];
    }
  });
}
