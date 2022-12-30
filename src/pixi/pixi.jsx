import * as PIXI from 'pixi.js'
import { Stage, AnimatedSprite, useApp, useTick } from '@inlet/react-pixi'
import React, { useState, useRef } from 'react';
import { Loader } from '@pixi/loaders';

// import img from '../assets/black_000.png'

// const sheet = await PIXI.Assets.load(img);
// let animatedSprite = new PIXI.AnimatedSprite(sheet.animations['image_sequence']);


// const Pet = () => {
//   const [frames, setFrames] = React.useState([]);
//   const app = useApp();

//   React.useEffect(() => {
    
//   })
// }
import cat_black from '../assets/cat_black.png';
import cat_blue from '../assets/cat_blue.png';
import cat_brown from '../assets/cat_brown.png';
import cat_calico from '../assets/cat_calico.png';
import cat_creme from '../assets/cat_creme.png';
import cat_gray from '../assets/cat_gray.png';
import cat_seal_point from '../assets/cat_seal_point.png';
import cat_tabby from '../assets/cat_tabby.png';
import cat_white_gray from '../assets/cat_white_gray.png';

const petAssets = {
  "cat_black": cat_black,
  "cat_blue": cat_blue,
  "cat_brown": cat_brown,
  "cat_calico": cat_calico,
  "cat_creme": cat_creme,
  "cat_gray": cat_gray,
  "cat_seal_point": cat_seal_point,
  "cat_tabby": cat_tabby,
  "cat_white_gray": cat_white_gray,
}

const generateAtlas = (fileWidth, fileHeight, imageName, scale) => {

  const atlasData = {
    frames: {},
    meta: {
      image: imageName,
      format: 'RGBA8888',
      size: { w: fileWidth, h: fileHeight },
      scale: scale,
    },
    animations: {}
  }

  return atlasData;
}


const generateAnimation = (atlas, animationName, animationWidth, animationHeight, rowSize, colSize, startCol) => {
  const frames = [];
  let count = 1;

  for (let i = 0; i < rowSize; i++) {
    for (let j = startCol; j < startCol + colSize; j++) {
      const px = animationWidth * i;
      const py = animationHeight * j;

      const frameName = animationName + count;

      atlas.frames[frameName] = {
        frame: { x: px, y: py, w: animationWidth, h: animationHeight }
      }

      frames.push(frameName);

      count++;
    }
  }
  console.log("frames: ", frames);
  console.log(count);

  console.log(atlas.animations);
  atlas.animations[animationName] = frames;
}

// const atlasData = {
//   frames: {
//     walk1: {
//       frame: { x: 0, y: 0, w: 32, h: 32 },
//       sourceSize: { w: 32, h: 32 },
//       spriteSourceSize: { x: 0, y: 0, w: 32, h: 32},
//     },
//     walk2: {
//       frame: { x: 32, y: 0, w: 32, h: 32 },
//       sourceSize: { w: 32, h: 32 },
//       spriteSourceSize: { x: 0, y: 0, w: 32, h: 32},
//     }
//   },
//   meta: {
//     image: assetSheet,
//     format: 'RGBA8888',
//     size: { w: 128, h: 672 },
//     scale: 0.5,
//   },
//   animations: {
//     walk: ['walk1', 'walk2']
//   }
// }




const Cat = () => {
  

  console.log('making cat frames')
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);




  const petType = "cat";
  const petColor = "creme";

  const pet = `${petType}_${petColor}`;


  const atlas = generateAtlas(128, 672, pet, 0.25);
  console.log(atlas)
  generateAnimation(atlas, "walk_left", 32, 32, 4, 1, 13);
  generateAnimation(atlas, "walk_right", 32, 32, 4, 1, 9);

  console.log("atlas: ", atlas)
  

  
  // React.useEffect(() => {
  // console.log('after use effect')
    PIXI.utils.clearTextureCache();
  // console.log('after clear texture cache')
    app.loader.reset();
  // console.log('after loader reset')

    // console.log("start loader: ", app.loader);

    // app.loader.add(atlasData.animations.walk).load((_, resource) => {
    //   setFrames(
    //     Object.values(resource).map(frame =>
    //       PIXI.Texture.from(frame)
    //     )
    //   );
    // });


    // console.log("end loader: ", app.loader);
  // }, []);

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
    />
  )
}











// const Cat = () => {

//   const app = useApp();

//   const spritesheet = new PIXI.Spritesheet(
//     PIXI.BaseTexture.from(atlasData.meta.image),
//     atlasData
//   );
//   console.log('time to parse')

//   spritesheet.parse().then(() => {

//     console.log('parsing complete')

//     const anim = new PIXI.AnimatedSprite(spritesheet.animations.walk);

//     anim.animationSpeed = 0.1666;

//     anim.play();

//     return anim;
//   });
// }



export default function Pixi() {
  return (
    <Stage 
      width={630} 
      height={320} 
      options={{ 
        backgroundColor: 0x999999, 
        antialias: true,
        autoDensity: true,
      }}>
      <Cat />
    </Stage>
  )
}