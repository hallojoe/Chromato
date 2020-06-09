import { IColor } from "../Models/IColor";
import { IGeneratedColorSet } from "../Models/IGeneratedColorSet";

export interface IColorBuilder {
  combine(backgroundColors: Array<IColor>, forgroundColors: Array<IColor>): IGeneratedColorSet;  
}