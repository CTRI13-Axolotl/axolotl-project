import * as PIXI from 'pixi.js'
import { Sprite } from '@inlet/react-pixi';
import { Stage, AnimatedSprite, useApp, useTick } from '@inlet/react-pixi';
import react, { useState, useRef } from 'react';
import { Loader } from '@pixi/loaders';
import { getRandomX } from './Utilities.jsx';

import Cat from './Cat';
import Axolotl from './Axolotl';
import Explosion from './Explosion';

import catBackground from '../assets/backgrounds/cat_background.jpg';
import axolotlBackground from '../assets/backgrounds/axolotl_background.jpg';

import poopSprite from '../assets/poop_sprite.png';

const backgrounds = {
  'cat': catBackground,
  'axolotl': axolotlBackground,
}

const getWidth = () => {
  return 630;
}

const getHeight = () => {
  return 320;
}

const getPets = (petSpecies, petColor) => {

  const petComponents = {
    'cat': <Cat color={petColor} key={petColor} />,
    'axolotl': <Axolotl color={petColor} key={petColor} />,
    'explosion': <Explosion key={'explosion'} />,
  }

  const pet = petComponents[petSpecies];
  return pet;
}

const getPoops = (numPoops) => {
  console.log("poops", numPoops);
  const poops = [];

  for (let i = 0; i < numPoops; i++) {
    poops.push(<Sprite image={poopSprite} anchor={-8} x={getRandomX(-100, 300)} />);
  }

  return poops;
}


export default function Pixi(props) {
  console.log("props: ", props);

  if (!props.petType) return null;

  console.log('props in line 36: ', props)

  const petType = props.petType.split('_');
  const petSpecies = props.xDate.xDate ? 'explosion' :  petType[0];
  const petColor = petType[1];

  const width = getWidth();
  const height = getHeight();
  const pets = getPets(petSpecies, petColor);
  // const background = getBackground(petType, width, height);

  const poops = getPoops(props.numPoop);

  return (
    <Stage 
      width={630} 
      height={320} 
      options={{ 
        backgroundColor: 0x999999, 
        antialias: true,
        autoDensity: true,
      }}>
        <Sprite image={backgrounds[petSpecies]} x={0} y={0} width={width} height={height} />
        { poops }
        { pets }
    </Stage>
  )
}