import React, { CSSProperties, useContext } from "react";
import { IColor2D } from "../Models/IColor2D";
import { ActiveColorTypes } from "../Models/Enums/ActiveColorTypes";

interface IActiveColorElement {
  color: IColor2D, 
  onColorChange: void
}

const ActiveColors: React.FC<IColor2D> = (props) => {  
  
  const styleOne: CSSProperties = { 
    position: "absolute",
    fontSize:0, 
    backgroundColor: props.one.value, 
    width: "8rem", 
    height: "8rem",
    top: "0", 
    left: "0" , 
    borderRadius: "50%"
  };

  const styleTwo: CSSProperties = { 
    position: "absolute",
    fontSize:0, 
    backgroundColor: props.two.value, 
    width: "8rem", 
    height: "8rem", 
    bottom: "0", 
    right: "0",
    borderRadius: "50%"
  }

  return (
    <div 
      style={{       
        position: "relative", 
        width: "10rem", 
        height: "10rem"
      }}> 
      <div 
        title={ props.one.value } 
        style={ {...styleOne, zIndex: props.active === ActiveColorTypes.One ? 2 : 1 }}>            
      </div>
      <div 
        title={ props.two.value } 
        style={ {...styleTwo, zIndex: props.active === ActiveColorTypes.Two ? 2 : 1 }}>            
      </div>
    </div>
  );
};

export default ActiveColors;
