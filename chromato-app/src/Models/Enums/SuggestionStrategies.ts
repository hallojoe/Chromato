export enum SuggestionStrategies {
  None = 0,
  Shades = 1 << 0,       // 0001    1
  Tints = 1 << 1,        // 0010    2
  Tones = 1 << 2,        // 0100    4
  Analogous = 1 << 3,    // 1000    8
  Monochrome = 1 << 4,   // 10000   16 
  All = ~(~0 << 5),      // 11111   31, 
  "Shades#Suggest shades from current color." = Shades,
  "Tints#Suggest tints from current color." = Tints,
  "Tones#Suggest tones from current color." = Tones,
  "Analogous#Suggest analogous from current color." = Analogous,   
  "Monochrome#Suggest monochromes from current color." = Monochrome,   
  "Everything#Suggest everything above from current color." = All,     
}

export const test = () => {

    const o = {
      o: SuggestionStrategies.Monochrome | SuggestionStrategies.Tints,
      p: SuggestionStrategies.Monochrome | SuggestionStrategies.Tones
    }

    console.log(o, o.o === SuggestionStrategies.Monochrome);

};
