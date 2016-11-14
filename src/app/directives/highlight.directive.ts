import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appPocketHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#C49A6C');
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'fill', color);
  }
}