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

let state;

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
  const homeScene = new Container();

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
  app.stage.addChild(homeScene);
  state = play;

  // Create a `gameOverScene` group
  // Assign the player's keyboard controllers

  // set the game state to `play`

  // Start the game loop
  // app.ticker.add(() => gameLoop());
}

// function gameLoop() {
//   btnSpin.x += btnSpin.vx;
//   btnSpin.y += btnSpin.vy;
// }

function play() {
  // All the game logic goes here
}
