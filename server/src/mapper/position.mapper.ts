import {Position} from "../models/Position";

export function getPositionFromRaw(position: any) {
  return new Position(position.x, position.y);
}
