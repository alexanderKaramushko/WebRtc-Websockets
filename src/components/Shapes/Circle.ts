interface Args {
  anticlockwise?: boolean;
  color?: string;
  fill?: boolean;
  radius: number;
  stroke?: boolean;
  x: number;
  y: number;
}

class Circle {

  public readonly anticlockwise?: boolean;
  public readonly radius: number;
  public readonly x: number;
  public readonly y: number;
  public readonly stroke?: boolean;
  public readonly fill?: boolean;
  public readonly color?: string;

  constructor(args: Args) {
    const {
      anticlockwise,
      radius,
      stroke,
      x,
      y,
      color,
      fill,
    } = args;

    this.anticlockwise = anticlockwise;
    this.color = color;
    this.fill = fill;
    this.radius = radius;
    this.stroke = stroke;
    this.x = x;
    this.y = y;

  }

  build(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color || '#000';
    context.strokeStyle = this.color || '#000';

    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2,
      this.anticlockwise,
    );

    if (this.fill) {
      context.fill();
    }

    if (this.stroke) {
      context.stroke();
    }

    context.closePath();
  }

}

export default Circle;
