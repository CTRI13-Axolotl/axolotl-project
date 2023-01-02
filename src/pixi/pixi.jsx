import * as PIXI from 'pixi.js'
import { Sprite } from '@inlet/react-pixi';
import { Stage, AnimatedSprite, useApp, useTick } from '@inlet/react-pixi';
import react, { useState, useRef } from 'react';
import { Loader } from '@pixi/loaders';
import { generateAtlas, generateAnimation } from './Utilities.jsx';

import Cat from './Cat';
import Axolotl from './Axolotl';

import catBackground from '../assets/backgrounds/cat_background.jpg';
import axolotlBackground from '../assets/backgrounds/axolotl_background.jpg';

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
  }

  const pet = petComponents[petSpecies];
  return pet;
}


export default function Pixi(props) {

  if (!props.petType) return null;

  console.log('props in line 36: ', props)

  const petType = props.petType.split('_');
  const petSpecies = petType[0];
  const petColor = petType[1];

  const width = getWidth();
  const height = getHeight();
  const pets = getPets(petSpecies, petColor);
  // const background = getBackground(petType, width, height);

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
        { pets }
    </Stage>
  )
}