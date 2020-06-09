import React, {useRef} from 'react';

export enum NumericInputTypes {
  Number,
  Range
}

export interface INumericInputValue  {
  type: NumericInputTypes,
  min?: number,
  max?: number,
  step?: number,
  unit?: string, 
  disabled?: boolean
}

export interface INumericInput  {
  configuration?: INumericInputValue,
  value?: number,
  onDisplay?: Function,
  onInput?: Function
  onChange?: Function
}

const NumericInput: React.FC<INumericInput> = ({configuration, value, onDisplay, onInput, onChange}) => {  
       
  const numericInputElement = useRef<HTMLInputElement>(null);

  const handleInput = (): boolean => {
    if(!numericInputElement?.current?.value) return false;
    const value = +numericInputElement?.current?.value;
    const isCustomValid = onInput ? onInput(value) : true;
    const isMinValid = configuration?.min ? value >= configuration.min : true;
    const isMaxValid = configuration?.max ? value <= configuration.max : true;
    return !isNaN(value) && isMinValid  && isMaxValid && isCustomValid;
  }

  const handleChange = () => {
    if(!numericInputElement.current?.value) return;
    const newValue = +numericInputElement.current.value;
    value = newValue;
    if(newValue && onChange) onChange(value);
  };

  return (    
    <div className="numericInput">
        <input 
          disabled={configuration?.disabled ? configuration.disabled : false }
          ref={numericInputElement}
          type={configuration?.type === NumericInputTypes.Number ? "number" : "range"} 
          min={configuration?.min} 
          max={configuration?.max} 
          step={configuration?.step} 
          value={ onDisplay ? onDisplay(value) : value } 
          onInput={handleInput}          
          onChange={handleChange} /> 

      { configuration?.unit && 
        <span>{configuration.unit}</span>
      }
    </div>
    
  );
};

export default NumericInput;

