/*
 * Generate JSON atlas data for a spritesheet from provided information
 */
export const generateAtlas = (fileWidth, fileHeight, imageName, scale) => {

  // The atlas is a JSON object that tells PixiJS how to interpret sprite sheets
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

/* 
 * Create array of frames to be used as an animation and add to a given atlas
 *
 * It is advised to change the parameter to accept an object instead of multiple parameters
 * Would make it more readable when calling function and make function more flexible
 * in including multiple optional parameters, such as repeating the animation x times
 * or reversing the frames
 */
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
      // console.log('frameName: ', frameName, ' px: ', px, " | py: ", py)

      // Create frame based on given x and y pixel coordinates on sprite sheet
      atlas.frames[frameName] = {
        frame: { x: px, y: py, w: animationWidth, h: animationHeight },
      }

      // Add frame to animation
      frames.push(frameName);

      count++;
    }
  }

  /* 
   * This reverses the frames of the animation in an attempt to play the animation in reverse
   * It reverses the frames in the array as expected, but it still plays the animation in normal order
   * 
   * In future, it may be desirable to fix this in order to have smoother animations
   */
  // if (reverse) frames.reverse();

  // console.log("frames: ", frames);

  // console.log(atlas.animations);

  // Save frame array in atlas as an animation
  atlas.animations[animationName] = frames;
}

/*
 * Gets a random x position between lower and upper bound
 * Currently only used for generating random placement for poops
 * 
 * In future, this could be useful to generate a random position
 * on screen for pets to move to
 */
export const getRandomX = (lowerBound, upperBound) => {
  const random = Math.floor(Math.random() * 500) - 200;
  return random;
}