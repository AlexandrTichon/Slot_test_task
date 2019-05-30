import {Howl} from "howler";
import * as PIXI from "pixi.js";

// Aliases
export const Application = PIXI.Application;
export const Container = PIXI.Container;
export const loader = PIXI.loader;
export const resources = PIXI.loader.resources;
export const TextureCache = PIXI.utils.TextureCache;
export const Sprite = PIXI.Sprite;
export const Rectangle = PIXI.Rectangle;

export const initialWheelSpeed = [25, 28, 24, 29, 27];

export const images = ["../assets/img/slotOverlay.png",
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
];

export const SPRITE_SIZES = {
  wheelInterval: 25,
  backgroundElementSizes: {
    width: 196,
    height: 139,
  },
  backgroundSizes: {
    width: 1050,
    height: 550,
  },
  symbolSizes: {
    width: 196,
    height: 178,
  },
  stdWheelHeight: 2314,
};

export const APP_SOUNDS = {
  reelSpin: new Howl({
    src: ["../assets/audio/Reel_Spin.mp3"],
  }),
  landing: new Howl({
    src: ["../assets/audio/Landing_1.mp3"],
  }),
};
