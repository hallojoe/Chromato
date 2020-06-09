import React, { useContext } from 'react';
import { AppContext } from '../Store/AppContext';
import { ReadabilityPolicies } from '../Models/Enums/ReadabilityPolicies';
import { Endpoints } from '../Store/Enums/Endpoints';

const ReadabilityPolicySettings: React.FC = () => {  
    
  const { state, dispatch } = useContext(AppContext);

  const handleReadabilityPolicyChange = (readabilityPolicy: ReadabilityPolicies) => {
    dispatch({
      type: Endpoints.SetReadabilityPolicy, 
      payload: {
        readabilityPolicy: readabilityPolicy
      }
    })
  };


  if(!state.colorPalette) throw Error("state.colorPalette cannot be empty!")

  return (    
    <div>     
      <form>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityPolicies.None} 
              checked={state.colorPalette?.readabilityPolicy === ReadabilityPolicies.None } 
              onChange={() => handleReadabilityPolicyChange(ReadabilityPolicies.None)} />
            None
            <small>Apply no readability policy.</small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityPolicies.SmallAA} 
              checked={state.colorPalette?.readabilityPolicy === ReadabilityPolicies.SmallAA } 
              onChange={() => handleReadabilityPolicyChange(ReadabilityPolicies.SmallAA)} />
            Small AA
            <small>// TODO: describe </small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityPolicies.SmallAAA} 
              checked={state.colorPalette?.readabilityPolicy === ReadabilityPolicies.SmallAAA } 
              onChange={() => handleReadabilityPolicyChange(ReadabilityPolicies.SmallAAA)} />
            Small AAA
            <small>// TODO: describe </small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityPolicies.LargeAA} 
              checked={state.colorPalette?.readabilityPolicy === ReadabilityPolicies.LargeAA } 
              onChange={() => handleReadabilityPolicyChange(ReadabilityPolicies.LargeAA)} />
            Large AA
            <small>// TODO: describe </small>
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" 
              value={ReadabilityPolicies.LargeAAA} 
              checked={state.colorPalette?.readabilityPolicy === ReadabilityPolicies.LargeAAA } 
              onChange={() => handleReadabilityPolicyChange(ReadabilityPolicies.LargeAAA)} />
            Large AAA
            <small>// TODO: describe </small>
          </label>
        </div>
        <p>Readability policies based on <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef" target="_blank" rel="noopener noreferrer" title="Web Content Accessibility Guidelines, Version 2.0">WCAG 2.0</a></p>
      </form>
    </div>
  );
};

export default ReadabilityPolicySettings;
