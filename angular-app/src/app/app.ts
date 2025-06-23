import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseCardComponent } from "../components/course-card.component";
import { COURSES } from '../data/db-data';
import { Course } from './model/course';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CourseCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-app';

  courses = [...COURSES];

  onCourseSelected(course: Course) {
    console.log("App component - card is clicked", course)
  }

}
