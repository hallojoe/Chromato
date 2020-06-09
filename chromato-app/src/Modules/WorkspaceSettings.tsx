import React, { useContext } from 'react';
import CombinationStrategySettings from './CombinationStrategySettings';
import GenerationStrategySettings from './GenerationStrategySettings';
import ReadabilityPolicySettings from './ReadabilityPolicySettings';
import ReadabilityDisplayStrategySettings from './ReadabilityDisplayStrategySettings';
import SuggestionStrategySettings from './SuggestionStrategySettings';
import TemplateSettings from './TemplateSettings';

const WorkspaceSettings: React.FC = () => {  
    
  const style: any = {
    position: "absolute",
    right: "0",
    top: "0", 
    width: "40rem",
    backgroundColor: "white",
    padding: "2rem"
  };

  return (    
    <div style={style}>           
      <GenerationStrategySettings />
      <CombinationStrategySettings />
      <div>
        <h4>Readability policy</h4>
        <ReadabilityPolicySettings />
        <ReadabilityDisplayStrategySettings /> 
      </div>
      <SuggestionStrategySettings />
      <TemplateSettings />      

    </div>
  );
};

export default WorkspaceSettings;
