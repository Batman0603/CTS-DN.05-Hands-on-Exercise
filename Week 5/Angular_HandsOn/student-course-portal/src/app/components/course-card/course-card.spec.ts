import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  SimpleChange
} from '@angular/core';
import { provideStore } from '@ngrx/store';

import { CourseCard } from './course-card';

import { EnrollmentService } from '../../services/enrollment';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let enrollmentServiceSpy: jasmine.SpyObj<EnrollmentService>;

  beforeEach(async () => {

    enrollmentServiceSpy = jasmine.createSpyObj(
      'EnrollmentService',
      [
        'isEnrolled',
        'enroll',
        'unenroll'
      ]
    );

    enrollmentServiceSpy.isEnrolled.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [
        CourseCard
      ],
      providers: [
        {
          provide: EnrollmentService,
          useValue: enrollmentServiceSpy
        },
        provideStore({})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name', () => {
    component.course = {
      id:1,
      name:'Data Structures',
      code:'CS101',
      credits:4,
      gradeStatus:'passed'
    };

    fixture.detectChanges();

    const heading =
      fixture.debugElement
      .query(By.css('h2'))
      .nativeElement;

    expect(
      heading.textContent
    ).toContain(
      'Data Structures'
    );
  });

  it('should emit View Students event', () => {
    component.course = {
      id:1,
      name:'Data Structures',
      code:'CS101',
      credits:4,
      gradeStatus:'passed'
    };

    fixture.detectChanges();

    spyOn(
      component.viewStudents,
      'emit'
    );

    const button =
      fixture.debugElement
      .queryAll(By.css('button'))[2]
      .nativeElement;

    button.click();

    expect(
      component.viewStudents.emit
    ).toHaveBeenCalledWith(
      1
    );
  });

  it('should toggle details', () => {
    component.course = {
      id:1,
      name:'Data Structures',
      code:'CS101',
      credits:4,
      gradeStatus:'passed'
    };

    fixture.detectChanges();

    expect(
      component.isExpanded
    ).toBeFalse();

    component.toggleDetails();

    expect(
      component.isExpanded
    ).toBeTrue();
  });

  it('should call ngOnChanges', () => {
    spyOn(
      console,
      'log'
    );

    component.course = {
      id:1,
      name:'Angular',
      code:'ANG101',
      credits:4,
      gradeStatus:'passed'
    };

    component.ngOnChanges?.({
      course:new SimpleChange(
        null,
        component.course,
        true
      )
    });

    expect(
      console.log
    ).toHaveBeenCalled();
  });

});
