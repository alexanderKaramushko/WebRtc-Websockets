export enum FieldTypes {
  CIRCLE = 'Circle',
  CROSS = 'Cross',
  EMPTY = 'Empty',
}

export interface Field {
  height: number;
  id: string;
  type: FieldTypes;
  width: number;
  x: number;
  y: number;
}

export interface FieldsStore {
  currentFieldId: string;
  fields: Field[][];
  player: FieldTypes;
}
