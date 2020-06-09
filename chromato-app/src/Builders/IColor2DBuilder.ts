import { IColor2D } from "../Models/IColor2D";
import { IGeneratedColorSet } from "../Models/IGeneratedColorSet";
import { ISize } from "../Models/ISize";

export interface IColor2DBuilder {
  combine(color2D: IColor2D, size: ISize, invert: boolean): IGeneratedColorSet;  
}
