import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseImage } from './course-image';

describe('CourseImage', () => {
  let component: CourseImage;
  let fixture: ComponentFixture<CourseImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
