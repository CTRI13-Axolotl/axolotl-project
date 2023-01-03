import { useApp, AnimatedSprite } from '@inlet/react-pixi';
import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js'
import { generateAtlas, generateAnimation } from './Utilities'


import axolotl_bronze from '../assets/spritesheets/axolotl/axolotl_bronze.png';
import axolotl_coral from '../assets/spritesheets/axolotl/axolotl_coral.png';
import axolotl_green from '../assets/spritesheets/axolotl/axolotl_green.png';
import axolotl_pink from '../assets/spritesheets/axolotl/axolotl_pink.png';
import axolotl_turquoise from '../assets/spritesheets/axolotl/axolotl_turquoise.png';
import axolotl_violet from '../assets/spritesheets/axolotl/axolotl_violet.png';
import axolotl_yellow from '../assets/spritesheets/axolotl/axolotl_yellow.png';

const petAssets = {
  "axolotl_bronze": axolotl_bronze,
  "axolotl_coral": axolotl_coral,
  "axolotl_green": axolotl_green,
  "axolotl_pink": axolotl_pink,
  "axolotl_turquoise": axolotl_turquoise,
  "axolotl_violet": axolotl_violet,
  "axolotl_yellow": axolotl_yellow,
}


// Create Axolotl component to render
export default function Axolotl(props) {
  

  // console.log('making axolotl frames');
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);




  const petType = "axolotl";
  const petColor = props.color;

  const pet = `${petType}_${petColor}`;


  // Generate atlas for axolotl spritesheet format
  const atlas = generateAtlas(256, 224, pet, 0.25);

  // console.log(atlas);
  

  /* 
   * Add animations to the axolotl atlas object
   * 
   * See generateAnimation notes for making this more efficient and readable
   */
  generateAnimation(atlas, 'idle', 32, 32, 8, 1, 0, 8);
  generateAnimation(atlas, "walk_right", 32, 32, 8, 1, 3, 8);
  generateAnimation(atlas, "walk_left", 32, 32, 8, 1, 4, 8);
  generateAnimation(atlas, "lay_down", 32, 32, 3, 1, 5, 3);
  generateAnimation(atlas, "stand_up", 32, 32, 3, 1, 6, 3);

  // console.log("atlas: ", atlas)

  // load spritesheet with provided information
  const loadSpritesheet = () => {
    const baseTexture = PIXI.BaseTexture.from(petAssets[pet]);
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
      animationSpeed={0.1}
      isPlaying={true}
      anchor={-1.5}
      // x={-30}
      // x={300}
      key={props.color}
    />
  )
}