import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';
import { Endpoints } from '../Store/Enums/Endpoints';
import { GenerationStrategies } from '../Models/Enums/GenerationStrategies';

const GenerationStrategySettings: React.FC = () => {  
    
  const { state, dispatch } = useContext(AppContext);

  const handleGenerationStrategyChange = (generationStrategy: GenerationStrategies) => {
    dispatch({
      type: Endpoints.SetGenerationStrategy, 
      payload: {
        generationStrategy: generationStrategy
      }
    })
  };

  if(!state.colorPalette) throw Error("state.colorPalette cannot be empty!")

  return (    
    <div>     
      <h4>Amount</h4>
      <form>
        <div className="radio">
          <label>
            <input type="radio" 
              value={GenerationStrategies.Current} 
              checked={state.colorPalette?.generationStrategy === GenerationStrategies.Current } 
              onChange={() => handleGenerationStrategyChange(GenerationStrategies.Current)} />
            Current
            <small>Show only working color combinations. An approach your brain can follow.</small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={GenerationStrategies.All} 
              checked={state.colorPalette?.generationStrategy === GenerationStrategies.All } 
              onChange={() => handleGenerationStrategyChange(GenerationStrategies.All)} />
            All
            <small>Show all color combinations. Many colors will slow down your experience, but it lookool.</small>
          </label>
        </div>
      </form>

    </div>
  );
};

export default GenerationStrategySettings;
