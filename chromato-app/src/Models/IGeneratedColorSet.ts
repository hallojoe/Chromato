import { IColor2D } from "./IColor2D";

export interface IGeneratedColorSet {
  name: string,
  value: Array<Array<IColor2D>>,
  mostReadable?: IColor2D
}
