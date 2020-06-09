import { IColor } from "../Models/IColor";
import React from "react";

interface IPickedColorElement {
  color: IColor,
  onClick: VoidFunction,
  onDoubleClick: VoidFunction  
}
 
const PickedColorElement: React.FC<IPickedColorElement> = ({ color, onClick, onDoubleClick}) => { 
  return (
    <div 
      title={ `color: ${ color.value } aka. ${ color.name }` }
      style={{ backgroundColor: color.value }}
      className={"color"} 
      onClick={ onClick }
      onDoubleClick={ onDoubleClick }>
        <div></div>
    </div>
  );
}

export default PickedColorElement;