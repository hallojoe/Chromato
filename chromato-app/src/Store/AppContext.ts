import { Dispatch, createContext } from "react";
import { appData } from "./Data/AppModelData";
import { IAppModel } from "../Models/IAppModel"; 
import { PaletteActions } from "./Actions/PaletteActions";

export const AppContext = createContext<{ state: IAppModel; dispatch: Dispatch<PaletteActions>; }>({
  state: appData,
  dispatch: () => null
});
