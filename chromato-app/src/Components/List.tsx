import { IColor } from "../Models/IColor";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Store/AppContext";
import { Color } from "../Models/Impl/Color";
import { GeneratedSet, GeneratedSetList } from "./SuccestionList";
import WorkspaceSettings from "../Modules/WorkspaceSettings";
import { Endpoints } from "../Store/Enums/Endpoints";
import { GenerationStrategies } from "../Models/Enums/GenerationStrategies";
import { defaultSvgTemplate, defaultHtmlTemplate } from "../Store/Data/DefaultTemplates";
import NumericInput, { NumericInputTypes } from "./NumericInput";
import { ISize } from "../Models/ISize";
import SizeInput from "./SizeInput";
import PickedColorElement from "./PickedColorElement";



enum ColorElementListDisplays {
  None, 
  DarkLight
}

interface IColorElementList {
  color: IColor,
  display: ColorElementListDisplays,
  onClick: VoidFunction,
  onDoubleClick: VoidFunction  
}

const PaletteList = () => {

  const { state, dispatch } = useContext(AppContext);

  // const handleEscKeyClick = (event: any) => {
  //   if(event.keyCode === 27) {
  //     console.log("esc clicked")
  //   }
  // };

  // const ctrlSpaceComboKeyMap: any = { 17: false, 32: false };

  // const handleCtrlSpaceComboKeyDown = (event: any) => {
  //   if (event.keyCode in ctrlSpaceComboKeyMap) {
  //     ctrlSpaceComboKeyMap[event.keyCode] = true;
  //     if (ctrlSpaceComboKeyMap[17] && ctrlSpaceComboKeyMap[32]) {
  //       console.log("both triggered");
  //     }
  //   }
  // };

  // const handleCtrlSpaceComboKeyUp = (event: any) => {
  //   if (event.keyCode in ctrlSpaceComboKeyMap) 
  //     ctrlSpaceComboKeyMap[event.keyCode] = false;
  // };

  useEffect(() =>  {

    init();
    
    // document.addEventListener("keydown", handleCtrlSpaceComboKeyDown, false);
    // document.addEventListener("keyup", handleCtrlSpaceComboKeyUp, false);

  }, []);

  const init = () => {
    dispatch({
      type: Endpoints.InitPalette,
      payload: { }
    });
  };
  
  const addPaletteColor = (color: string) => {    
    dispatch({
      type: Endpoints.AddPaletteColor,
      payload: {
        color: new Color(color)
      }
    })
  }

  const removePaletteColor = (color: IColor) => {
    dispatch({
      type: Endpoints.RemovePaletteColor,
      payload: {
        color: color
      }
    });
  }

  const setColor = (color: IColor) => {
    dispatch({
      type: Endpoints.SetPaletteColor, 
      payload: {
        color: color 
      }
    })
  }
  
  return (
    <div>          
        <div>
          <span> [Chromato Logo goes here] </span>          
          [Color picking icon goes here <input type="color" title="Add Color" onBlur={(event: any) => addPaletteColor(event.target.value ) } />]
        </div>

      <div className={""}>
        

        <div className={""}>

          { state.colorPalette?.generationStrategy !== GenerationStrategies.All && 
          
            <div>
              <div className={ "f" } style={ { width: "100%"}}>
                {state?.colorPalette && state.colorPalette && state.colorPalette.value.map((color: IColor, ii: number) => color && color.isDark && (
                  <PickedColorElement 
                    key={`dark${ii}`}
                    color={ color } 
                    onClick={ () => setColor(color)}
                    onDoubleClick={() => removePaletteColor(color)}>
                  </PickedColorElement>
                ))}   

                {state?.colorPalette && state.colorPalette.value.map((color: IColor, ii: number) => !color.isDark && (
                  <PickedColorElement
                    key={`light${ii}`}
                    color={ color } 
                    onClick={ () => setColor( color)}
                    onDoubleClick={() => removePaletteColor( color)}>
                  </PickedColorElement>
                ))}   
              </div>                  
            </div>
      
          }

          <div style={{ display: "flexx"}}>

            <div>
            { state?.colorPalette && 
              <GeneratedSet value={state?.colorPalette.combinations} onClick={ () => console.log("clcik") } />              
            }
              <div>
              { state?.colorPalette && 
                <GeneratedSetList value={state?.colorPalette.suggestions} onClick={ () => console.log("clcik") } />              
              }
              </div>
            </div>

          </div>

        </div>
          
      </div>

      <WorkspaceSettings />

    </div>

  );
};

export default PaletteList;
