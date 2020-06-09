import { IColor2DBuilder } from "../IColor2DBuilder";
import { IColor2D } from "../../Models/IColor2D";
import { IGeneratedColorSet } from "../../Models/IGeneratedColorSet";
import { TinyColor } from "@ctrl/tinycolor";
import { GeneratedColorSet } from "../../Models/Impl/GeneratedColorSet";
import { Color2D } from "../../Models/Impl/Color2D";
import { ISize } from "../../Models/ISize";

export class MonochromeBuilder implements IColor2DBuilder {
  public combine(color2D: IColor2D, size: ISize = { width: 4, height: 4 }): IGeneratedColorSet {
    const backgroundColor = new TinyColor(color2D.one.value);
    const foregroundColor = new TinyColor(color2D.two.value);    
    const generatedColorSet = new GeneratedColorSet("monochrome");
    const backgrounds = backgroundColor.monochromatic(size.width + 1).map(v => v.toRgbString()).splice(1);
    const foregrounds = foregroundColor.monochromatic(size.height + 1).map(v => v.toRgbString()).splice(1);    
    for(let i = 0; i < size.width; i++) {
      const row = new Array<IColor2D>();
      for(let ii = 0; ii < size.height; ii++) {
        const generatedColor2D = new Color2D(
          backgrounds[i], 
          foregrounds[ii]); 
        generatedColor2D.description = `monochromed`;
        row.push(generatedColor2D);
      }
      generatedColorSet.value.push(row);
    }
    return generatedColorSet;
  }
}
