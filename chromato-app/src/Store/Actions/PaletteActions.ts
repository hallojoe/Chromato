import { ActionMap } from "./ActionMap";
import { PalettePayload } from "../Payloads/PalettePayload";

export type PaletteActions = ActionMap<PalettePayload>[keyof ActionMap<PalettePayload>];
