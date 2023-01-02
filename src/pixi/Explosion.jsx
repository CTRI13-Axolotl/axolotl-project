import { useApp, AnimatedSprite } from '@inlet/react-pixi';
import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { generateAtlas, generateAnimation } from './Utilities';

import explosion from '../assets/spritesheets/explosion.png';

const explosionAssets = {
  "explosion": explosion,
}

export default function Explosion(props) {
  

  console.log('making explosion frames')
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);


  const atlas = generateAtlas(1600, 1160, "explosion", 1);
  console.log(atlas)
  generateAnimation(atlas, "explode", 320, 232, 5, 5, 0, 25);
  // generateAnimation(atlas, "walk_right", 32, 32, 4, 1, 9, 4);
  // generateAnimation(atlas, "lay_down", 32, 32, 4, 3, 0, 9);
  // generateAnimation(atlas, "stand_up", 32, 32, 4, 3, 0, 9);

  console.log("atlas: ", atlas)

  const loadSpritesheet = () => {
    console.log('inside load spritesheet')
      const baseTexture = PIXI.BaseTexture.from(explosionAssets["explosion"]);
      const spritesheet = new PIXI.Spritesheet(baseTexture, atlas);
      spritesheet.parse(() => {
          setTextures( Object.keys(spritesheet.textures).map((t) => spritesheet.textures[t]));
      });
  }

  console.log('before willmount')
  if (willMount.current) {
    console.log('inside willmount')
    loadSpritesheet();
    console.log('after loadsheet')
    willMount.current = false;
  }

  // console.log('start textures: ', textures)
  // console.log('end textures: ', textures)

  return (
    <AnimatedSprite
      textures={textures}
      animationSpeed={0.2}
      isPlaying={true}
      anchor={-.4}
      // x={-30}
      // x={300}
      key={props.color}
    />
  )
}