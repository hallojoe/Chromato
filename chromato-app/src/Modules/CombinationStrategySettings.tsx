import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';
import { CombinationStrategies } from '../Models/Enums/CombinationStrategies';
import { Endpoints } from '../Store/Enums/Endpoints';
import { ColorBehaviors } from '../Models/Enums/ColorBehaviors';

const CombinationStrategySettings: React.FC = () => {  
    
  const { state, dispatch } = useContext(AppContext);

  const handleCombinationStrategyChange = (combinationStrategy: CombinationStrategies) => {
    dispatch({
      type: Endpoints.SetCombinationStrategy, 
      payload: {
        combinationStrategy: combinationStrategy
      }
    })
  };

  const handleColorBehaviorChange = (colorBehavior: ColorBehaviors) => {
    dispatch({
      type: Endpoints.SetColorBehavior, 
      payload: {
        colorBehavior: colorBehavior
      }
    })
  };

  if(!state.colorPalette) throw Error("state.colorPalette cannot be empty!")

  return (    
    <div>     

      <h4>Combinations</h4>
      <form>
        <div className="radio">
          <label>
            <input type="radio" 
              value={CombinationStrategies.Brightness} 
              checked={state.colorPalette?.combinationStrategy === CombinationStrategies.Brightness } 
              onChange={() => handleCombinationStrategyChange(CombinationStrategies.Brightness)} />
            Deterministic 
            <small>Combine colors based on percieved brightness.</small>

            { state.colorPalette?.combinationStrategy === CombinationStrategies.Brightness && 
              <div>
                <div className="radio">
                  <label>
                    <input type="radio" 
                      value={ColorBehaviors.LightOnDark} 
                      checked={state.colorPalette?.colorBehavior === ColorBehaviors.LightOnDark } 
                      onChange={() => handleColorBehaviorChange(ColorBehaviors.LightOnDark)} />
                    Horizontal 
                    <small>Generate light foreground colors on dark background colors.</small>
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <input type="radio" 
                      value={ColorBehaviors.DarkOnLight} 
                      checked={state.colorPalette?.colorBehavior === ColorBehaviors.DarkOnLight } 
                      onChange={() => handleColorBehaviorChange(ColorBehaviors.DarkOnLight)} />
                    Vertical
                    <small>Generate dark foreground colors on light background colors.</small>
                  </label>
                </div>
              </div>
            }
          </label>          
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={CombinationStrategies.Full} 
              checked={state.colorPalette?.combinationStrategy === CombinationStrategies.Full } 
              onChange={() => handleCombinationStrategyChange(CombinationStrategies.Full)} />
            None
            <small>Combine all the things.</small>
          </label>
        </div>
      </form>

    </div>
  );
};

export default CombinationStrategySettings;
