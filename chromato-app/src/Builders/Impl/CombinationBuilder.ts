import { IColorBuilder } from "../IColorBuilder";
import { IColor } from "../../Models/IColor";
import { IGeneratedColorSet } from "../../Models/IGeneratedColorSet";
import { GeneratedColorSet } from "../../Models/Impl/GeneratedColorSet";
import { IColor2D } from "../../Models/IColor2D";
import { Color2D } from "../../Models/Impl/Color2D";

export class CombinationBuilder implements IColorBuilder {
  combine(backgroundColors: Array<IColor>, foregroundColors: Array<IColor>): IGeneratedColorSet {
    const generatedColorSetName = "";
    const generatedColorSet = new GeneratedColorSet(generatedColorSetName);
    for(let index = 0; index < backgroundColors.length; index++) {
      const row = new Array<IColor2D>();
      for(let indexInner = 0; indexInner < foregroundColors.length; indexInner++) {
        const generatedColor2D = new Color2D(
          backgroundColors[index].value, 
          foregroundColors[indexInner].value);
        row.push(generatedColor2D);
      }
      generatedColorSet.value.push(row);
    }
    return generatedColorSet;
  }
}

