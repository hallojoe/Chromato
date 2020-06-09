import { IdentityBase } from "../Bases/IdentityBase";
import { TinyColor } from "@ctrl/tinycolor";
import { IColor } from "../IColor";

export class Color extends IdentityBase<string> implements IColor  {
  isDark: boolean;
  name: string;
  constructor(value: string | IColor) {
    const tinyColor = new TinyColor(typeof value === 'string' ? value : value.value);  
    super(tinyColor.toRgbString());
    this.isDark = tinyColor.isDark();
    const name = tinyColor.toName();
    this.name =  name ? name : "n/a";
  }
}
