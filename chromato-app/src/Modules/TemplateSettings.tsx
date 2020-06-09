import React, { useContext, useRef, FormEvent, useState } from 'react';
import { AppContext } from '../Store/AppContext';
import { Endpoints } from '../Store/Enums/Endpoints';
import { defaultHtmlTemplate, defaultSvgTemplate, puma, nike } from '../Store/Data/DefaultTemplates';
import SizeInput, { ISizeInput, ISizeInputConfiguration } from '../Components/SizeInput';
import { NumericInputTypes } from '../Components/NumericInput';
import { ISize } from '../Models/ISize';
import { copy } from '../Tools/Index';
import { stringInputToObject, TinyColor } from '@ctrl/tinycolor';
import FileInput from '../Components/FileInput';

const TemplateSettings: React.FC = () => {  

  const customTemplateTextarea = useRef<HTMLTextAreaElement>(null);

  const [numericInputConfiguration, setNumericInputConfiguration] = useState<ISizeInputConfiguration>({
    constrain: false,
    width: {
      min: 1,
      max: 50, 
      step: 1, 
      unit: "x", 
      type: NumericInputTypes.Number, 
      disabled: false 
    },
    height: {
      min: 1, 
      max: 50, 
      step: 1, 
      unit: "rem", 
      type: NumericInputTypes.Number, 
      disabled: false   
    }
  });

  const { state, dispatch } = useContext(AppContext);

  const handleTemplateChange = (template: string | null | undefined) => {

    if(!template) return;

    const modifiedTemplate = mapColorCodes(template);

    dispatch({
      type: Endpoints.SetTemplate, 
      payload: {
        template: modifiedTemplate
      }
    })
  };

  const handleElementSizeChange = (size: ISize) => {
    dispatch({
      type: Endpoints.SetElementSize, 
      payload: {
        size: size 
      }
    })
  };  

  const handleElementSizeContraintChange = (event: FormEvent<HTMLInputElement>) => {
    if(!numericInputConfiguration) return;
    const copyOfConfiguration = copy(numericInputConfiguration);    
    copyOfConfiguration.constrain = event.currentTarget.checked;
    setNumericInputConfiguration(copyOfConfiguration);
  };  

    
  const scanColorCodes = (html: string): string[] => {
    const pattern = /(?:#[a-fA-F0-9]{3,6}|rgba?\([^\)]+\))/gm;
    let list = html.match(pattern);
    if(!list) return [];    
    list = list.filter((x, i, a) => a.indexOf(x) === i);
    console.log(list)
    return list;    
  }

  const mapColorCodes = (html: string): string => {

    const colorCodes = scanColorCodes(html);

    if(colorCodes.length === 0) return html;
    if(colorCodes.length === 1) return html.replace(colorCodes[0], "var(--foregroundColor)");
    
    const [colorA, colorB] = colorCodes.map(v => {
      return { color: new TinyColor(v), input: v };
    }); 

    const colorAIsDarkerThanColorB = colorA.color.getBrightness() < colorB.color.getBrightness();

    const [lightestColor, darkestColor] = colorAIsDarkerThanColorB ?  [colorB, colorA] : [colorA, colorB]; 
    html = html.split(darkestColor.input).join("var(--backgroundColor)")
    html = html.split(lightestColor.input).join("var(--foregroundColor)");


    return html;



    
  };


  const removeColorCodes = (html: string): string => {
    scanColorCodes(html).forEach(v => html = html.replace(v, ""));
    return html;
  };
 
  
  const processFile = (text: string): void => {

    handleTemplateChange(text);

  };



  if(!state.colorPalette) throw Error("state.colorPalette cannot be empty!")

  return (    
    <div>     
      <h4>Template</h4>
      <p>Set template</p>

      <form>


      <div>
        <p>Elements size. This size will be reserved for each <q>Color element</q>. Overflow is hidden, som make sure template size comply with this. </p>
        <div style={{display: "flex"}}>
          <input type="checkbox" 
              checked={numericInputConfiguration.constrain} 
              onChange={ handleElementSizeContraintChange } />
          <SizeInput                     
            configuration={numericInputConfiguration}
            value={state.colorPalette.elementSize} 
            onDisplay={(value: number) => Math.round(value)}              
            onChange={handleElementSizeChange} />   
        </div>
      </div>


      <div>
        <FileInput multiple={true} typePattern={".svg"} onChange={ processFile}>Use local svg(Gamma state)</FileInput>          
      </div>


      </form>
    </div>
  );
};

export default TemplateSettings;
