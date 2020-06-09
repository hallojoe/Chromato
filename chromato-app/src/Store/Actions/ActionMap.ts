export type ActionMap<TPayload extends { [index: string]: any }> = {
  [Key in keyof TPayload]: TPayload[Key] extends undefined 
    ? { type: Key; }
    : { type: Key; payload: TPayload[Key]; }
};
 