import { Position } from '@/models/Position'

export function getPositionFromRaw(position: any) {
  return new Position(position.x, position.y);
}

export function getPositionArrayFromRaw(positions: any) {
  const positionArray: Position[] = [];
  for (const position of positions) {
    positionArray.push(getPositionFromRaw(position));
  }
  return positionArray;
}
