import { defaultColors } from "../Data/DefaultColors";

import { copy } from "../../Tools/Index";

import { IPalette } from "../../Models/IPalette";
import { IColor } from "../../Models/IColor";
import { IColor2D } from "../../Models/IColor2D";
import { IGeneratedColorSet } from "../../Models/IGeneratedColorSet";

import { IColor2DBuilder } from "../../Builders/IColor2DBuilder";

import { ShadesBuilder } from "../../Builders/Impl/ShadesBuilder";
import { TintsBuilder } from "../../Builders/Impl/TintsBuilder";
import { TonesBuilder } from "../../Builders/Impl/TonesBuilder";
import { AnalogousBuilder } from "../../Builders/Impl/AnalogousBuilder";
import { MonochromeBuilder } from "../../Builders/Impl/MonochromeBuilder";
import { CombinationBuilder } from "../../Builders/Impl/CombinationBuilder";

import { CombinationStrategies } from "../../Models/Enums/CombinationStrategies";
import { GenerationStrategies } from "../../Models/Enums/GenerationStrategies";
import { NamedOperations } from "../../Models/Enums/NamedOperations";
import { SuggestionStrategies } from "../../Models/Enums/SuggestionStrategies";

import { Palette } from "../../Models/Impl/Palette";
import { Color } from "../../Models/Impl/Color";

import { Endpoints } from "../Enums/Endpoints";
import { PaletteActions } from "../Actions/PaletteActions";

export const paletteReducer = (state: IPalette, action: PaletteActions): IPalette => {

  const copyOfState: IPalette = copy(state);

  const getColor = (value: IColor | undefined) : IColor | undefined => { 
    if(!value) return undefined;
    const index = copyOfState.value.findIndex(c => c.value === value.value);
    return copyOfState.value[index];    
  }  

  const generateColorSets = (color2D: IColor2D): Array<IGeneratedColorSet> => {

    const builders: IColor2DBuilder[] = [];    

    if(SuggestionStrategies.Shades === (state.suggestionStrategy & SuggestionStrategies.Shades)) builders.push(new ShadesBuilder());
    if(SuggestionStrategies.Tints === (state.suggestionStrategy & SuggestionStrategies.Tints)) builders.push(new TintsBuilder());
    if(SuggestionStrategies.Tones === (state.suggestionStrategy & SuggestionStrategies.Tones)) builders.push(new TonesBuilder());
    if(SuggestionStrategies.Analogous === (state.suggestionStrategy & SuggestionStrategies.Analogous)) builders.push(new AnalogousBuilder());
    if(SuggestionStrategies.Monochrome === (state.suggestionStrategy & SuggestionStrategies.Monochrome)) builders.push(new MonochromeBuilder());

    const result: IGeneratedColorSet[] = [];

    builders.forEach((v, i) => {
      result.push(v.combine(color2D, copyOfState.suggestionsSize, true));
      result.push(v.combine(color2D, copyOfState.suggestionsSize, false));  
    });

    return result;
  };  


  const combine = (): void => {

    // light <-> dark
    if(copyOfState.combinationStrategy === CombinationStrategies.Brightness) {
      const colors = copyOfState.value.filter(x => copyOfState.selected.one.isDark ? !x.isDark : x.isDark);
      if(copyOfState.generationStrategy === GenerationStrategies.All) {
        const backgroundColors = copyOfState.value.filter(x => copyOfState.selected.one.isDark ? x.isDark : !x.isDark);
        copyOfState.combinations = new CombinationBuilder().combine(backgroundColors, colors);
      }
      else copyOfState.combinations = new CombinationBuilder().combine([copyOfState.selected.one], colors);
    }

    // everything
    if(copyOfState.combinationStrategy === CombinationStrategies.Full) {
      if(copyOfState.generationStrategy === GenerationStrategies.All) {
        copyOfState.combinations = new CombinationBuilder().combine(copyOfState.value, copyOfState.value);
      }
      else copyOfState.combinations = new CombinationBuilder().combine([copyOfState.selected.one], copyOfState.value);        
    }
  };  


  switch (action.type) {
  
    case Endpoints.InitPalette:
      
      const defaultColorPalette = new Palette("name");
      
      defaultColors.forEach(v =>  v ? defaultColorPalette.value.push(new Color(v)) : undefined);      

      defaultColorPalette.combinationStrategy = 0;
      return defaultColorPalette;
                                        
    case Endpoints.AddPaletteColor:      
      
      const colorToAdd = getColor(action.payload.color);

      if(colorToAdd) return copyOfState;

      copyOfState.value.push(action.payload.color);

      combine();

      return copyOfState;

    case Endpoints.RemovePaletteColor:

      const colorToRemove = getColor(action.payload.color);
 
      if(!colorToRemove) return copyOfState;

      copyOfState.value.splice(copyOfState.value.indexOf(colorToRemove), 1)
      
      return copyOfState; 

    case Endpoints.SetPaletteColor:      
      

      copyOfState.selected.one = action.payload.color;

      copyOfState.suggestions = [];

      combine();

      return copyOfState;

    case Endpoints.SetColor2D:      

    copyOfState.selected =  action.payload.color2D;

      copyOfState.suggestions = generateColorSets(copyOfState.selected);

      return copyOfState;

    case Endpoints.SetCombinationStrategy:      

      copyOfState.combinationStrategy = action.payload.combinationStrategy;

      combine();

      return copyOfState;

    case Endpoints.SetReadabilityPolicy:      

      copyOfState.readabilityPolicy = action.payload.readabilityPolicy;

      return copyOfState;

    case Endpoints.SetReadabilityDisplayStrategy:      

      copyOfState.readabilityDisplayStrategy = action.payload.readabilityDisplayStrategy;
      
      return copyOfState;

    case Endpoints.SetGenerationStrategy:      

      copyOfState.generationStrategy = action.payload.generationStrategy;

      combine();

      return copyOfState;

    case Endpoints.SetColorBehavior:      

      copyOfState.colorBehavior = action.payload.colorBehavior;

      combine();

      return copyOfState;

    case Endpoints.SetSuggestionStrategy:      

      switch (action.payload.namedOperation) {
        case NamedOperations.Add :
          copyOfState.suggestionStrategy |= action.payload.suggestionStrategy;      
          break;
        case NamedOperations.Remove || NamedOperations.Delete :
          copyOfState.suggestionStrategy &= ~action.payload.suggestionStrategy;      
          break;
        default:
          copyOfState.suggestionStrategy = action.payload.suggestionStrategy;      
        }

      return copyOfState;

    case Endpoints.SetSuggestionSize:      

      copyOfState.suggestionsSize = action.payload.size;
    
      combine();

      return copyOfState;

    case Endpoints.SetElementSize:      

      copyOfState.elementSize = action.payload.size;
    
      combine();

      return copyOfState;

    case Endpoints.SetTemplate:      

      copyOfState.template = action.payload.template;
    
      combine();

      return copyOfState;

    default:

      return state;
  
  }
};

