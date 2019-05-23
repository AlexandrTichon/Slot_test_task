import {
  Container,
  resources,
  Sprite,
  SPRITE_SIZES,
} from "../config/data-config";

export function createWheel(spriteNum: number, spriteSrcFolder: string) {
  // wheel consist from 3 same elements (wheelElement), that consist sprites
  const { wheelInterval, symbolSizes } = SPRITE_SIZES;
  const wheel = new Container();
  let imageCounter = 1;

  for (let j = 0; j < spriteNum; j++) {
    const imageNumberName =
      imageCounter > 9 ? imageCounter : `0${imageCounter}`;
    const spriteSrc = `${spriteSrcFolder}${imageNumberName}.png`;
    const wheelSprite = new Sprite(resources[spriteSrc].texture);

    wheelSprite.position.set(
      wheelInterval * 3,
      symbolSizes.height * j + wheelInterval,
    );
    imageCounter++;
    wheel.addChild(wheelSprite);
  }
  return wheel;
}

export function wheelCanStop(position: number, speed: number) {
  const { wheelInterval, symbolSizes } = SPRITE_SIZES;

  for (let i = 0; i < Math.abs(speed); i++) {
    if ((Math.abs(position) - wheelInterval + i) % symbolSizes.height === 0) {
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
  return (Math.abs(position) - height === 0);
}

/*
    wheel.position.set(
      (178 + wheelInterval) * i - wheelInterval,
      -wheel.height + backgroundSizes.height,
    );

        if ( wheel.y + wheelSpeed[index] <= 0 &&
      Math.abs(wheel.y) <= symbolSizes.height
    ) {
      const additionalWheel = createWheel(13, "../assets/img/symbols/");
      // console.log(wheel.y);
      additionalWheel.position.set(0, -wheel.height);
      wheel.addChild(additionalWheel);
    }
 */
