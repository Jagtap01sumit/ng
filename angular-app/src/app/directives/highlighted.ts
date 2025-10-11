import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]',

})
export class HighlightedDirective {
  @Input('highlighted')
  isHighlighted = false;

  constructor() {
    console.log("Directives created...")
  }

  @HostBinding('class.highlighted')
  get cssClass() {
    return this.isHighlighted;
  }

  @HostListener('mouseover')
  mouseOver() {
    this.isHighlighted = true
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
  }
}

@Directive({
  selector: '[appActive]',

})
export class isActiveDirective {
  @Input('appActive')
  isActive = false;

  constructor() {
    console.log("Directives created...")
  }

  @HostBinding('class.active')
  get cssClass() {
    return this.isActive;
  }

  @HostListener('mouseover')
  mouseOver() {
    this.isActive = true
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isActive = false
  }

  toggle() {
    this.isActive = !this.isActive;
  }
}