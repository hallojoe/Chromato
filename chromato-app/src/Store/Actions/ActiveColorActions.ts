import { ActionMap } from "./ActionMap";
import { ActiveColorPayload } from "../Payloads/ActiveColorPayload";

export type ActiveColorActions = ActionMap<ActiveColorPayload>[keyof ActionMap<ActiveColorPayload>];
