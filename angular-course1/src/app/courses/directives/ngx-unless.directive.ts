import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
<<<<<<< HEAD:src/app/directives/ngx-unless.directive.ts
    selector: '[ngxUnless]',
    standalone: false
=======
  selector: '[ngxUnless]',
  standalone: true
>>>>>>> 8ef2f749e26d26760f7c4ba1d29b1652dae77b45:src/app/courses/directives/ngx-unless.directive.ts
})
export class NgxUnlessDirective {

  visible = false;


  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {


  }

  @Input()
  set ngxUnless(condition:boolean) {
      if (!condition && !this.visible) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.visible = true;
      }
      else if (condition && this.visible) {
          this.viewContainer.clear();
          this.visible = false;
      }

  }


}








