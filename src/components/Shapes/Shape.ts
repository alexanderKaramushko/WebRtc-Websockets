interface ShapeInterface {
  build: (context: CanvasRenderingContext2D, options: {}) => void;
  x: number;
  y: number;
}

abstract class Shape implements ShapeInterface {

  abstract x: number;
  abstract y: number;

  abstract build(context: CanvasRenderingContext2D, options: {}): void;

}

export default Shape;
