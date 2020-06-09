import { IHaveIdentity } from "./IHaveIdentity";
import { IColor } from "./IColor";
import { IColor2D } from "./IColor2D";
import { IGeneratedColorSet } from "./IGeneratedColorSet";
import { CombinationStrategies } from "./Enums/CombinationStrategies";
import { ReadabilityPolicies } from "./Enums/ReadabilityPolicies";
import { ReadabilityDisplayStrategies } from "./Enums/ReadabilityDisplayStrategies";
import { GenerationStrategies } from "./Enums/GenerationStrategies";
import { ColorBehaviors } from "./Enums/ColorBehaviors";
import { SuggestionStrategies } from "./Enums/SuggestionStrategies";
import { ISize } from "./ISize";

export interface IPalette extends IHaveIdentity<Array<IColor>> {
  name: string,
  value: Array<IColor>
  selected: IColor2D,   
  suggestions: Array<IGeneratedColorSet>, 
  combinations: IGeneratedColorSet, 
  combinationStrategy: CombinationStrategies,
  readabilityPolicy: ReadabilityPolicies,
  readabilityDisplayStrategy: ReadabilityDisplayStrategies,
  generationStrategy: GenerationStrategies, 
  colorBehavior: ColorBehaviors, 
  suggestionStrategy: SuggestionStrategies, 
  suggestionsSize: ISize, 
  elementSize: ISize, 
  template: string
}