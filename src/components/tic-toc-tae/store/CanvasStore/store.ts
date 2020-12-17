import { action, makeObservable, observable } from 'mobx';
import { CanvasStoreModel } from './types';

class CanvasStore implements CanvasStoreModel {

  @observable canvasContext: CanvasRenderingContext2D | null = null;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  setCanvasContext(canvasContext: CanvasRenderingContext2D): void {
    this.canvasContext = canvasContext;
  }

}

export default CanvasStore;
