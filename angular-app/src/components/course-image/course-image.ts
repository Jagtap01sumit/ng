import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-image',
  imports: [],
  standalone: true,
  templateUrl: './course-image.html',
  styleUrl: './course-image.css'
})
export class CourseImage {
  @Input()
  img: string = '';
}
