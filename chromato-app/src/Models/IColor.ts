import { IHaveIdentity } from "./IHaveIdentity";

export interface IColor extends IHaveIdentity<string> {
  name: string,
  value: string,
  isDark?: boolean
}