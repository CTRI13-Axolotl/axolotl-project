import * as PIXI from 'pixi.js'
import { Sprite } from '@inlet/react-pixi';
import { Stage, AnimatedSprite, useApp, useTick } from '@inlet/react-pixi';
import react, { useState, useRef } from 'react';
import { Loader } from '@pixi/loaders';
import { generateAtlas, generateAnimation } from './Utilities.jsx';

import Cat from './Cat';

import catBackground from '../assets/backgrounds/cat_background.jpg';


const petComponents = {
  'cat': <Cat />,
}

const backgrounds = {
  'cat': catBackground,
}

const getWidth = () => {
  return 630;
}

const getHeight = () => {
  return 320;
}

const getPets = (petType) => {
  const pet = petComponents[petType];
  return pet;
}


export default function Pixi() {
  const petType = 'cat';

  const width = getWidth();
  const height = getHeight();
  const pets = getPets(petType);
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
        <Sprite image={backgrounds[petType]} x={0} y={0} width={width} height={height} />
        { pets }
    </Stage>
  )
}