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

### Old way using ngFor

```html
<course-card
  *ngFor="let course of courses; index as i; first as isFirst; last as isLast; even as isEven; odd as isOdd"
  [class.is-first]="isFirst"
  [class.is-last]="isLast"
  [class.is-even]="isEven"
  [class.is-odd]="isOdd"
  (courseSelected)="onCourseSelected($event)"
  [course]="course"
  [cardIndex]="i + 1"
>
</course-card>
```

✅ Command to Migrate to New Control Flow Syntax

```
ng generate @angular/core:control-flow

```

- ⚡ What This Does:

  - Automatically converts:

  - \*ngIf to @if

  - \*ngFor to @for

- \*ngSwitch to @switch

- Updates your template files safely.

- Leaves backups of the original files for review.

### Conditional style - [ngClass]

ngClass -> its only used for conditional style purpose, other its works same as 'class'

through class only only passes strings but through ngClass we can pass an string, array or configuration obj

#### passing array

```html
<div class="course-card" ngClass="['course-card', 'beginner']">
  <div class="course-title">{{index}} + {{course.description}}</div>
  <img width="300" [src]="course.url" />
  <div class="course-description">{{course.longDescription}}</div>
  <button (click)="onCourseViewed()">View Course</button>
</div>
```

#### passing an Object

```html
<div class="course-card" ngClass="['course-card':true, 'beginner:true]">
  <div class="course-title">{{index}} + {{course.description}}</div>
  <img width="300" [src]="course.url" />
  <div class="course-description">{{course.longDescription}}</div>
  <button (click)="onCourseViewed()">View Course</button>
</div>
```

#### we can also call the method which return the obj or values

```html
<div class="course-card" ngClass="cardClasses()">
  <div class="course-title">{{index}} + {{course.description}}</div>
  <img width="300" [src]="course.url" />
  <div class="course-description">{{course.longDescription}}</div>
  <button (click)="onCourseViewed()">View Course</button>
</div>
```

```

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    imports: [CommonModule],

})

```

```ts
//course-card.component.ts
cardClasses() {
        return {
            'beginning': course.category==beginner,
            'course-card': false
        }
    }

```

### [ngStyle]

```
//course-card.component.html
<div class="course-card" [ngClass]="cardClasses()" [ngStyle]="cardStyles()">
    <div class="course-title">
        {{index}} , {{course.description}}
    </div>
    <img width="300" [src]="course.url">
    <div class="course-description">{{course.longDescription}}</div>
    <button (click)="onCourseViewed()">View Course</button>
</div>

```

```
//course-card.component.ts
 cardStyles() {
        return {
            'background-image': 'url(' + this.course.url + ') '

        }
    }

```

### @switch()

```
<div class="course-category">
        @switch (course.category) {
        @case ("beginner") {
        <div class="category">Beginner</div>
        }
        @case ("Design") {
        <div class="category">Design</div>
        }
        @case ("Frontend") {
        <div class="category">Frontend</div>
        }
        }
    </div>
```

## notion of angular pipes.

#### So what exactly is a pipe?

- A pipe is a template mechanism that we can use to transfor
- An Angular pipe is a function you can use directly in your HTML templates to transform data before displaying it.

```
//app.html
<div class="demo">
    <!-- <div>Start:{{startDate | date }}</div> -->Start:Jan 1, 2000
    <!-- <div class="demo">{{title | lowercase}}</div> -->claangular-app
    <!-- <div class="demo">{{price | currency}}</div> ->$9.99
    <div class="demo">{{price | currency:'EUR'}}-></div>€9.99 -->
  </div>
```

```
//app.ts
 startDate = new Date(2000, 0, 1);
  title = COURSES[0].description;
  price = 9.992442224242
  rate = 0.67
```

## Accessing Child Component

- In the `App` component, we use Angular's `@ViewChild` decorator to get a **reference to a child component instance**, specifically `CourseCardComponent`.

```ts
@ViewChild(CourseCardComponent)
card!: CourseCardComponent;
```

-✅ What This Means

- The card variable holds a reference to the first instance of CourseCardComponent found in the component's template after the view is initialized.

- This allows the parent component (App) to directly access public properties and methods of the CourseCardComponent.

- It provides a way to programmatically control or retrieve data from the child component.

## 📦 ViewChild Query Mechanism (Angular)

In this example, we are using Angular's `@ViewChild` decorator to get a reference to a DOM element from our component class.

---

### 🔧 How it works

#### ✅ In the HTML template:

```html
<div class="courses" #container>
  <course-card
    class="cardcomp"
    #cardRef1
    (courseSelected)="onCourseSelected($event)"
    [course]="courses[0]"
  />
</div>
```

#### The #container is a template reference variable, which marks this <div> so we can access it in the TypeScript file.

#### #cardRef1 is a template reference variable, pointing to the course-card component.

- To access the underlying DOM element of this custom component, we use { read: ElementRef } in the TypeScript file.

```ts

//app.ts
@ViewChild('container')
containerDiv!: ElementRef;


onCourseSelected(course: Course) {
  console.log("container div", this.containerDiv);
}



```

- The @ViewChild('container') tells Angular to find the element with reference #container and give us access to it via containerDiv.

- ElementRef is a wrapper around the actual DOM element, allowing us to read or manipulate it.
- This method is triggered when the courseSelected event is emitted from the course-card component.

- Inside this method, we can access the containerDiv, which gives us control over the actual <div> element in the DOM.

```ts

@ViewChild('cardRef1', { read: ElementRef })
card1!: ElementRef;


  onCourseSelected(course: Course) {
    console.log("container div", this.card1)
  }
```

- The { read: ElementRef } tells Angular:

  - Don't give me the component instance, give me the raw DOM element instead.

  - This is helpful when you want to manipulate or inspect the DOM element of a custom component, like course-card.

---

---

# ngViewInit

- ngAfterViewInit is same like constructor just its execute after main constructor?
  - ngAfterViewInit is not the same as the constructor—they serve different purposes and run at different times in the Angular component lifecycle.

## ✅ Difference between `constructor` and `ngAfterViewInit`

| **Aspect**       | **constructor**                       | **ngAfterViewInit**                                                 |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------- |
| **When it runs** | As soon as the class is instantiated. | After the component's view (and child views) are fully initialized. |

## ✅ What does "After the component's view (and child views) are fully initialized" mean?

In Angular:

- Your component may have its own template (HTML structure).
- Inside your template, you can have **child components** or other HTML elements.
- These child components also have their own templates.

---

### 🧩 Example:

```html
<!-- app.component.html -->
<div>
  <h1>My Courses</h1>

  <course-card #cardRef1 [course]="courses[0]"></course-card>
</div>
```

- In this case:

  - The <div> and <h1> are part of your component's view.

  - The <course-card> is a child component, and it has its own view/template internally.

⏳ When ngAfterViewInit runs:

- Angular has finished:

- Rendering your component's own HTML.

- Creating and inserting all child components (like <course-card>).

- Rendering the child components' templates as well.

✅ Only after all this, Angular calls ngAfterViewInit.

- In ngAfterViewInit, you are guaranteed that:

- The DOM is ready.

- All child components are created and visible.

- You can safely access or modify them.

ng

## ViewChildren Decorator

```ts

//app.ts

@ViewChildren(CoursCardComponent)
cards: QueryList<CourseCardComponent>;


ngAfterViewInit(){

//first card of the list
this.cards(this.cards.first)

//last card of the list
this.cards(this.cards.last)


this.cards(this.cards.first)

```

# Understanding `@ViewChildren` in Angular

This guide explains the difference between two common usages of Angular's `@ViewChildren` decorator:

- 1. `@ViewChildren(CourseCardComponent)`
- 2. `@ViewChildren(CourseCardComponent, { read: ElementRef })`

---

## 1. `@ViewChildren(CourseCardComponent)`

### ✅ What it returns:

A `QueryList` of **component instances** of `CourseCardComponent`.

### ✅ Access type:

You can interact with the **logic** of the component — call methods, access properties, etc.

### ❌ You do NOT get:

Direct access to the HTML element.

### 🔧 Example:

```ts
@ViewChildren(CourseCardComponent) cards!: QueryList<CourseCardComponent>;

ngAfterViewInit() {
  this.cards.forEach(card => card.toggleHighlight());
}

## 2. `@ViewChildren(CourseCardComponent, { read: ElementRef })`

### ✅ What it returns:
A `QueryList` of `ElementRef` instances, each pointing to the native DOM element of the `CourseCardComponent`.

### ✅ Access type:
You can manipulate the HTML directly — styles, classes, attributes.

### ❌ You do NOT get:
Access to the component's methods or properties.



---

## 🔍 Comparison Table

| Feature                     | `@ViewChildren(CourseCardComponent)`         | `@ViewChildren(CourseCardComponent, { read: ElementRef })` |
|-----------------------------|----------------------------------------------|-------------------------------------------------------------|
| **Returns**                 | Component instances                          | DOM element references (`ElementRef`)                       |
| **Access**                  | Component logic (methods, properties)        | HTML element (styles, attributes)                           |
| **Can call methods?**       | ✅ Yes                                       | ❌ No                                                        |
| **Can change styles directly?** | ❌ No                                  | ✅ Yes                                                       |
| **Use case**                | Interact with Angular component              | Manipulate DOM directly                                     |

---
---

```
