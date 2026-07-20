import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',

  standalone: true,

  imports: [
    CommonModule,
    CourseCard
  ],

  templateUrl: './course-list.html',

  styleUrl: './course-list.css'
})

export class CourseList implements OnInit {

  courses: Course[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.loadCourses();

  }

  loadCourses(): void {

    this.isLoading = true;

    this.courseService.getCourses().subscribe({

      next: (courses: Course[]) => {

        this.courses = courses;

      },

      error: (err) => {

        this.errorMessage = err.message;

      },

      complete: () => {

        this.isLoading = false;

      }

    });

  }

  trackByCourseId(index: number, course: Course): number {

    return course.id;

  }

}