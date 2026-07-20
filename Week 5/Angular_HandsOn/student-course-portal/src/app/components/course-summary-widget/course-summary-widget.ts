import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  count = 0;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.courseService.getCourses().subscribe({

      next: (courses: Course[]) => {

        this.count = courses.length;

      }

    });

  }

}