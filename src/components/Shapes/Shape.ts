import { FieldTypes } from '../tic-toc-tae/store/FieldsStore/types';

interface ShapeInterface {
  build: (context: CanvasRenderingContext2D) => void;
}

class Shape<S> {

  shapes: (S & ShapeInterface)[];

  constructor(shapes: (S & ShapeInterface)[]) {
    this.shapes = shapes;
  }

  build(type: FieldTypes, context: CanvasRenderingContext2D): void {
    const shape = this.shapes.find((s) => s.constructor.name === type);

    if (shape) {
      shape.build(context);
    }
  }

}

export default Shape;
