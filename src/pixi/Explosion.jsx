import { useApp, AnimatedSprite } from '@inlet/react-pixi';
import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { generateAtlas, generateAnimation } from './Utilities';

import explosion from '../assets/spritesheets/explosion.png';

const explosionAssets = {
  "explosion": explosion,
}

// Create Explosion component to render
export default function Explosion(props) {
  

  // console.log('making explosion frames');
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);


  // Generate atlas for explosion spritesheet format
  const atlas = generateAtlas(1600, 1160, "explosion", 1);

  console.log(atlas);

  /* 
   * Add animations to the explosion atlas object
   * 
   * See generateAnimation notes for making this more efficient and readable
   */
  generateAnimation(atlas, "explode", 320, 232, 5, 5, 0, 25);

  // console.log("atlas: ", atlas);

  // load spritesheet with provided information
  const loadSpritesheet = () => {
    const baseTexture = PIXI.BaseTexture.from(explosionAssets["explosion"]);
    const spritesheet = new PIXI.Spritesheet(baseTexture, atlas);
    // parse spritesheet to a frame loop
    spritesheet.parse(() => {
        setTextures( Object.keys(spritesheet.textures).map((t) => spritesheet.textures[t]));
    });
  }

  if (willMount.current) {
    loadSpritesheet();
    willMount.current = false;
  }

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