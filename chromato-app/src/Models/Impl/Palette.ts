import { IdentityBase } from "../Bases/IdentityBase";
import { IColor } from "../IColor";
import { IPalette } from "../IPalette";
import { IColor2D } from "../IColor2D";
import { IGeneratedColorSet } from "../IGeneratedColorSet";
import { CombinationStrategies } from "../Enums/CombinationStrategies";
import { ReadabilityPolicies } from "../Enums/ReadabilityPolicies";
import { ReadabilityDisplayStrategies } from "../Enums/ReadabilityDisplayStrategies";
import { Color2D } from "./Color2D";
import { GeneratedColorSet } from "./GeneratedColorSet";
import { GenerationStrategies } from "../Enums/GenerationStrategies";
import { ColorBehaviors } from "../Enums/ColorBehaviors";
import { SuggestionStrategies } from "../Enums/SuggestionStrategies";
import { ISize } from "../ISize";


export class Palette extends IdentityBase<Array<IColor>> implements IPalette  {
  name: string;
  selected: IColor2D;
  suggestions: Array<IGeneratedColorSet>;
  combinations: IGeneratedColorSet;
  combinationStrategy: CombinationStrategies;
  readabilityPolicy: ReadabilityPolicies;
  readabilityDisplayStrategy: ReadabilityDisplayStrategies
  generationStrategy: GenerationStrategies;
  colorBehavior: ColorBehaviors;
  suggestionStrategy: SuggestionStrategies;
  suggestionsSize: ISize;
  elementSize: ISize;
  template: string;
  constructor(name: string) {
    super([]);
    this.name = name;    
    this.selected = new Color2D("black", "white");
    this.combinations = new GeneratedColorSet("combinations");
    this.suggestions = new Array<GeneratedColorSet>();
    this.combinationStrategy = CombinationStrategies.Brightness;
    this.readabilityPolicy = ReadabilityPolicies.None;
    this.readabilityDisplayStrategy = ReadabilityDisplayStrategies.Dim;
    this.generationStrategy = GenerationStrategies.Current;
    this.colorBehavior = ColorBehaviors.LightOnDark;
    this.suggestionStrategy = SuggestionStrategies.None;
    this.suggestionsSize = { width: 4, height: 4};
    this.elementSize = { width: 4, height: 4};
    this.template = "";
  }
}
