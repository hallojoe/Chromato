import { paletteReducer } from "./PaletteReducer";
import { IAppModel } from "../../Models/IAppModel";
import { Palette } from "../../Models/Impl/Palette";
import { PaletteActions } from "../Actions/PaletteActions";

export const appReducer = ({ colorPalette, active }: IAppModel, action: PaletteActions): any => ({
  colorPalette: paletteReducer(colorPalette ?? new Palette("initial palette"), action)
  //, active: activeColorReducer(active, action)
});