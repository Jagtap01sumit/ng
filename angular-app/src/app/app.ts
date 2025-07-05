import { Component, ContentChildren, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseCardComponent } from "../components/course-card/course-card.component";
import { COURSES } from '../data/db-data';
import { Course } from './model/course';
import { CommonModule } from '@angular/common';
import { CourseImage } from "../components/course-image/course-image";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CourseCardComponent, CommonModule, CourseImage],
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
