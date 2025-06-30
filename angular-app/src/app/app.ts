import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseCardComponent } from "../components/course-card.component";
import { COURSES } from '../data/db-data';
import { Course } from './model/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CourseCardComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


  courses = [...COURSES];

  startDate = new Date(2000, 0, 1);
  title = COURSES[0].description;
  price = 9.992442224242
  rate = 0.67
  onCourseSelected(course: Course) {
    console.log("App component - card is clicked", course)
  }

}
