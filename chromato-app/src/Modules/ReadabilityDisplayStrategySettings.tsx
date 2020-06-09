import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';
import { ReadabilityDisplayStrategies } from '../Models/Enums/ReadabilityDisplayStrategies';
import { Endpoints } from '../Store/Enums/Endpoints';

const ReadabilityDisplayStrategySettings: React.FC = () => {  
    
  const { state, dispatch } = useContext(AppContext);

  const handleReadabilityDisplayStrategyChange = (readabilityDisplayStrategy: ReadabilityDisplayStrategies) => {
    dispatch({
      type: Endpoints.SetReadabilityDisplayStrategy, 
      payload: {
        readabilityDisplayStrategy: readabilityDisplayStrategy
      }
    })
  };

  if(!state.colorPalette) throw Error("state.colorPalette cannot be empty!")

  return (    
    <div>     
      <p>Readability display:</p>
      <form>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityDisplayStrategies.Dim} 
              checked={state.colorPalette?.readabilityDisplayStrategy === ReadabilityDisplayStrategies.Dim } 
              onChange={() => handleReadabilityDisplayStrategyChange(ReadabilityDisplayStrategies.Dim)} />
            Dim
            <small>Dim(set opacity) on colors not readable according to readability policy.</small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityDisplayStrategies.Hide} 
              checked={state.colorPalette?.readabilityDisplayStrategy === ReadabilityDisplayStrategies.Hide } 
              onChange={() => handleReadabilityDisplayStrategyChange(ReadabilityDisplayStrategies.Hide)} />
            Hide
            <small>Hide colors not readable according to readability policy.</small>
          </label>
        </div>

      </form>

    </div>
  );
};

export default ReadabilityDisplayStrategySettings;
