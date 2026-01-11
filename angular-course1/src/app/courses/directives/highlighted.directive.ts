import {Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output} from '@angular/core';
import {CoursesService} from '../courses.service';


@Directive({
    selector: '[highlighted]',
    exportAs: 'hl',
<<<<<<< HEAD:src/app/directives/highlighted.directive.ts
    standalone: false
=======
    standalone: true
>>>>>>> 8ef2f749e26d26760f7c4ba1d29b1652dae77b45:src/app/courses/directives/highlighted.directive.ts
})
export class HighlightedDirective {

    @Input('highlighted')
    isHighlighted = false;

    @Output()
    toggleHighlight = new EventEmitter();

    constructor(private coursesService: CoursesService) {

        console.log('coursesService highlighted ' + coursesService.id);

    }

    @HostBinding('class.highlighted')
    get cssClasses() {
        return this.isHighlighted;
    }

    @HostListener('mouseover', ['$event'])
    mouseOver($event) {

        console.log($event);

        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }



}
