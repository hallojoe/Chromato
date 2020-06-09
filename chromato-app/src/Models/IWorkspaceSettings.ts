import { IPreviewElementSettings } from "./IPreviewElementSettings";
import { ISize } from "./ISize";

export interface IWorkspaceSettings {
  width: number,
  rootSize: number,
  zoom: number,
  previewElement: IPreviewElementSettings,
  backgroundImageOpacity: number,  
  previewImageSize?: ISize,
}
