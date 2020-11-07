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

class Cross extends Shape {

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
    const { stroke, fill, color } = options;

    context.fillStyle = color || '#000';
    context.strokeStyle = color || '#000';

    context.beginPath();

    context.moveTo(this.x - this.width, this.y - this.height);
    context.lineTo(this.x + this.width, this.y + this.height);

    context.moveTo(this.x + this.width, this.y - this.height);
    context.lineTo(this.x - this.width, this.y + this.height);

    if (fill) {
      context.fill();
    }

    if (stroke) {
      context.stroke();
    }

    context.closePath();
  }

}
export default Cross;
