### Angular Setup

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

### 🔧 Goal

Render multiple course cards dynamically by passing course data (`Course` object) from the parent to each `<course-card>` component. This setup showcases clean **parent-to-child communication** in Angular.

---

### 🔁 What is Happening Here?

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
```

## 2. `@ViewChildren(CourseCardComponent, { read: ElementRef })`

### ✅ What it returns:

A `QueryList` of `ElementRef` instances, each pointing to the native DOM element of the `CourseCardComponent`.

### ✅ Access type:

You can manipulate the HTML directly — styles, classes, attributes.

### ❌ You do NOT get:

Access to the component's methods or properties.

---

## 🔍 Comparison Table

| Feature                         | `@ViewChildren(CourseCardComponent)`  | `@ViewChildren(CourseCardComponent, { read: ElementRef })` |
| ------------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| **Returns**                     | Component instances                   | DOM element references (`ElementRef`)                      |
| **Access**                      | Component logic (methods, properties) | HTML element (styles, attributes)                          |
| **Can call methods?**           | ✅ Yes                                | ❌ No                                                      |
| **Can change styles directly?** | ❌ No                                 | ✅ Yes                                                     |
| **Use case**                    | Interact with Angular component       | Manipulate DOM directly                                    |

---

---

# Content Projection with `ng-content`

## 🧩 What is Content Projection?

Content projection allows you to **pass content from a parent component into a child component** and display it at a specific location inside the child using the `<ng-content>` directive.

This is useful when you want the child component to be flexible and allow the parent to control part of its layout or content.

---

## 🎯 Scenario

We have a `CourseCardComponent` that used to render an `<img>` tag internally. Now, we want the **parent component** to control what image is shown for each card, so we **moved the `<img>` tag to the parent** and used `<ng-content>` in the child to project it.

---

## 🧱 Parent Component Template (`app.component.html`)

```html
<div class="courses" *ngIf="courses[0] as course">
  <course-card (courseSelected)="onCourseSelected($event)" [course]="course">

    <img width="300" alt="Angular Logo" [src]="course.iconUrl" />
    <div class="course-container">
      <h2>content in course card</h2>
    </div>
    <h5>total Lessons: 10</h5>
  </course-card>
</div>
```


```


- Here, the <img> and <h5> elements are placed between the opening and closing tags of <course-card>. These elements are not part of the child component's template directly, but will be projected into it using <ng-content>.

```html
<div class="course-card" [ngClass]="cardClasses()" [ngStyle]="cardStyles()">
  <div class="course-title">{{index}}, {{course.description}}</div>

  <!-- Content from parent will be inserted here -->

  <ng-content></ng-content>
  <!-- This project any type of content which between opening and closing tag of child component in parents-->
  //<ng-content select="img"></ng-content>

  <!-- Only <img> tags from the parent will be projected here -->
  //<ng-content select=".course-container"></ng-content>
  <!-- This projects only element or content btn the ".course-container" class div-->

  //<ng-content select=".course-container"></ng-content>
  <!-- Only elements with the class 'course-container' will be projected here -->

  <div class="course-description">{{course.longDescription}}</div>
  <button (click)="onCourseViewed()">View Course</button>
</div>

```

- The <ng-content> tag acts as a placeholder for the content passed from the parent. In this case, the <img> and <h5> from the parent will be rendered inside the child component at the location of <ng-content>.

- You can also use **selectors** to control **where specific types of content** should be projected. ex. img, class, id

- Key Points
- <ng-content> enables content projection from parent to child.
- Useful for creating reusable and flexible components.
- The parent controls what content is projected.
- The child defines where the projected content should appear.

# Angular `@ContentChild()` Decorator

## 🧩 What is `@ContentChild()`?

In Angular, `@ViewChild()` is used to access elements **inside the component's own template**.  
However, when you use **content projection** via `<ng-content>`, the projected content is **not part of the component's view**, so `@ViewChild()` **cannot access it**.

To access projected content, Angular provides the `@ContentChild()` decorator.

---

## 🆚 Why `@ViewChild()` Doesn't Work with `<ng-content>`

When you try to use `@ViewChild()` to access a template reference inside projected content, it returns `undefined`.

### ❌ Example (Fails):

````html
<!-- Parent Component -->
<course-card>
  <img #courseImage src="..." />
</course-card>

````
// Inside CourseCardComponent 

```@ViewChild('courseImage') image: ElementRef;
ngAfterViewInit() { console.log(this.image); // ❌ undefined } This fails
because courseImage is not part of the view, it's projected content.
```
### To access projected content, use @ContentChild() instead. 
```ts // Inside
CourseCardComponent @ContentChild('courseImage') image: ElementRef;
ngAfterContentInit() { console.log(this.image); // ✅ ElementRef of the
projected image }
```
- The scope of @ContentChild() is limited to content projected via <ng-content>.
- It cannot access elements that are outside of the <ng-content> projection area.

## @ContentChildren()

- @ContentChildren works similar to @ContentChild()

```html
<div class="courses" #container *ngIf="courses[0] as course">
  <course-card
    class="cardcomp"
    #cardRef1
    (courseSelected)="onCourseSelected($event)"
    [course]="course"
  >
    <app-course-image [img]="course.url"></app-course-image>
    <app-course-image [img]="courses[1].url"></app-course-image>
    <app-course-image [img]="courses[2].url"></app-course-image>
  </course-card>
</div>
```

```ts
//course-card.component.ts

    @ContentChildren(CourseImage, { read: ElementRef })
    images!: QueryList<ElementRef>;

    ngAfterContentInit(): void {
        console.log("images QueryList:", this.images);
        console.log("First image ElementRef:", this.images.first);
    }
```

🚀 Key Points

- ✔ @ContentChildren is used to access multiple projected children.
- ✔ It requires <ng-content> inside your component's template.
- ✔ The read: ElementRef option gives direct access to the native DOM elements.
- ✔ Useful for manipulating, styling, or interacting with projected content.

---

---

# Angular template (ng-template)

```html
<ng-template #blackImage>
  <p class="warm">No Image Found</p>
</ng-template>

<ng-container *ngIf="course.url; else blackImage">
  <ng-content select="app-course-image"></ng-content>
</ng-container>
```

- ng-template #blackImage:
  - Defines a hidden block of HTML that only gets displayed if we explicitly render it.
  - In this case, it shows "No Image Found" as a fallback if the course image is missing.

🔑 Important Notes:

- Although ng-template is hidden by default, it can access variables like course from the surrounding template where it's declared.

- You can also define private variables inside ng-template, visible only inside that template, by using Angular's template variable syntax if needed.

- You cannot apply \*ngIf directly to <ng-content>. That's why we wrap it with ng-container, which doesn't add extra DOM but allows structural directives.

- \*ngIf → Angular automatically wraps the element in a <ng-template> for you. You just write the div (or any element) and Angular handles the template behind the scenes.
- -[ngIf] → You must explicitly write the <ng-template> yourself. Angular won’t wrap the element

### What is Template Initiation in Angular?

**Template Initiation** means creating and preparing reusable templates in your Angular component that can be displayed (or not) based on certain conditions.

In Angular, we use `ng-template` to define these templates. They don't get rendered immediately. Instead, we can "initiate" or show them later in the code using `ngTemplateOutlet`.

---

#### Example of Template Initiation:

```html
<ng-template #blackImage let-courseName="description">
  <p class="warm">{{courseName}} - No Image Found</p>
</ng-template>

<ng-container
  *ngTemplateOutlet="blackImage; context: { description: course.description }"
></ng-container>
```

- What is let-courseName="description" in Angular?
- This is part of Angular's template variable binding inside an <ng-template>.

- description is a property passed through context in ngTemplateOutlet.

- let-courseName="description" means:

  - "Create a local variable named courseName and bind it to the value of description."

- We do this so that the template can be reusable and dynamic. You can pass different values every time you use the template.

```
<ng-container *ngTemplateOutlet="blackImage; context: { description: course.description }"></ng-container>

```

---

---

## Directives in Angular

- In Angular, Directives are special instructions that you attach to elements in the DOM to change their behavior or appearance.

- There are 3 types:

  - Component Directives → basically Angular components (@Component).

  - Structural Directives → change DOM structure (*ngIf, *ngFor).

  - Attribute Directives → change appearance/behavior (ngClass, custom directives).

### how we can create custom directives

```
ng g directive directives/highlighted
```

-

### Angular Attribute directives

-The directives which apply on a element and change the behaviour of the element is called attibute directives

example

```
<input disable required></input>

```

..

- Examples:

  - Built-in → ngClass, ngStyle

  - Custom → directives you build with @Directive

- Inside attribute directives, we use:

  - @HostBinding → to bind properties/classes/styles of the host element.

  - @HostListener → to listen to events on the host element.

#### Highlight.directive.ts

```
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlighted]' // usage as attribute
})
export class HighlightDirective {
  private isActive = false;

  // Dynamically bind a CSS class to the host element
  @HostBinding('class.highlighted') get applyClass() {
    return this.isActive;
  }

  // Toggle class on click
  @HostListener('click') toggle() {
    this.isActive = !this.isActive;
  }
}

```

### course-card.component.html

```
<div highlighted>
  Click me → I toggle "highlighted" class
</div>
```

### other example with all file structure

```

//app/directives/active.directive.ts

import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appActive]'
})
export class ActiveDirective {
    @Input('appActive') isActive = false;

    @HostBinding('class.active') get cssClass() { return this.isActive; }

    @HostListener('mouseover') mouseOver() { this.isActive = true; }
    @HostListener('mouseleave') mouseLeave() { this.isActive = false; }

    toggle() { this.isActive = !this.isActive; }
}

//app/app.ts
//add in imports (ActiveDirective)
 imports: [RouterOutlet, CourseCardComponent, CommonModule, CourseImage, HighlightedDirective, ActiveDirective],


//app.html

<div class="courses" #container *ngIf="courses[0] as course">
  <div>
    <course-card class="cardcomp" [course]="course"></course-card>
  </div>
  <course-card class=" cardcomp" [course]="courses[2]"></course-card>
  <div [appActive]="true">hello</div>//here we use

</div>
```

#### How we can acheive the same behaviour in react

```
import { useState } from "react";

function HighlightedBox({ children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={isActive ? "highlighted" : ""}
      onClick={() => setIsActive(!isActive)}
    >
      {children}
    </div>
  );
}
```


### Structural directives step by step implementation
#### Creating Custom Structural Directives in Angular
- In Angular, Structural Directives are used to add or remove elements from the DOM dynamically.
- They are identified by the * symbol (like *ngIf, *ngFor, etc.).

##### You can also create your own structural directives to implement custom logic — such as conditionally displaying elements based on user roles, data, or application state.

#### What is a Structural Directive?
- A structural directive changes the structure of the DOM.
- ex. *ngIf it will add or remove the div element based on condition

#### Step-by-Step Implementation

- Create the Directive File
```
ng generate directive pnxUnless

```

- Implement the Directive Logic
```
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pnxUnless]'
})
export class PnxUnlessDirective {

  private visible = false;

  constructor(
    private templateRef: TemplateRef<any>,      // Reference to the <ng-template> content
    private viewContainer: ViewContainerRef     // Placeholder to insert/remove template
  ) {}

  @Input() set pnxUnless(condition: boolean) {
    if (!condition && !this.visible) {
      // Condition is false → show the element
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else if (condition && this.visible) {
      // Condition is true → remove the element
      this.viewContainer.clear();
      this.visible = false;
    }
  }
}

```
- Use It in Your Component Template
```
  <h2>Example: Custom Structural Directive</h2>
```
```
<input
 type="checkbox" [(ngModel)]="isHidden"> Toggle Hide
```
```
<div *pnxUnless="isHidden" class="card">
  This text is visible unless the checkbox is checked.
</div>

  ```
#### How It Works Internally

When Angular sees:

<div *pnxUnless="isHidden"></div>


- It actually converts it to:

<ng-template [pnxUnless]="isHidden">
  <div></div>
</ng-template>


- Then your directive:

Gets a reference to that template using TemplateRef.

Decides (based on the condition) whether to:

Insert the template using viewContainer.createEmbeddedView(templateRef)

Remove it using viewContainer.clear()

| Concept                  | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| **Structural Directive** | Changes DOM structure (adds/removes elements)           |
| **TemplateRef**          | Reference to the HTML template (hidden `<ng-template>`) |
| **ViewContainerRef**     | Manages where to insert/remove the template             |
| **@Input() Setter**      | Receives condition dynamically                          |
| **createEmbeddedView()** | Displays the template                                   |
| **clear()**              | Removes the template                                    |

## Angular View Encapsulation


:host
:host-context
::ng-deep

encapsulation:ViewEncapsulation.ShadowDom/None/Emulate

if we apply shadowDom then only componenet css can apply for that module, no global css will apply on it

```

- The <ng-content> tag acts as a placeholder for the content passed from the parent. In this case, the <img> and <h5> from the parent will be rendered inside the child component at the location of <ng-content>.

- You can also use **selectors** to control **where specific types of content** should be projected. ex. img, class, id

- Key Points
- <ng-content> enables content projection from parent to child.
- Useful for creating reusable and flexible components.
- The parent controls what content is projected.
- The child defines where the projected content should appear.

# Angular `@ContentChild()` Decorator

## 🧩 What is `@ContentChild()`?

In Angular, `@ViewChild()` is used to access elements **inside the component's own template**.  
However, when you use **content projection** via `<ng-content>`, the projected content is **not part of the component's view**, so `@ViewChild()` **cannot access it**.

To access projected content, Angular provides the `@ContentChild()` decorator.

---

## 🆚 Why `@ViewChild()` Doesn't Work with `<ng-content>`

When you try to use `@ViewChild()` to access a template reference inside projected content, it returns `undefined`.

### ❌ Example (Fails):

````html
<!-- Parent Component -->
<course-card>
  <img #courseImage src="..." />
</course-card>

// Inside CourseCardComponent @ViewChild('courseImage') image: ElementRef;
ngAfterViewInit() { console.log(this.image); // ❌ undefined } This fails
because courseImage is not part of the view, it's projected content. ### To
access projected content, use @ContentChild() instead. ```ts // Inside
CourseCardComponent @ContentChild('courseImage') image: ElementRef;
ngAfterContentInit() { console.log(this.image); // ✅ ElementRef of the
projected image }
````

- The scope of @ContentChild() is limited to content projected via <ng-content>.
- It cannot access elements that are outside of the <ng-content> projection area.

## @ContentChildren()

- @ContentChildren works similar to @ContentChild()




---
---
### Angular HTTP Client - Get call with Request parameter
```
export class AppComponent implements OnInit {


  courses = COURSES;

  constructor(private http: HttpClient) {
      console.log("hellol̥");
  }

  ngOnInit() {
    this.http.get('/api/courses')
        .subscribe(
          val=>console.log(val)
        )
  }



}

# The constructor is called first, when Angular creates the component instance.
# Its job is to initialize the component and inject any dependencies you need.
```
##### Why HttpClient is injected:

- Angular uses dependency injection (DI) to provide services like HttpClient.

- You don’t create HttpClient manually; Angular provides a ready-to-use instance.

- Syntax:

```
private http: HttpClient
```
- private automatically creates a class property http you can use in the component.

- Type HttpClient tells Angular what service to inject.

##### Why we don’t make API calls here:

- The constructor only initializes the class, it should not contain logic that depends on Angular bindings or DOM.

- Component properties like @Input() are not yet initialized in the constructor.

- Therefore, API calls are deferred to ngOnInit.

##### ngOnInit Lifecycle Hook
```
ngOnInit() {
    this.http.get('/api/courses')
        .subscribe(val => console.log(val));
}

```
- It’s a lifecycle hook that Angular calls after the component is fully initialized, including input bindings.
- Ideal place to put initialization logic that depends on Angular (e.g., API calls, DOM queries).
- ngOnInit guarantees the component is ready.
  
##### HttpClient and API Calls
```
this.http.get('/api/courses')
```
- HttpClient.get(url) sends an HTTP GET request to the specified URL.
- Returns an Observable, which represents a future value (the response).
- We don’t get the response immediately; we need to subscribe to it.

##### Subscribe to Observable
```
  .subscribe(val => console.log(val));

```
- subscribe() is how you listen to the Observable.
- The callback val => console.log(val) is executed once the HTTP response arrives.
- Without subscribe(), the request will not be made, because Observables are lazy.

##### You can also handle errors and completion:
```
.subscribe({
  next: val => console.log(val),
  error: err => console.error(err),
  complete: () => console.log("Request complete")
});
```
#### Api with parameters

```
  ngOnInit() {
    const params = new HttpParams()
        .set("page","1")
        .set("pageSize","10");
    this.http.get('/api/courses',{params})
        .subscribe(
          courses => this.courses=courses 
        )
  }

```
- Creating HttpParams
```
const params = new HttpParams()
    .set("page","1")
    .set("pageSize","10");


// HTTP GET requests cannot send a request body.
// Data like pagination, filters, sorting is sent via query parameters.
// HttpParams helps build query strings safely.
```

- Making the HTTP GET request
```
this.http.get('/api/courses', { params })

// What this generates internally:
// /api/courses?page=1&pageSize=10


```
### Can We Get Data Without subscribe()?
#### Using async pipe
- async pipe going to allow us to implicitly subscribe to the observable from the template

-- app.componenets.ts
```
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

  courses;

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    const params = new HttpParams()
        .set("page","1")
        .set("pageSize","10");
    this.courses$ = this.http.get<Course[]>('/api/courses',{params});
  }



}
```
--app.components.html
```
  <course-card *ngFor="let course of (courses$ | async)"
                 [course]="course">

      <course-image [src]="course.iconUrl"></course-image>

    </course-card>

//OR

 <div class="courses" *ngIf="courses$ | async as courses">

    <course-card *ngFor="let course of courses"
                 [course]="course">

      <course-image [src]="course.iconUrl"></course-image>

    </course-card>

  </div>
````
### Create Custom angular service

```
ng generate service services/courses
```

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }
}
// here we can see plane ts class where added Injectable decorator means this service is injectable in our componenet just like http client service(which was inbuild)
```


#### @Injectable({ providedIn: 'root' }) Explained
- When a service is provided in root, Angular creates a single instance of that service and shares it across the entire application using the root dependency injector.
```
@Injectable({
  providedIn: 'root'
})
export class CoursesService {}

//providedIn: 'root' → One instance for whole app
```
##### Injecting the Same Service in Multiple Components
```
// app component
constructor(private coursesService: CoursesService) { //injected courses service here
  console.log(this.coursesService);
}

```
```
// course card component
constructor(private coursesService: CoursesService) {
  console.log(this.coursesService);
}

```
- Angular automatically injects CoursesService
- No manual creation using new
- Same service can be injected anywhere

#### This type of service is knows as singleton service, Singleton simply means that there is only one instance.

## Implementation of custom service
### GET API
```
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }
  loadCourses(): Observable<Course[]>{
    const params = new HttpParams()
        .set("page","1")
        .set("pageSize","10");
    return this.http.get<Course[]>('/api/courses',{params});
  }
}

```

```
import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

 

  constructor(private coursesService: CoursesService) {
  
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }



}

```

### PUT API
- course-card.component.html (Child Template)
```



```html
<div class="course-card" *ngIf="course">

  <div class="course-title">
    {{ cardIndex }} {{ course.description }}
  </div>

  <ng-container *ngIf="course.iconUrl">
    <ng-content select="course-image"></ng-content>
  </ng-container>

  <div class="course-description">
    Edit Title:
    <input #courseTitle [value]="course.description">
  </div>

  <div class="course-category" [ngSwitch]="course.category">
    <div *ngSwitchCase="'BEGINNER'">Beginner</div>
    <div *ngSwitchCase="'INTERMEDIATE'">Intermediate</div>
    <div *ngSwitchCase="'ADVANCED'">Advanced</div>
  </div>

  <button (click)="onSaveClicked(courseTitle.value)">
    Save Course
  </button>

</div>
```
- course-card.component.ts (Child Logic)
```
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {

  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  onSaveClicked(description: string) {
    this.courseEmitter.emit({
      ...this.course,
      description
    });
  }
}

```
```
//course.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  saveCourse(course:Course){
    return this.http.put(`/api/courses/${course.id}`,course)
  }
}
```
- app.component.html (Parent Template)
 ```
<div class="courses" *ngIf="courses$ | async as courses">

  <course-card
    *ngFor="let course of courses; index as i"
    [course]="course"
    [cardIndex]="i"
    (courseChanged)="save($event)">

    <course-image [src]="course.iconUrl"></course-image>

  </course-card>

</div>

```
#### The child component can emit an event
#### The parent component can listen to it
```
//app.components.ts (parent)
import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {

  courses$ : Observable<Course[]>;

 

  constructor(private coursesService: CoursesService) {
  
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }
  save(course: Course){
    this.coursesService.saveCourse(course);
  }


}

```
```
import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    standalone: false
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor(private courseService: CoursesService) {

    }

    ngOnInit() {
        console.log("coursesService course card", this.courseService)

    }

    onSaveClicked(description:string) {
        this.courseEmitter.emit({...this.course, description});
    }

```
### Dependency injection
```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {}

  loadCourses() {
    return this.http.get<any[]>('/api/courses');
  }
}
```

-- @Injectable tells Angular that this class can be created and injected by the Dependency Injection (DI) system.
-- Without @Injectable, Angular:
❌ cannot inject dependencies into this class
❌ will throw an error if the constructor has parameters


#### What does providedIn: 'root' mean?
```
@Injectable({
  providedIn: 'root'
})
```
-- Meaning: providedIn: 'root' registers this service in the root injector.
-- this is also called tree-shakable
-- Tree-shakable means unused code is automatically removed from the final build so the application bundle becomes smaller and faster.
### If we not use @Injectable:
```
//angular shows 
NullInjectorError: No provider for HttpClient
```
#### So… what must you create MANUALLY?

1️⃣ Create the instance yourself
```
const coursesService = new CoursesService(httpClient);
```
But Angular doesn’t know what httpClient is yet…
2️⃣ Tell Angular HOW to create it (Factory)
```
export function coursesServiceFactory(
  http: HttpClient
): CoursesService {
  return new CoursesService(http);
}
```
This replaces @Injectable.
3️⃣ Tell Angular WHERE to use it (Provider)
```
providers: [
  {
    provide: CoursesService,
    useFactory: coursesServiceFactory,
    deps: [HttpClient]
  }
]
```
Now Angular:
injects HttpClient
call your factory
uses the returned object'

## Manual Provider Creation with Factory & InjectionToken (Angular)Complete MANUAL version (no @Injectable)
```// 1️⃣ Import required Angular core and HTTP modules
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 2️⃣ Import the service class (no @Injectable used here)
import { CoursesService } from './courses.service';

// 3️⃣ Import InjectionToken to create a unique DI key
import { InjectionToken } from '@angular/core';


// 4️⃣ FACTORY FUNCTION
// This function MANUALLY creates the CoursesService instance
// Angular will call this when the token is requested
export function coursesServiceFactory(
  http: HttpClient
): CoursesService {
  return new CoursesService(http);
}


// 5️⃣ INJECTION TOKEN
// A unique identifier used instead of the service class
export const COURSES_SERVICE =
  new InjectionToken<CoursesService>('COURSES_SERVICE');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  // 6️⃣ PROVIDER CONFIGURATION
  // Tells Angular:
  // - When COURSES_SERVICE is requested
  // - Call coursesServiceFactory()
  // - Inject HttpClient into the factory
  providers: [
    {
      provide: COURSES_SERVICE,
      useFactory: coursesServiceFactory,
      deps: [HttpClient]
    }
  ]
})
export class AppComponent implements OnInit {

  courses$!: Observable<any[]>;

  // 7️⃣ CONSTRUCTOR INJECTION
  // Angular sees @Inject(COURSES_SERVICE)
  // → looks up provider
  // → calls factory
  // → injects the returned CoursesService
  constructor(
    @Inject(COURSES_SERVICE)
    private coursesService: CoursesService
  ) {}

  // 8️⃣ SERVICE USAGE
  // The injected service is used normally
  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }
}
```
🔹 @Optional

If the dependency is not found, Angular will not throw an error.
The injected value will be null.
```
constructor(@Optional()
    private coursesService: CoursesService
  ) {}
```
🔹 @Self

Angular looks for the dependency only in the current injector.
It will not check parent injectors.
Angular checks only this component’s providers
✔ Ignores parent injectors
```
constructor(@Self()
    private coursesService: CoursesService
  ) {}
```
🔹 @SkipSelf

Angular skips the current injector and looks in the parent injector.
Used when you want a parent-level dependency.
Angular skips this component
✔ Gets the service from parent injector
```
constructor(@SkipSelf()
    private coursesService: CoursesService
  ) {}
```
# Angular Dependency Injection — Using Class A inside Class B

## 🧩 DI Scenario Table

| Scenario | AService | BService | Will it Work? | Why |
|---|---|---|---|---|
| ❌ Case 1 | `@Injectable({providedIn:'root'})` | Normal class | ❌ No | Angular cannot create BService instance |
| ✅ Case 2 | `@Injectable({providedIn:'root'})` | `@Injectable({providedIn:'root'})` | ✅ Yes | Both are registered in DI container |
| ✅ Case 3 | `@Injectable({providedIn:'root'})` | `@Injectable()` + provided in component | ✅ Yes | B instance created at component level |
| ❌ Case 4 | Normal class | Normal class | ❌ No | Angular DI not used at all |
| ⚠️ Case 5 | `@Injectable({providedIn:'root'})` | `new AService()` manually | ⚠️ Works but BAD | Breaks DI pattern |

---

## 🏗 Instance Scope Table

| Where Provider is Defined | Instance Count |
|---|---|
| `providedIn: 'root'` | One for whole app (Singleton) |
| Component `providers` | New per component instance |
| Directive `providers` | New per directive instance |

---

## 🧠 Responsibility Table

| Concept | Who Controls It |
|---|---|
| Instance Creation | Angular Injector |
| Instance Scope | `providedIn` / `providers` |
| Using Service | Constructor Injection |

---

## 🔥 Most Important Rules

| Rule | Meaning |
|---|---|
| Class has dependencies → must be `@Injectable()` | So Angular can inject constructor params |
| `@Injectable({providedIn:'root'})` → write once | Not repeated in components |
| Constructor injection ≠ instance creation | Only instance usage |

---

## 📌 Quick Memory Guide

| You Want | Do This |
|---|---|
| Global Singleton Service | `@Injectable({providedIn:'root'})` |
| New Instance Per Component | Add service in `@Component providers` |
| Use Service Anywhere | Inject in constructor |

---

## ✅ Example (Working Code)

```ts
@Injectable({
  providedIn: 'root'
})
export class AService {
  sayHello() {
    return 'Hello from A';
  }
}

@Injectable({
  providedIn: 'root'
})
export class BService {
  constructor(private aService: AService) {}

  callA() {
    return this.aService.sayHello();
  }
}
```

---

## ❌ Wrong Example

```ts
export class BService {
  constructor(private aService: AService) {} // Will fail (Not Injectable)
}
```

---

## 🧠 Golden Rule

> Providers decide **how many instances exist**  
> Constructor injection decides **which instance you get**
>
===
===

# 🧠 What is Change Detection?

Change Detection is the process where Angular: - Detects data changes -
Updates UI (DOM) automatically

Whenever data changes → Angular checks → UI updates.

------------------------------------------------------------------------

# ⚙️ Why Change Detection Exists

Without Change Detection: - UI will not update automatically -
Developers must manually update DOM

Angular gives: ✅ Automatic UI sync\
✅ Performance optimized checking\
✅ Predictable update cycle

------------------------------------------------------------------------

# 🔁 Change Detection Cycle (Simple Flow)

Event Happens ↓ Angular Runs Change Detection ↓ Checks Component Data ↓
Updates DOM If Needed

------------------------------------------------------------------------

# 🚀 What Triggers Change Detection?

✅ User Events (click, keyup, input)\
✅ HTTP Responses\
✅ Timers (setTimeout, setInterval)\
✅ Promises / Async operations\
✅ Input reference change from parent

------------------------------------------------------------------------

# 🧬 Change Detection Strategies

------------------------------------------------------------------------

## 🔵 Default Strategy

✔ Checks component + all children\
✔ Detects object mutation\
✔ Detects reference change

Example: this.course.description = "New Title"; // Works

------------------------------------------------------------------------

## 🔴 OnPush Strategy

✔ Checks only when: - Input reference changes - Event happens inside
component - Observable emits value - Manual trigger used

❌ Does NOT detect object mutation reliably

------------------------------------------------------------------------

# 📊 Default vs OnPush

  Feature                       Default   OnPush
  ----------------------------- --------- --------
  Detect Object Mutation        ✅        ❌
  Detect New Object Reference   ✅        ✅
  Performance                   Medium    High

------------------------------------------------------------------------

# 🧩 Change Detection 

------------------------------------------------------------------------

## 🧩 Part 1 --- Input Property

@Input() course: Course;

### Change Detection Meaning

If parent does: this.course = newCourse;

✅ Change Detection runs\
✅ UI updates

------------------------------------------------------------------------

If parent does: this.course.description = "New Title";

👉 Default → Works\
👉 OnPush → May fail

------------------------------------------------------------------------

## 🧩 Part 2 --- Mutation Change (Typing Case)

onTitleChanged(newTitle: string){ this.course.description = newTitle; }

------------------------------------------------------------------------

### Change Detection Flow

User types ↓ keyup event fires ↓ Function runs ↓ Object property changes
↓ Default Change Detection detects change ↓ UI updates

------------------------------------------------------------------------

### Problem In OnPush

Because: Object reference same

Angular may skip checking.

------------------------------------------------------------------------

## 🧩 Part 3 --- Template Event Trigger

(keyup)="onTitleChanged(courseTitle.value)"

------------------------------------------------------------------------

### Why Change Detection Runs

Angular triggers Change Detection on: - Click - Keyup - Input - Events

------------------------------------------------------------------------

## 🧩 Part 4 --- Output Event

@Output() courseEmitter = new EventEmitter`<Course>`{=html}();

Purpose: Send updated data to parent.

------------------------------------------------------------------------

## 🧩 Part 5 --- Immutable Update (Most Important)

onSaveClicked(description: string) {
this.courseEmitter.emit({...this.course, description}); }

------------------------------------------------------------------------

### Why Spread Operator Is Important

{...this.course, description}

Creates: ✅ New object\
✅ New reference

------------------------------------------------------------------------

### Change Detection Flow

Click Save ↓ New Object Created ↓ Event Sent To Parent ↓ Parent Updates
Data ↓ Child Gets New Input Reference ↓ Change Detection Runs

------------------------------------------------------------------------

## 🧩 Part 6 --- Template Binding

{{ course.description }}

Updates when: - Property changes (Default) - Object reference changes
(Default + OnPush)

------------------------------------------------------------------------

# 🧪 Mutation vs Immutable (From My Code)

------------------------------------------------------------------------

## ❌ Mutation (Typing Case)

this.course.description = newTitle;

Same reference → Risky for OnPush.

------------------------------------------------------------------------

## ✅ Immutable (Save Case)

{...this.course}

New reference → Best practice → Works in OnPush.

------------------------------------------------------------------------

# ⭐ Golden Rules

------------------------------------------------------------------------

✅ Prefer Immutable Updates\
✅ Use OnPush in large apps\
✅ Avoid direct object mutation in production\
✅ Use Output events to sync with parent

------------------------------------------------------------------------

# 🛠 Manual Change Detection (Advanced)

------------------------------------------------------------------------

## detectChanges()

Manually trigger CD.

------------------------------------------------------------------------

## markForCheck()

Tell Angular to check component next cycle.

------------------------------------------------------------------------

## detach()

Stop automatic CD.

------------------------------------------------------------------------

## reattach()

Resume automatic CD.

------------------------------------------------------------------------

# 🧠 Interview One-Liner (From My Code)

"My keyup event triggers change detection via Angular event system, and
Save button uses immutable object creation which ensures change
detection works even with OnPush strategy."

------------------------------------------------------------------------

# 🧾 Real Life Analogy

------------------------------------------------------------------------

### Default Strategy

Teacher checks every notebook daily.

------------------------------------------------------------------------

### OnPush Strategy

Teacher checks notebook only if: - New notebook submitted - Student
calls teacher

--------
--------
# Angular Lifecycle Hooks (Simple Notes)

Angular components go through different **lifecycle stages** from creation to destruction.
Angular provides **Lifecycle Hooks** that allow us to run code at specific stages.

---

# 1. Constructor()

## Purpose

The constructor is a **TypeScript class method**, not an Angular lifecycle hook.
It is used for **dependency injection and basic initialization**.

## When it runs

* Runs **when the component class is instantiated**
* Executes **before Angular initializes the component**

## What to use it for

* Inject services
* Basic variable initialization

## Example

```typescript
constructor(private userService: UserService) {
  console.log("Constructor called");
}
```

⚠️ Avoid:

* API calls
* Complex logic

---

# 2. ngOnChanges()

## Purpose

Runs when **input properties change**.

## When it runs

* Runs **before ngOnInit**
* Executes **every time an @Input value changes**

## What to use it for

* Detect input updates from parent components
* Perform logic when input data changes

## Example

```typescript
ngOnChanges(changes: SimpleChanges) {
  console.log("Input value changed", changes);
}
```

Example Input:

```typescript
@Input() userName!: string;
```

---

# 3. ngOnInit()

## Purpose

Most commonly used lifecycle hook.

## When it runs

* Runs **once after the first ngOnChanges**
* Called **after Angular initializes component inputs**

## What to use it for

* API calls
* Component initialization
* Load data

## Example

```typescript
ngOnInit() {
  console.log("Component initialized");
  this.loadUsers();
}
```

---

# 4. ngAfterContentChecked()

## Purpose

Runs after Angular **checks projected content** inside `<ng-content>`.

## When it runs

* Called **after every change detection cycle**
* Runs **multiple times**

## What to use it for

* Respond to content projection updates
* Validate projected content

## Example

```typescript
ngAfterContentChecked() {
  console.log("Content checked");
}
```

⚠️ Avoid heavy logic because it runs frequently.

---

# 5. ngAfterViewChecked()

## Purpose

Runs after Angular **checks the component's view and child views**.

## When it runs

* Runs **after view updates**
* Called **after every change detection cycle**

## What to use it for

* Perform logic after DOM updates
* Work with child components

## Example

```typescript
ngAfterViewChecked() {
  console.log("View checked");
}
```

⚠️ Avoid expensive operations here.

---

# Execution Order (Important)

Lifecycle hooks run in this order:

```
Constructor
↓
ngOnChanges
↓
ngOnInit
↓
ngAfterContentChecked
↓
ngAfterViewChecked
```

---

# Simple Flow Diagram

```
Component Created
      │
      ▼
Constructor()
      │
      ▼
ngOnChanges()
      │
      ▼
ngOnInit()
      │
      ▼
ngAfterContentChecked()
      │
      ▼
ngAfterViewChecked()
```

---

# Quick Interview Summary

| Hook                  | Runs When                  | Runs How Many Times |
| --------------------- | -------------------------- | ------------------- |
| Constructor           | Component instance created | Once                |
| ngOnChanges           | Input value changes        | Multiple            |
| ngOnInit              | Component initialized      | Once                |
| ngAfterContentChecked | Content checked            | Multiple            |
| ngAfterViewChecked    | View checked               | Multiple            |

---

# Pro Tip

Most commonly used hooks in real projects:

* **Constructor** → dependency injection
* **ngOnInit** → API calls
* **ngOnChanges** → input change handling

Other hooks are used **rarely for advanced cases**.
### 6. ngAfterViewInit()

#### Purpose

`ngAfterViewInit` is called **after Angular fully initializes the component's view and its child views**.

It is commonly used when we want to **access DOM elements or child components** using `@ViewChild` or `@ViewChildren`.

---

### When it runs

* Runs **once after Angular initializes the component view**
* Executes **after the first `ngAfterContentChecked`**
* Runs **only one time**

---

### What to use it for

* Access DOM elements
* Work with `@ViewChild`
* Initialize third-party libraries (charts, sliders, etc.)
* Perform DOM related logic

---

#### Example

#### HTML

```html
<h2 #title>Hello Angular</h2>
```

#### Component

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements AfterViewInit {

  @ViewChild('title') title!: ElementRef;

  ngAfterViewInit() {
    console.log("View initialized");
    console.log(this.title.nativeElement.innerText);
  }
}
```

---

#### Why we don't access DOM in `ngOnInit`

At the time of `ngOnInit`:

* Angular **has not finished rendering the view**

But in `ngAfterViewInit`:

* **View and child components are fully loaded**

---

#### Lifecycle Order Including ngAfterViewInit

```
Constructor
↓
ngOnChanges
↓
ngOnInit
↓
ngAfterContentChecked
↓
ngAfterViewInit
↓
ngAfterViewChecked
```

---

#### Quick Summary

| Hook            | Purpose                       | Runs |
| --------------- | ----------------------------- | ---- |
| ngAfterViewInit | View & child view initialized | Once |

---

#### Important Note

Avoid heavy operations inside this hook because it may affect UI rendering performance.


## Angular Modules

Angular applications are organized using **Modules**.
A module helps group related **components, directives, pipes, and services** together.

The root module of every Angular application is **AppModule**.

---

## Create a Module

To generate a module using Angular CLI:

```
ng generate module Courses
```

or shorter command:

```
ng g m Courses
```

This command creates a new folder and module file.

Example structure:

```
courses/
 ├── courses.module.ts
```

---

### Example Module

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
```

---

### Important Properties of NgModule

#### declarations

Contains **components, directives, and pipes** that belong to this module.

```
declarations: [
  CourseListComponent
]
```

---

#### imports

Used to import **other modules** so their features can be used.

```
imports: [
  CommonModule
]
```

---

#### exports

Used to make components available to **other modules**.

```
exports: [
  CourseListComponent
]
```

---

#### providers

Used to register **services**.

```
providers: [
  CourseService
]
```

---

#### bootstrap

Used only in **root module** to specify the starting component.

```
bootstrap: [AppComponent]
```

---

#### Root Module Example

```
app.module.ts
```

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoursesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

#### Benefits of Modules

* Organizes large applications
* Improves maintainability
* Enables lazy loading
* Reusable feature grouping
* Better code structure

---

#### Quick Summary

| Concept        | Purpose                       |
| -------------- | ----------------------------- |
| Module         | Organizes related features    |
| Root Module    | Starting point of Angular app |
| Feature Module | Groups related functionality  |
| Lazy Module    | Loads only when needed        |

---


## Angular Pipes


# Angular `@defer`

`@defer` allows us to **separate parts of a template into a separate JavaScript bundle** that loads **only when needed**.

### How it works

**Build Time**
- Angular analyzes templates.
- Code inside `@defer` is split into a **separate chunk (lazy-loaded JS file).**

**Runtime**
- The chunk is downloaded **only when the trigger fires**, such as:
  - viewport
  - interaction
  - idle

---

### Example

```html
@defer (on viewport) {
  <app-heavy-component />
}
```
### @placeholder
- If the deferred content is not loaded yet, Angular shows the @placeholder.
```
@placeholder {
  <p>Loading component...</p>
}
```
### @loading
- @loading appears if the deferred chunk takes time to download.

Behavior

@placeholder appears first.

When the defer trigger fires, Angular starts downloading the chunk.

If the download takes longer than the specified time:

@loading(after X ms)

Angular replaces the placeholder with the loading block.

@loading stays visible for at least the minimum duration.

When the chunk finishes loading:

The actual content appears.

If loading fails, @error is shown.

```
@defer (on viewport) {
  <app-chart />
}

@placeholder {
  <p>Chart will load soon...</p>
}

@loading (after 200ms; minimum 1s) {
  <p>Loading chart...</p>
}

@error {
  <p>Failed to load chart</p>
}
```

### prefetch Trigger

- The prefetch trigger tells Angular to download the deferred chunk in the background before it is actually needed.

- Benefits

Improves performance.

When the real trigger happens (viewport, interaction), the code is already downloaded.

The component renders instantly.

Important Points

Prefetch does not render the component immediately.

It only downloads the code in advance.

It does not block the main thread.

The browser schedules the download efficiently.

```
@defer (on interaction; prefetch on hover) {
  <app-user-profile />
}
```

| Trigger          | Description                       |
| ---------------- | --------------------------------- |
| `on viewport`    | Loads when element enters screen  |
| `on interaction` | Loads after user interaction      |
| `on hover`       | Loads when user hovers            |
| `on idle`        | Loads when browser is idle        |
| `when condition` | Loads when condition becomes true |

## Signals()
### 1. Default Change Detection

**Advantages**
1. Very easy to use – Angular handles everything automatically.
2. Works even with mutable data and simple code.

**Disadvantages**
1. Checks the entire component tree even if only a small value changed.
2. Can become slow in large applications with many bindings.

---

### 2. OnPush Change Detection

**Advantages**
1. Much faster because Angular checks only when:
   - Input references change
   - Events occur
   - Observable emits values
2. Reduces unnecessary checks in the component tree.

**Disadvantages**
1. Requires immutable data patterns.
2. Needs stricter coding practices which can make code slightly harder to maintain.

---

### 3. Signals (Modern Angular)

Signals allow state to tell Angular **exactly what changed**.

**Advantages**
1. Angular updates **only the affected UI parts**.
2. Improves performance without complex change detection rules.
3. Cleaner reactive state management.

---

## Examples

This example shows how Angular UI updates when we change a counter.

We will move step by step from:

1. Default Change Detection
2. OnPush Change Detection
3. Signals (Modern Angular)

---

# 1️⃣ Default Change Detection

Angular checks the **entire component tree** whenever any event occurs.

### Component

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  count = 0;

  increaseCount() {
    this.count++;
  }

}
```

```
//template
<h2>Counter: {{ count }}</h2>

<button (click)="increaseCount()">
Increase
</button>

//How it works

//1. User clicks button

//2. increaseCount() runs

//3. count value changes

//4. Angular runs change detection on the entire component tree

//5. UI updates

```
### problem

- Even if only count changed, Angular still checks all components.

This can become slow in large applications.

# 2️⃣ OnPush Change Detection
```
//With OnPush, Angular checks the component only when inputs or references change.

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {

  count = 0;

  increaseCount() {
    this.count++;
  }

}

```
```
//template
<h2>Counter: {{ count }}</h2>

<button (click)="increaseCount()">
Increase
</button>

- Improvement

// Angular does fewer checks compared to default strategy.


```
### problem

- We must follow:

- Immutable data patterns

- Strict state updates

- Sometimes debugging becomes harder.

# 3️⃣ Signals
- Signals allow Angular to know exactly which state changed.

- Instead of checking the whole component, Angular updates only the affected UI.

```
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent {

  count = signal(0);

  increaseCount() {
    this.count.update(value => value + 1);
  }

}
```
```
//template
<h2>Counter: {{ count() }}</h2>

<button (click)="increaseCount()">
Increase
</button>
```
