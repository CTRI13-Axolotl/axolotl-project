// Generate JSON atlas data for a sprite from provided information
export const generateAtlas = (fileWidth, fileHeight, imageName, scale) => {

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

// Create array of frames to be used as an animation and add to a given atlas
export const generateAnimation = (atlas, animationName, animationWidth, animationHeight, rowSize, colSize, startCol, numFrames) => {
  // Array to hold each frame of an animation to be added to the atlas later
  const frames = [];
  // Count to keep track of total number of frames (used when a row of frames might not fill every column)
  let count = 1;

  // Iterate over each column of frames for each row
  for (let i = startCol; i < startCol + colSize; i++) {
    for (let j = 0; j < rowSize && count <= numFrames; j++) {
      // py and px relate to the x and y position in pixels of the frame on the sprite sheet
      const py = animationHeight * i;
      const px = animationWidth * j;
      

      const frameName = animationName + count;
      console.log('frameName: ', frameName, ' px: ', px, " | py: ", py)

      
      atlas.frames[frameName] = {
        frame: { x: px, y: py, w: animationWidth, h: animationHeight },
      }

      frames.push(frameName);

      count++;
    }
  }

  // if (reverse) frames.reverse();

  console.log("frames: ", frames);
  console.log(count);

  console.log(atlas.animations);
  atlas.animations[animationName] = frames;
}

export const getRandomX = (lowerBound, upperBound) => {
  const random = Math.floor(Math.random() * 500) - 200;
  return random;
}