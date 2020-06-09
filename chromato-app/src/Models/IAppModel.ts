import { IWorkspaceSettings } from "./IWorkspaceSettings";
import { IPalette } from "./IPalette";

export interface IAppModel {
  name: string,
  version: string,
  author: string,
  url: string, 
  workspace: IWorkspaceSettings,
  colorPalette?: IPalette,
  active: any
}