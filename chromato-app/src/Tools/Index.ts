export const copy = <T>(o: T): T => JSON.parse(JSON.stringify(o)) as T;
export const partition = <T>(array: Array<T>, size: number) => array.map( (value, index) => (index % size === 0) ? array.slice(index, index + size) : null).filter( (tArray) => tArray);
export const cartesianProduct = <T>(array: T[][]) =>  array.reduce((a: T[][], b: T[]) => a.flatMap(x => b.map(y => [...x, y])), [[]] as T[][]);
/**  @see https://stackoverflow.com/questions/105034/how-to-create-guid-uuid */
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}