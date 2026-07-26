import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';
import { loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile implements OnInit {
  enrolledCourses$!: Observable<Course[]>;

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.enrolledCourses$ = this.store.select(selectEnrolledCourses);
    this.store.dispatch(loadCourses());
  }
}