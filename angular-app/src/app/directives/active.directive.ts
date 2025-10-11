import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appActive]'
})
export class ActiveDirective {
    @Input('appActive') isActive = false;

    @HostBinding('class.active') get cssClass() { return this.isActive; }

    @HostListener('mouseover') mouseOver() { this.isActive = true; }
    @HostListener('mouseleave') mouseLeave() { this.isActive = false; }

    toggle() { this.isActive = !this.isActive; }
}
