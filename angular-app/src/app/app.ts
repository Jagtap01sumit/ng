import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseCardComponent } from "../components/course-card.component";
import { COURSE } from '../data/db-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CourseCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-app';
  coreCourse = COURSE[0]
  rxjsCourse = COURSE[1]
  ngrxCourse = COURSE[2]

}
