import Shape from './Shape';

interface Args {
  anticlockwise?: boolean;
  radius: number;
  x: number;
  y: number;
}

interface BuildOptions {
  stroke?: boolean;
  fill?: boolean;
  color?: string;
}

class Circle extends Shape {

  public readonly anticlockwise?: boolean;
  public readonly radius: number;
  public readonly x: number;
  public readonly y: number;

  constructor(args: Args) {
    super();

    const {
      anticlockwise,
      radius,
      x,
      y,
    } = args;

    this.anticlockwise = anticlockwise;
    this.radius = radius;
    this.x = x;
    this.y = y;

  }

  build(context: CanvasRenderingContext2D, options: BuildOptions = {}): void {
    const { color, fill, stroke } = options;

    context.fillStyle = color || '#000';
    context.strokeStyle = color || '#000';

    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      this.anticlockwise,
    );

    if (fill) {
      context.fill();
    }

    if (stroke) {
      context.stroke();
    }

    context.closePath();
  }

}
export default Circle;
