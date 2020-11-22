interface Args {
  color?: string;
  fill?: boolean;
  height: number;
  stroke?: boolean;
  width: number;
  x: number;
  y: number;
}

class Square {

  public readonly color?: string;
  public readonly fill?: boolean;
  public readonly height: number;
  public readonly stroke?: boolean;
  public readonly width: number;
  public readonly x: number;
  public readonly y: number;

  constructor(args: Args) {
    const {
      color,
      height,
      width,
      x,
      y,
      fill,
      stroke,
    } = args;

    this.color = color;
    this.fill = fill;
    this.height = height;
    this.stroke = stroke;
    this.width = width;
    this.x = x;
    this.y = y;
  }

  build(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color || '#000';
    context.strokeStyle = this.color || '#000';

    context.strokeRect(this.x, this.y, this.width, this.height);

    if (this.fill) {
      context.fill();
    }

    if (this.stroke) {
      context.stroke();
    }
  }

}

export default Square;
