import { Dispatch, createContext } from "react";
import { appData } from "./Data/AppModelData";
import { IAppModel } from "../Models/IAppModel";
import { PaletteActions } from "./Actions/PaletteActions";
import { ActiveColorActions } from "./Actions/ActiveColorActions";

export const AppContext = createContext<{ state: IAppModel; dispatch: Dispatch<PaletteActions | ActiveColorActions>; }>({
  state: appData,
  dispatch: () => null
});
