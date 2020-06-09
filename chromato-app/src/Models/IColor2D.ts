import { IColor } from "./IColor";
import { ActiveColorTypes } from "./Enums/ActiveColorTypes";
import { IColor2DReadabilityMetrics } from "./IColor2DReadabilityMetrics";

export interface IColor2D  {
  one: IColor,
  two: IColor,
  active?: ActiveColorTypes, 
  readability?: IColor2DReadabilityMetrics,
  description?: string
}