import { Endpoints } from "../Enums/Endpoints";
import { IColor } from "../../Models/IColor";

export type ActiveColorPayload = {
  [Endpoints.SetBackgroundColor]: {color: IColor; };
  [Endpoints.SetForegroundColor]: {  color: IColor; };
  [Endpoints.SetColor]: { color: IColor; };
};

 