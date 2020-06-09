import React from 'react';
import NumericInput, { INumericInputValue} from "./NumericInput";
import { ISize } from '../Models/ISize';

export interface ISizeInputConfiguration  { 
  constrain?: boolean,
  width?: INumericInputValue,
  height?: INumericInputValue,  
}

export interface ISizeInput  {
  value?: ISize,
  configuration?: ISizeInputConfiguration,
  onChange?: Function,
  onDisplay?: Function, 
}

const SizeInput: React.FC<ISizeInput> = ({configuration, value, onChange, onDisplay}) => {  

  const handleWidthChange = (newWidth: number): void => {
    
    if(!value) return; 
    
    if(!configuration?.constrain && onChange) {
      onChange({ width: newWidth, height: value.height });
      return;
    }
    
    const changedByFactor = 1 + ((newWidth - value.width) / value.width);
    const newHeight = value.height * changedByFactor;      
    
    if(configuration?.height?.min &&  newHeight < configuration?.height?.min) return;
    if(configuration?.height?.max &&  newHeight > configuration?.height?.max) return
    
    if(newWidth && newHeight && onChange) onChange({ width: newWidth, height: newHeight });
  };

  const handleHeightChange = (newHeight: number): void => {

    if(!value) return;

    if(!configuration?.constrain && onChange) {
      onChange({ width: value.width, height: newHeight });
      return;
    } 

    const changedByFactor = 1 + ((newHeight - value.height) / value.height);
    const newWidth = value.width * changedByFactor;      

    if(configuration?.width?.min &&  newWidth < configuration?.width?.min) return;
    if(configuration?.width?.max &&  newWidth > configuration?.width?.max) return

    if(newHeight && newHeight && onChange) onChange({ width: newWidth, height: newHeight })
  };

  const handAnyInput = (widthValue?: number, heightValue?: number): boolean => {

    if(!widthValue || !heightValue) return true;
 
    if(!configuration?.width?.min 
      || !configuration?.height?.min
      || !configuration?.width?.max 
      || !configuration?.height?.max 
    ) return true;

    return widthValue >= configuration.width.min && widthValue <= configuration.width.max &&
      heightValue >= configuration.height.min && heightValue <= configuration.height.max;
  };

  return (    
    <div className="sizeInput">     
      <NumericInput 
        configuration={configuration?.width}
        value={value?.width} 
        onDisplay={(n:number) => onDisplay ? onDisplay(n) : n}
        onInput={(n:number) => handAnyInput(n, value?.height)}
        onChange={handleWidthChange} />
      <NumericInput 
        configuration={configuration?.height}
        value={value?.height} 
        onDisplay={(n:number) => onDisplay ? onDisplay(n) : n}
        onInput={(n:number) => handAnyInput(value?.width, n)}
        onChange={handleHeightChange} />
    </div>
  );
};

export default SizeInput;
