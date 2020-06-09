import { IGeneratedColorSet } from "../IGeneratedColorSet";
import { IColor2D } from "../IColor2D";

export class GeneratedColorSet implements IGeneratedColorSet  {
  name: string;
  value: Array<Array<IColor2D>>;
  constructor(name: string, value?: Array<Array<IColor2D>>) {
    this.name = name;    
    if(value) this.value = value;
    else this.value = new Array<Array<IColor2D>>();
  }
}