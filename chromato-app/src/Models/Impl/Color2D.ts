import { IColor2D } from "../IColor2D";
import { IColor } from "../IColor";
import { ActiveColorTypes } from "../Enums/ActiveColorTypes";
import { IColor2DReadabilityMetrics } from "../IColor2DReadabilityMetrics";
import { Color } from "./Color";
import { isReadable } from "@ctrl/tinycolor";

export class Color2D implements IColor2D  {
  one: IColor;
  two: IColor;
  active: ActiveColorTypes;
  readability: IColor2DReadabilityMetrics;
  description?: string;
  constructor(valueOne: string | IColor, valueTwo: string | IColor) {
    this.one = new Color(valueOne);
    this.two = new Color(valueTwo);
    this.active = ActiveColorTypes.One;
    this.readability = {
      large: {
        aa: isReadable(this.one.value, this.two.value, { level: "AA", size: "large" }),
        aaa: isReadable(this.one.value, this.two.value, { level: "AAA", size: "large" })
      },
      small: {
        aa: isReadable(this.one.value, this.two.value, { level: "AA", size: "small" }),
        aaa: isReadable(this.one.value, this.two.value, { level: "AAA", size: "small" })
      }
    }
  }
}
