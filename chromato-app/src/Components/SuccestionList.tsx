import { IGeneratedColorSet } from "../Models/IGeneratedColorSet";
import React, { useContext } from "react";
import { IColor2D } from "../Models/IColor2D";
import { AppContext } from "../Store/AppContext";
import { ReadabilityDisplayStrategies } from "../Models/Enums/ReadabilityDisplayStrategies";
import { ReadabilityPolicies } from "../Models/Enums/ReadabilityPolicies";
import UnsafeHtmlElement from "./UnsafeHtml";
import { Endpoints } from "../Store/Enums/Endpoints";
import { ColorBehaviors } from "../Models/Enums/ColorBehaviors";


interface IGeneratedSetProps {
  value: IGeneratedColorSet;
  onClick?: VoidFunction;
}

interface IGeneratedSetListProps {
  value: Array<IGeneratedColorSet>;
  onClick?: VoidFunction;
}

export const GeneratedSetList: React.FC<IGeneratedSetListProps> = ({value, onClick}) => { 
  return (
    <div className={"generatedSetList"} style={{display: "flex"}}>
        { 
          value.map((generatedSet, index) => <GeneratedSet onClick={onClick} value={generatedSet} key={"gsl" + index} />) 
        } 
    </div>
  );
};

export const GeneratedSet: React.FC<IGeneratedSetProps> = ({value, onClick}) => { 

  const { state, dispatch } = useContext(AppContext);

  const elementWidth = state.colorPalette?.elementSize.width ?? 4;
  const width = value.value.length > 0 ? value.value[0].length * elementWidth : 8;

  return  (
    <div className={"generatedSet"}>
      <div className={"f"} style={{width: `${width}rem`}}>
      { value.value.map((color2DArray, index) => { return(
        <div key={`gsrow${index}`}>
          { color2DArray.map((color2D, indexInner) => 
            <GeneratedSetColor value={color2D} onClick={ onClick } key={`gs${index}${indexInner}`} />) }
        </div>
      )}) }
      </div>
    </div>
  );
};

interface IGeneratedSetColorProps {
  value: IColor2D;
  onClick?: VoidFunction;
}

export const GeneratedSetColor: React.FC<IGeneratedSetColorProps> = ({value, onClick}) => { 
  
  const { state, dispatch } = useContext(AppContext);

  let s: any = {
    "--foregroundColor": state.colorPalette?.colorBehavior === ColorBehaviors.LightOnDark ? value.two.value : value.one.value, 
    "--backgroundColor": state.colorPalette?.colorBehavior === ColorBehaviors.LightOnDark ? value.one.value : value.two.value,  
    "width": `${state.colorPalette?.elementSize?.width ? state.colorPalette.elementSize.width : 4 }rem`,   
    "height": `${state.colorPalette?.elementSize?.height ? state.colorPalette.elementSize.height : 4 }rem`,   
  };

  const setColor2D = (color2D: IColor2D) => {
    dispatch({
      type: Endpoints.SetColor2D, 
      payload: {
        color2D: color2D 
      }
    })
  }

  // todo: refactor

  if(state.colorPalette?.readabilityDisplayStrategy === ReadabilityDisplayStrategies.Dim)
    switch(state.colorPalette?.readabilityPolicy) {
      case ReadabilityPolicies.SmallAA:
        s.opacity = value.readability?.small?.aa ? "1" :  ".2";
        break;
      case ReadabilityPolicies.SmallAAA:
        s.opacity = value.readability?.small?.aaa ? "1" :  ".2";
        break;
      case ReadabilityPolicies.LargeAA:
        s.opacity = value.readability?.large?.aa ? "1" :  ".2";
        break;
      case ReadabilityPolicies.LargeAAA:
        s.opacity = value.readability?.small?.aa ? "1" :  ".2";
        break;
      default: break;
    }

  if(state.colorPalette?.readabilityDisplayStrategy === ReadabilityDisplayStrategies.Hide)
    switch(state.colorPalette?.readabilityPolicy) {
      case ReadabilityPolicies.SmallAA:
        if(!value.readability?.small?.aa) s.display = "none";
        break;
      case ReadabilityPolicies.SmallAAA:
        if(!value.readability?.small?.aaa) s.display = "none";
        break;
      case ReadabilityPolicies.LargeAA:
        if(!value.readability?.large?.aa) s.display = "none";
        break;
      case ReadabilityPolicies.LargeAAA:
        if(!value.readability?.large?.aaa) s.display = "none";
        break;
      default: break;
    }
  
  return(
    <div 
      title={ `${ value.two.value } on ${ value.one.value } ${value.description}` } 
      key={value.one.id} 
      style={ s } 
      onClick={() => setColor2D(value)}
      className={"color"}>
      <UnsafeHtmlElement value={ state.colorPalette?.template }></UnsafeHtmlElement>
    </div>
  )

};












