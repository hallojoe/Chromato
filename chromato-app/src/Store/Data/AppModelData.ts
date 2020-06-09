import { IAppModel } from "../../Models/IAppModel";
import { ColorBehaviors } from "../../Models/Enums/ColorBehaviors";

export const appData: IAppModel = {
  name: 'Using React Context in a Typescript App',
  author: 'thehappybug',
  url: 'http://www.example.com', 
  version: '1.0.0',
  workspace: {
    width: 1600,
    zoom: 1, 
    backgroundImageOpacity: 1, 
    rootSize: 16, 
    previewElement: {
      borderRadius: 0, 
      fontSize: 16, 
      margin: 10, 
      size: {          
        width: 100, 
        height: 100
      },
      sizeConstrain: true, 
      text: 'text'       
    }  
  },
  colorPalette: {
    elementSize: { width: 4, height: 4},
    suggestionsSize: { width: 4, height: 4},
    template: "<div><div style='background-color:var(--backgroundColor)'></div><div style='background-color:var(--foregroundColor)'></div></div>",
    suggestionStrategy: 0,
    colorBehavior: 0,
    generationStrategy: 0,
    readabilityPolicy: 0,
    combinationStrategy: 1,
    readabilityDisplayStrategy: 0,
    name: "default", 
    combinations: {
      name: "combinations",
      value: [[]],       
    },
    suggestions: [],
    selected: {
      one: {
        id: "a", 
        name: "", 
        value: "#000000"
      }, 
      two: {
        id: "b", 
        name: "", 
        value: "#ffffff"
      }
    }, 
    value: [], 
    id: "x"
  },   
  active: {}
};

