import { directions, speeds } from '../constants/wind';


export function getSpeedText (speed) {
  const foundObj = speeds.reverse().find(obj => {
    return speed >= obj.speed;
  });

  return foundObj ? foundObj.text : '';
}


export function getDirection (degrees) {
  const found = directions.find(obj => {
    return degrees < obj.direction;
  });

  if (!found) {
    return directions[0];
  }

  return found;
}
