import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';
import { Endpoints } from '../Store/Enums/Endpoints';
import { SuggestionStrategies } from '../Models/Enums/SuggestionStrategies';
import { NamedOperations } from '../Models/Enums/NamedOperations';
import SizeInput from '../Components/SizeInput';
import { NumericInputTypes } from '../Components/NumericInput';
import { ISize } from '../Models/ISize';

const SuggestionStrategySettings: React.FC = () => {  
    
  const { state, dispatch } = useContext(AppContext);

  const handleSuggestionStrategyChange = (suggestionStrategy: SuggestionStrategies, event: any) => {
    dispatch({
      type: Endpoints.SetSuggestionStrategy, 
      payload: {
        suggestionStrategy: suggestionStrategy, 
        namedOperation: event?.currentTarget?.checked ? NamedOperations.Add : NamedOperations.Remove
      }
    })
  };

  const handleSuggestionsSizeChange = (size: ISize) => {
    dispatch({
      type: Endpoints.SetSuggestionSize, 
      payload: {
        size: size 
      }
    })
  };


  if(!state.colorPalette) throw Error("state.colorPalette cannot is nothing.")

  const magicSplitSplitCharKnowToBeUsedAsNameDescriptionSeparatorInEnumAliases = "#";

  return (    
    <div>     
      <h4>Suggestions</h4>
      <form>
        {
            [
              SuggestionStrategies.Shades, 
              SuggestionStrategies.Tints, 
              SuggestionStrategies.Tones,  
              SuggestionStrategies.Analogous, 
              SuggestionStrategies.Monochrome, 
              SuggestionStrategies.All,                   
            ].map((v, i) => {
              const suggestionStrategy = state.colorPalette?.suggestionStrategy ?? SuggestionStrategies.None;
              const [ name, description ] = SuggestionStrategies[v].split(magicSplitSplitCharKnowToBeUsedAsNameDescriptionSeparatorInEnumAliases); 
              return (
                <div className="checkbox" key={`checkbox-${i}`}>
                <label>
                  <input type="checkbox" 
                    value={v} 
                    checked={ v === (suggestionStrategy & v) } 
                    onChange={(event) => handleSuggestionStrategyChange(v, event)} />
                    {name} <small>{description}</small>
                </label>
              </div>          
              );
            })
        }


        <p>Suggestions space.</p>
        <SizeInput                     
          configuration={{
            constrain: false,
            width: {
              min: 1,
              max: 16, 
              step: 1, 
              unit: "x", 
              type: NumericInputTypes.Number, 
              disabled: false 
            },
            height: {
              min: 1, 
              max: 16, 
              step: 1, 
              unit: "colors", 
              type: NumericInputTypes.Number, 
              disabled: false   
            }
          }}
          value={state.colorPalette.suggestionsSize} 
          onDisplay={(value: number) => Math.round(value)}              
          onChange={handleSuggestionsSizeChange} />   

      </form>

    </div>
  );
};

export default SuggestionStrategySettings;
