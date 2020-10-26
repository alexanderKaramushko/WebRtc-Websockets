export enum Field {
  EMPTY = -1,
  CROSS = 0,
  CIRCLE = 1,
}

export interface FieldsStore {
  fields: Field[][];
}
