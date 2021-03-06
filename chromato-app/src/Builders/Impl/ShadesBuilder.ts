import { IColor2DBuilder } from "../IColor2DBuilder";
import { IColor2D } from "../../Models/IColor2D";
import { IGeneratedColorSet } from "../../Models/IGeneratedColorSet";
import { GeneratedColorSet } from "../../Models/Impl/GeneratedColorSet";
import { Color2D } from "../../Models/Impl/Color2D";
import { getTinyColors, getFactor } from "../Helpers/Index";
import { ISize } from "../../Models/ISize";

export class ShadesBuilder implements IColor2DBuilder {
  public combine(color2D: IColor2D, size: ISize = { width: 4, height: 4 }, invert: boolean = false): IGeneratedColorSet {
    const tinyColors = getTinyColors(color2D);
    const generatedColorSet = new GeneratedColorSet("shades");
    for(let index = 0; index < size.width; index++) {
      const factor = getFactor(index, size.width, invert);
      const row = new Array<IColor2D>();
      for(let indexInner = 0; indexInner < size.height; indexInner++) {
        const factorInner = getFactor(indexInner, size.height, invert);
        const generatedColor2D = new Color2D(
          tinyColors.first.shade(factor).toRgbString(), 
          tinyColors.last.shade(factorInner).toRgbString());
          generatedColor2D.description = `shaded by ${factor} and ${factorInner}`;
          row.push(generatedColor2D);
      }
      generatedColorSet.value.push(row)
    }
    return generatedColorSet;
  }
}