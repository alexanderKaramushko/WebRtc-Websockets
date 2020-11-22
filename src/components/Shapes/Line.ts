interface Args {
  color?: string;
  fill?: boolean;
  stroke?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

class Line {

  public readonly color?: string;
  public readonly fill?: boolean;
  public readonly stroke?: boolean;
  public readonly x1: number;
  public readonly y1: number;
  public readonly x2: number;
  public readonly y2: number;

  constructor(args: Args) {
    const {
      color,
      fill,
      stroke,
      x1,
      x2,
      y1,
      y2,
    } = args;

    this.color = color;
    this.fill = fill;
    this.stroke = stroke;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  build(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color || '#000';
    context.strokeStyle = this.color || '#000';

    context.beginPath();

    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);

    if (this.fill) {
      context.fill();
    }

    if (this.stroke) {
      context.stroke();
    }

    context.stroke();
    context.closePath();
  }

}

export default Line;
