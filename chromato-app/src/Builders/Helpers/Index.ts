import { IColor2D } from "../../Models/IColor2D";
import { IPair } from "../../Models/IPair";
import { TinyColor } from "@ctrl/tinycolor";

export const getTinyColors = (color2D: IColor2D): IPair<TinyColor> => {
  return { first: new TinyColor(color2D.one.value), last: new TinyColor(color2D.two.value) };
}

export const getFactor = (index: number, size: number = 4, invert = false): number => { 
  const factor = (index+1) * (100 / size);
  return invert ? -factor : factor;
}
