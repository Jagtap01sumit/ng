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

#### This setup creates a clean, modular component structure where multiple child components dynamically render course data based on the @Input() provided from the parent. This is ideal for UI components like cards, lists, or reusable widgets in Angular apps.
