import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { COURSE } from "../data/db-data";
import { Course } from "../app/model/course";

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']

})

export class CourseCardComponent implements OnInit {

    @Input({
        required: true
    }
    )
    course!: Course;

    @Output()
    courseSelected = new EventEmitter<Course>();

    onCourseViewed() {
        console.log("card component - button clicked")
        this.courseSelected.emit(this.course);
    }

    constructor() { }
    ngOnInit(): void {

    }



}