import { PixiRendererNode } from './state';
import { Container } from 'pixi.js';

export function attachPixiChild(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: Container<any>,
  child: PixiRendererNode
) {
  parent.addChild(child);
}

export function removePixiChild(
  child: PixiRendererNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent?: Container<any> | null
) {
  parent?.removeChild(child);
}

export function attachPixiEventListener(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instance: Container<any>,
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (event: any) => void
): () => void {
  instance.on(eventName, callback);

  return () => instance.off(eventName, callback);
}
