import { speeds } from '../constants/wind';


export function getSpeedText (speed) {
  const foundObj = speeds.reverse().find(obj => {
    return speed >= obj.speed;
  });

  return foundObj ? foundObj.text : '';
}
