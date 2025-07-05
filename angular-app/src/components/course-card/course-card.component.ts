import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList } from "@angular/core";
import { COURSES } from "../../data/db-data";

import { CommonModule } from "@angular/common";
import { Course } from "../../app/model/course";
import { CourseImage } from "../course-image/course-image";

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    imports: [CommonModule],

})

export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

    @Input({
        required: true
    }
    )
    course!: Course;

    @Input() index!: number;

    @Output('courseSelected')
    eventEmitter = new EventEmitter<Course>();

    @ContentChildren(CourseImage, { read: ElementRef })
    images!: QueryList<ElementRef>;


    onCourseViewed() {
        console.log("card component - button clicked")
        this.eventEmitter.emit(this.course);
    }
    ngAfterContentInit(): void {
        console.log("images QueryList:", this.images);
        console.log("First image ElementRef:", this.images.first);
    }


    ngAfterViewInit(): void {

    }
    constructor() { }
    ngOnInit(): void {

    }

    cardClasses() {
        return {
            'beggining': this.course.category == 'beginner',

        }

    }
    cardStyles() {
        return {
            'background-image': 'url(' + this.course.url + ') '

        }
    }



}