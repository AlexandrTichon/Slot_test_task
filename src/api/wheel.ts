import {
  Container,
  resources,
  Sprite,
  SPRITE_SIZES,
} from "../config/data-config";

export function createWheel(spriteNum: number, spriteSrcFolder: string) {
  // wheel consist from 3 same elements (wheelElement), that consist sprites
  const {wheelInterval, symbolSizes} = SPRITE_SIZES;
  const wheel = new Container();
  let imageCounter = 1;
  for (let i = 0; i < 3; i++) {
    const wheelElement = new Container();
    for (let j = 0; j < spriteNum; j++) {
      if (imageCounter % spriteNum === 0) {
        imageCounter = 1;
      }
      const imageNumberName = imageCounter > 9 ? imageCounter : `0${imageCounter}`;
      const spriteSrc = `${spriteSrcFolder}${imageNumberName}.png`;
      const wheelSprite = new Sprite(resources[spriteSrc].texture);

      wheelSprite.position.set(wheelInterval * 3, symbolSizes.height * j + wheelInterval);
      wheelElement.addChild(wheelSprite);
      imageCounter++;
    }
    wheelElement.position.set(0, wheelElement.height * i);
    wheel.addChild(wheelElement);
  }
  return wheel;
}

export function wheelCanStop(position: number, speed: number) {
  const {wheelInterval, symbolSizes} = SPRITE_SIZES;

  for (let i = 0; i < Math.abs(speed); i++) {
    if ((Math.abs(position) + wheelInterval + i) % symbolSizes.height === 0) {
      let stopDistance = i;
      if (speed < 0) {
      stopDistance = -i;
      }
      return {
        stopDistance,
        flag: true,
      };
    }
  }
  return {
    flag: false,
  };
}

export function wheelSpeedShouldReverse(position: number, height: number) {
  const { backgroundSizes } = SPRITE_SIZES;
  return (Math.abs(Math.abs(position) - height) - backgroundSizes.height < backgroundSizes.height
  || Math.abs(position) - backgroundSizes.height < backgroundSizes.height);
}
