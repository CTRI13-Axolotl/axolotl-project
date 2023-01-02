import { useApp, AnimatedSprite } from '@inlet/react-pixi';
import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { generateAtlas, generateAnimation } from './Utilities';

import cat_black from '../assets/spritesheets/cat/cat_black.png';
import cat_blue from '../assets/spritesheets/cat/cat_blue.png';
import cat_brown from '../assets/spritesheets/cat/cat_brown.png';
import cat_calico from '../assets/spritesheets/cat/cat_calico.png';
import cat_creme from '../assets/spritesheets/cat/cat_creme.png';
import cat_gray from '../assets/spritesheets/cat/cat_gray.png';
import cat_seal_point from '../assets/spritesheets/cat/cat_seal_point.png';
import cat_tabby from '../assets/spritesheets/cat/cat_tabby.png';
import cat_white from '../assets/spritesheets/cat/cat_white.png';

const petAssets = {
  "cat_black": cat_black,
  "cat_blue": cat_blue,
  "cat_brown": cat_brown,
  "cat_calico": cat_calico,
  "cat_creme": cat_creme,
  "cat_gray": cat_gray,
  "cat_seal_point": cat_seal_point,
  "cat_tabby": cat_tabby,
  "cat_white": cat_white,
}

export default function Cat(props) {
  

  console.log('making cat frames')
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);




  const petType = "cat";
  const petColor = props.color;

  const pet = `${petType}_${petColor}`;


  const atlas = generateAtlas(128, 672, pet, 0.25);
  console.log(atlas)
  generateAnimation(atlas, "walk_left", 32, 32, 4, 1, 13, 4);
  generateAnimation(atlas, "walk_right", 32, 32, 4, 1, 9, 4);
  generateAnimation(atlas, "lay_down", 32, 32, 4, 3, 0, 9);
  // generateAnimation(atlas, "stand_up", 32, 32, 4, 3, 0, 9);

  console.log("atlas: ", atlas)

  const loadSpritesheet = () => {
    console.log('inside load spritesheet')
      const baseTexture = PIXI.BaseTexture.from(petAssets[pet]);
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
      animationSpeed={0.1}
      isPlaying={true}
      anchor={-1.5}
      // x={-30}
      // x={300}
      key={props.color}
    />
  )
}