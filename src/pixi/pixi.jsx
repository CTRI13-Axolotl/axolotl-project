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
import assetSheet from '../assets/cat_black.png';

// const generateFrames = (fileWidth, fileHeight, imageName) => {

//   const atlasData = {
//     frames: {},
//     meta: {
//       image: imageName,
//       format: 'RGBA8888',
//       size: { w: fileWidth, h: fileHeight },
//       scale: 1,
//     }
//   }
// }


// const populateAtlas = (atlas, animationName, animationWidth, animationHeight, startHeight, numFrames) => {
  
// }

const atlasData = {
  frames: {
    walk1: {
      frame: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32},
    },
    walk2: {
      frame: { x: 32, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32},
    }
  },
  meta: {
    image: assetSheet,
    format: 'RGBA8888',
    size: { w: 128, h: 672 },
    scale: 0.5,
  },
  animations: {
    walk: ['walk1', 'walk2']
  }
}




const Cat = () => {

  console.log('making cat frames')
  const app = useApp();
  const willMount = useRef(true);

  const [textures, setTextures] = useState([]);

  
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
      const baseTexture = PIXI.BaseTexture.from(assetSheet);
      const spritesheet = new PIXI.Spritesheet(baseTexture, atlasData);
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
      animationSpeed={0.5}
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