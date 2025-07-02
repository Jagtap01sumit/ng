import { Component, ElementRef, ViewChild } from '@angular/core';
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

  courses = COURSES;

  @ViewChild(CourseCardComponent)
  car!: CourseCardComponent;



  @ViewChild('cardRef1', { read: ElementRef })
  card1!: ElementRef


  @ViewChild('container')
  containerDiv!: ElementRef


  onCourseSelected(course: Course) {
    console.log("container div", this.card1)
  }

}
