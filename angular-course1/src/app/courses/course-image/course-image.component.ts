import {Component, Input, OnInit} from '@angular/core';

@Component({
<<<<<<< HEAD:src/app/course-image/course-image.component.ts
    selector: 'course-image',
    templateUrl: './course-image.component.html',
    styleUrls: ['./course-image.component.css'],
    standalone: false
=======
  selector: 'course-image',
  templateUrl: './course-image.component.html',
  styleUrls: ['./course-image.component.css'],
  standalone: true
>>>>>>> 8ef2f749e26d26760f7c4ba1d29b1652dae77b45:src/app/courses/course-image/course-image.component.ts
})
export class CourseImageComponent implements OnInit {

  @Input('src')
  imageUrl:string;



  constructor() { }

  ngOnInit() {
  }

}
