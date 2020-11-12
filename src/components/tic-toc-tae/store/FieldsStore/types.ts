export enum FieldTypes {
  CIRCLE = 'Круг',
  CROSS = 'Крестик',
  EMPTY = 'Пустое поле',
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

export interface LinearVictory {
  fields: Field[];
  isVictory: boolean;
}
