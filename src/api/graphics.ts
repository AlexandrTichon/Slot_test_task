import * as PIXI from "pixi.js";

export function drawGraphics(graphics: PIXI.Graphics) {
  // top and bottom
  graphics.beginFill(0x00b721);
  graphics.drawRect(0, 0, 1150, 38);
  graphics.drawRect(0, 595, 1150, 650);

  // left and right
  graphics.drawRect(0, 0, 30, 650);
  graphics.drawRect(1080, 38, 1150, 650);
}
