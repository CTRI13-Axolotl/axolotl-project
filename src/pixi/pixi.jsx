import { Sprite } from '@inlet/react-pixi';
import { Stage } from '@inlet/react-pixi';
import { getRandomX } from './Utilities.jsx';


// Import React Pixi Sprite Components
import Cat from './Cat';
import Axolotl from './Axolotl';
import Explosion from './Explosion';

// Import image assets
import catBackground from '../assets/backgrounds/cat_background.jpg';
import axolotlBackground from '../assets/backgrounds/axolotl_background.jpg';
import explosionBackground from '../assets/backgrounds/explosion_background.jpg'

import poopSprite from '../assets/poop_sprite.png';


// Object for storing and retrieving backgrounds based on pet species
const backgrounds = {
  'cat': catBackground,
  'axolotl': axolotlBackground,
  'explosion': explosionBackground,
}

/*
 * Returns the width of the stage
 * 630 is placeholder
 * 
 * In future, the idea is to get a dynamic width based on screen size
 */
const getStageWidth = () => {
  return 630;
}


/*
 * Returns the height of the stage
 * 320 is placeholder
 * 
 * In future, the idea is to get a dynamic height based on screen size
 */
const getStageHeight = () => {
  return 320;
}


/*
 * Returns pet components depending on pet species
 * Currently only returns one pet
 * In future, maybe add functionality for rendering multiple pets
 * 
 * Possible Concern: two or more pets and one abandons,
 * explosions might not be wanted with a second pet still at home
 */
const getPets = (petSpecies, petColor) => {

  /*
   * Object for storing and retrieving pet components based on species
   * Pass pet color to component props for conditional rendering
   */
  const petComponents = {
    'cat': <Cat color={petColor} key={petColor} />,
    'axolotl': <Axolotl color={petColor} key={petColor} />,
    'explosion': <Explosion key={'explosion'} />,
  }

  const pet = petComponents[petSpecies];
  return pet;
}


// Create a poop sprite for each poop in database
const getPoops = (numPoops) => {
  // console.log("poops: ", numPoops);
  const poops = [];

  for (let i = 0; i < numPoops; i++) {
    poops.push(<Sprite image={poopSprite} anchor={-8} x={getRandomX(-100, 300)} />);
  }

  return poops;
}

/*
 * Main workhorse function
 * Creates stage for all Pixi components to be rendered in
 */
export default function Pixi(props) {
  // console.log("props: ", props);

  /*
   * Return null if a pet type isn't specified
   * Particularly useful for preventing renders
   * before Profile's axios call is resolved
   */
  if (!props.petType) return null;

  // console.log('props in line 36: ', props);

  const petType = props.petType.split('_');

  /*
   * xDate being null indicates that a pet has abandoned
   * If abandoned, do not render pet, and instead render
   * an explosion caused by the pet
   */
  const petSpecies = props.xDate.xDate ? 'explosion' :  petType[0];
  const petColor = petType[1];

  const width = getStageWidth();
  const height = getStageHeight();
  const pets = getPets(petSpecies, petColor);

  const poops = getPoops(props.numPoop);

  // Create state with previously acquired info and display pixi elements
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