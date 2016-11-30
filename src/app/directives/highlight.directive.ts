import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
  selector: '[appPocketHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer) { }

  /*
  * Changes background fill of pocket to yellow on mouseenter
  * Requirement: 
  */
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  /*
  * Reverts background fill of pocket to original color on mouseleave
  * Requirement: 
  */
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#C49A6C');
  }

  /*
  * Performs actual color change manipulation of HTML element
  * Requirement: 
  */
  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'fill', color);
  }
}