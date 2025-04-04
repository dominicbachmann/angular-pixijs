export interface PixiRendererState {
  type: 'pixi' | 'comment';
  nameOrValue: unknown;
  parent: PixiRendererNode | null;
  children: PixiRendererNode[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PixiRendererNode extends Record<any, unknown> {
  __pixi_renderer__: PixiRendererState;
}

export const createNode = (
  type: PixiRendererState['type'],
  nameOrValue: unknown,
  node: Record<string, unknown>
): PixiRendererNode => {
  // TODO: Improve this for monomorphism
  const state = {
    type,
    nameOrValue,
    parent: null,
    children: [],
  } satisfies PixiRendererState;

  return Object.assign(node, { __pixi_renderer__: state });
};

export function setParent(node: PixiRendererNode, parent: PixiRendererNode) {
  if (!node.__pixi_renderer__.parent) {
    node.__pixi_renderer__.parent = parent;
  }
}

export function addChild(node: PixiRendererNode, child: PixiRendererNode) {
  if (!node.__pixi_renderer__.children.includes(child)) {
    node.__pixi_renderer__.children.push(child);
  }
}
