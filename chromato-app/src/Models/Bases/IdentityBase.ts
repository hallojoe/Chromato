import { uuidv4 } from "../../Tools/Index";
import { IHaveIdentity } from "../IHaveIdentity";

export abstract class IdentityBase<TValue> implements IHaveIdentity<TValue> {
  id: string;
  value: TValue;
  constructor(value: TValue, id?: string) { 
    if(id) this.id = id; else this.id = uuidv4(); 
    this.value = value;
  }
}

