import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  Renderer2,
  RendererFactory2,
  RendererType2,
  runInInjectionContext,
} from '@angular/core';
import { CATALOGUE } from './catalogue';
import { addChild, createNode, PixiRendererNode, setParent } from './state';
import { attachPixiChild, attachPixiEventListener, removePixiChild } from './utils';
import { SPECIAL_INTERNAL_ADD_ARGS, SPECIAL_PROPERTIES } from './constants';
import { PIXI } from './application';
import { Container } from 'pixi.js';

const IS_ROOT = new InjectionToken('IS_ROOT');

// Todo: Properly type the methods

@Injectable()
export class PixiRendererFactory implements RendererFactory2 {
  private readonly delegateRendererFactory = inject(RendererFactory2, { skipSelf: true });
  private readonly injector = inject(Injector);
  private readonly renderersByType = new Map<string, Renderer2>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createRenderer(hostElement: any, type: RendererType2 | null): Renderer2 {
    const delegateRenderer = this.delegateRendererFactory.createRenderer(hostElement, type);

    if (!type) return delegateRenderer;

    if (this.renderersByType.has(type.id)) return this.renderersByType.get(type.id)!;

    const rendererInjector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: Renderer2,
          useValue: delegateRenderer,
        },
        {
          provide: IS_ROOT,
          useValue: !hostElement && this.renderersByType.size === 0,
        },
        PixiRenderer,
      ],
    });

    return runInInjectionContext(rendererInjector, () => {
      const renderer = inject(PixiRenderer);
      this.renderersByType.set(type.id, renderer);
      return renderer;
    });
  }
}

export class PixiRenderer implements Renderer2 {
  private args: (() => unknown[])[] = [];

  private delegate = inject(Renderer2);
  private pixi = inject(PIXI);
  private catalogue = inject(CATALOGUE);
  private isRoot = inject(IS_ROOT);

  createElement(name: string) {
    if (this.isRoot) {
      this.isRoot = false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return createNode('pixi', name, this.pixi.stage);
    }

    const pixiConstructor = this.catalogue[name] ?? Container;

    const injectedArgs = this.args.shift();

    const pixiInstance = new pixiConstructor(...(injectedArgs?.() ?? []));

    return createNode('pixi', name, pixiInstance);
  }

  createComment(value: string) {
    const comment = this.delegate.createComment(value);
    const commentNode = createNode('comment', value, comment);

    comment[SPECIAL_INTERNAL_ADD_ARGS] = (args: () => unknown[]) => {
      this.args.push(args);
    };

    return commentNode;
  }

  appendChild(parent: PixiRendererNode, newChild: PixiRendererNode): void {
    const parentState = parent.__pixi_renderer__;
    const childState = newChild.__pixi_renderer__;

    setParent(newChild, parent);
    addChild(parent, newChild);

    if (parentState.type === 'pixi' && childState.type === 'pixi') {
      // TODO: Why should this happen?
      if (parent === newChild) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      attachPixiChild(parent, newChild);

      return;
    }

    if (parentState.type !== 'pixi' && childState.type === 'pixi') {
      attachPixiChild(this.pixi.stage, newChild);
      return;
    }
  }

  insertBefore(parent: PixiRendererNode, newChild: PixiRendererNode): void {
    if (parent === null || !parent?.__pixi_renderer__ || parent === newChild) return;
    this.appendChild(parent, newChild);
  }

  setAttribute(el: PixiRendererNode, name: string, value: string): void {
    this.setProperty(el, name, value);
  }

  removeAttribute(el: PixiRendererNode, name: string): void {
    this.setProperty(el, name, undefined);
  }

  setProperty(el: PixiRendererNode, name: string, value: unknown): void {
    if (name === SPECIAL_PROPERTIES.PROPERTIES) {
      Object.assign(el, value);
      return;
    }

    el[name] = value;
  }

  listen(
    target: PixiRendererNode,
    eventName: string,
    callback: (event: unknown) => boolean | void
  ): () => void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return attachPixiEventListener(target, eventName, callback);
  }

  removeChild(parent: PixiRendererNode | null, oldChild: PixiRendererNode): void {
    const oldChildState = oldChild.__pixi_renderer__;

    if (oldChildState && oldChildState.type === 'pixi') {
      if (!parent) {
        parent = this.parentNode(oldChild);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      removePixiChild(oldChild, parent);

      return;
    }
  }

  parentNode(node: PixiRendererNode): PixiRendererNode {
    const state = node.__pixi_renderer__;
    if (state?.parent) return state.parent;
    return this.delegate.parentNode(node);
  }

  createText = this.delegate.createText.bind(this.delegate);
  destroy = this.delegate.destroy.bind(this.delegate);
  destroyNode: ((node: unknown) => void) | null = null;
  selectRootElement = this.delegate.selectRootElement.bind(this.delegate);
  nextSibling = this.delegate.nextSibling.bind(this.delegate);
  addClass = this.delegate.addClass.bind(this.delegate);
  removeClass = this.delegate.removeClass.bind(this.delegate);
  setStyle = this.delegate.setStyle.bind(this.delegate);
  removeStyle = this.delegate.removeStyle.bind(this.delegate);
  setValue = this.delegate.setValue.bind(this.delegate);
  get data(): Record<string, unknown> {
    return this.delegate.data;
  }
}
