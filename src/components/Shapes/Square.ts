import Shape from './Shape';

interface Args {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface BuildOptions {
  color?: string;
  fill?: boolean;
  stroke?: boolean;
}

class Square extends Shape {

  public readonly height: number;
  public readonly width: number;
  public readonly x: number;
  public readonly y: number;

  constructor(args: Args) {
    super();

    const {
      height,
      width,
      x,
      y,
    } = args;

    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

  }

  build(context: CanvasRenderingContext2D, options: BuildOptions = {}): void {
    const { color, fill, stroke } = options;

    context.fillStyle = color || '#000';
    context.strokeStyle = color || '#000';

    context.strokeRect(this.x, this.y, this.width, this.height);

    if (fill) {
      context.fill();
    }

    if (stroke) {
      context.stroke();
    }
  }

}
export default Square;
