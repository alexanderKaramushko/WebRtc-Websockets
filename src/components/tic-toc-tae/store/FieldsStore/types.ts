export enum FieldTypes {
  EMPTY = -1,
  CROSS = 0,
  CIRCLE = 1,
}

export interface Field {
  height: number;
  type: FieldTypes;
  width: number;
  x: number;
  y: number;
}

export interface FieldsStore {
  fields: Field[][];
}
