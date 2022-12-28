import * as PIXI from 'pixi.js'
import { Stage, Container } from '@pixi/react-pixi'

export default function Pixi() {
  return (
    <Stage 
      width={630} 
      height={320} 
      options={{ 
      backgroundColor: 0x012b30, 
      antialias: true 
    }}>
    </Stage>
  )
}