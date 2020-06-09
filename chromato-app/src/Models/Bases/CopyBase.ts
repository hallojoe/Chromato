import { copy } from "../../Tools/Index";
import { ICanCopy } from "../ICanCopy";

export abstract class CopyBase<TValue> implements ICanCopy<TValue> {
  public copy(value: TValue) { return copy(value); }
}
