import {
  DestroyRef,
  Directive,
  effect,
  EmbeddedViewRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SPECIAL_INTERNAL_ADD_ARGS } from './constants';

@Directive({
  selector: 'ng-template[pixiArgs]',
})
export class PixiArgs {
  pixiArgs = input.required<unknown[]>();
  private previousArgs: unknown[] | undefined = undefined;

  private vcr = inject(ViewContainerRef);
  private template = inject(TemplateRef);

  private view?: EmbeddedViewRef<unknown>;

  constructor() {
    const commentNode = this.vcr.element.nativeElement;

    if (commentNode[SPECIAL_INTERNAL_ADD_ARGS]) {
      commentNode[SPECIAL_INTERNAL_ADD_ARGS](() => this.pixiArgs());
    }

    effect(() => {
      const value = this.pixiArgs();

      // TODO: Add some deep comparison here
      if (value === this.previousArgs) return;

      this.previousArgs = value;

      this.createView();
    });

    inject(DestroyRef).onDestroy(() => {
      this.view?.destroy();
    });
  }

  private createView() {
    if (this.view && !this.view.destroyed) this.view.destroy();

    this.view = this.vcr.createEmbeddedView(this.template);
  }
}
