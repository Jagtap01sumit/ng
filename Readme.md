# Angular Setup

```
npm install -g @angular/cli
ng
ng new angular-course

```

### State Management Approach

###### Old Way: Using Decorators (@Input(), @Output())

###### New Way: Using Signals (signal(), computed(), etc.)

# 📘 Angular Example: Passing Data from Parent to Child Components Using `@Input()`

This example demonstrates how to pass data from a parent component (`AppComponent`) to a reusable child component (`CourseCardComponent`) using Angular's `@Input()` decorator.

---

## 🔧 Goal

Render multiple course cards dynamically by passing course data (`Course` object) from the parent to each `<course-card>` component. This setup showcases clean **parent-to-child communication** in Angular.

---

## 🔁 What is Happening Here?

- **`AppComponent`** (the **parent**) contains course data.
- It passes this data down to **`CourseCardComponent`** (the **child**) using `[course]="..."`.
- Inside the child component, Angular uses the `@Input()` decorator to receive that data.
- The child component then displays the course info in the UI.

✅ This is a standard **parent-to-child data binding** pattern in Angular.

---

## 🧩 1. `CourseCardComponent` (Child Component)

### ✅ course-card.component.ts

```ts
import { Component, Input, OnInit } from "@angular/core";
import { Course } from "../app/model/course";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements OnInit {
  @Input({ required: true }) course!: Course;

  ngOnInit(): void {}
}
```

course-card.component.html

```html
<div class="course-card">
  <div class="course-title">{{ course.description }}</div>
  <img width="300" [src]="course.url" />
  <div class="course-description">{{ course.longDescription }}</div>
</div>
```

AppComponent

###### app.ts

```ts
import { Component } from "@angular/core";
import { CourseCardComponent } from "../components/course-card.component";
import { COURSE } from "../data/db-data";

@Component({
  selector: "app-root",
  imports: [CourseCardComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  coreCourse = COURSE[0];
  rxjsCourse = COURSE[1];
  ngrxCourse = COURSE[2];
}
```

app.html

```html
<main class="main">
  <div class="content">
    <course-card [course]="coreCourse"></course-card>
    <course-card [course]="rxjsCourse"></course-card>
    <course-card [course]="ngrxCourse"></course-card>
  </div>
</main>
```

##### This setup creates a clean, modular component structure where multiple child components dynamically render course data based on the @Input() provided from the parent. This is ideal for UI components like cards, lists, or reusable widgets in Angular apps.

---

---

# Custome Events

### Angular Component Communication with @Output()

This section explains how to use `@Output()` in Angular to create custom event emitters, enabling communication from **child components to parent components**.

---

### ✅ What is `@Output()`?

- `@Output()` is a decorator in Angular.
- It allows a **child component** to emit events that a **parent component** can listen to.

---

### 🔧 Use Case

- You want a child component (e.g. `CourseCardComponent`) to notify the parent (e.g. `AppComponent`) when something happens—like a button click.

---

## 📄 Example

- here we just create event in child component , so our event name is "courseSelected"
- the browser in build event name is click same like this our custom event name is "courseSelected"

### 🧩 Child Component: `course-card.component.ts`

```ts
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
```

### Parent Component Template: app.html

```html
<course-card (courseSelected)="onCourseSelected($event)"></course-card>
```

### Parent clas component: app.ts

```ts
export class AppComponent {
  onCourseSelected(course: Course) {
    console.log("Course selected:", course);
  }
}
```

#### We can also use this event emiiter like this:

```ts
//if we want our name of event emitter is "courseSelected", so we can mention it in decorator as string
@Output('courseSelected')
eventEmiiter = new EventEmitter<Course>();


```

---

---

## Control Flow Primitives

```html
//“Use the id property of each course object to track its identity in the list.”
// we just want uniqueness, so we can also use @for (item of items; track
$index) { ... } @for(course of courses; track course.id ){ @for(course of
courses; track course.id; let i = $index;let first=$first; let last = $last; let
even= $even; let odd= $odd ){
<course-card
  (courseSelected)="onCourseSelected($event)"
  [index]="i"
  [course]="course"
  [class.is-first]="first"
  [class.is-last]="last"
  [class.is-even]="even"
  [class.is-odd]="odd"
/>
} @empty{
<h1>No Course Found</h1>
} }
```

$odd
| Variable | Description                                          |
| -------- | ---------------------------------------------------- |
| `$index`| The index of the current item in the array           |
|`$count` | Total number of items                                |
| `$first`|`true`if the current item is the first in the array   |
|`$last`  | `true` if the current item is the last in the array  |
| `$even` |`true`for even-indexed items                          |
|`$odd`   |`true` for odd-indexed items |
