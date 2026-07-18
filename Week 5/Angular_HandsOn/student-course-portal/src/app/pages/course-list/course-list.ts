import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  // Show loading message initially
  isLoading = true;

  courses = [

    {
      id:1,
      name:'Angular',
      code:'ANG101',
      credits:4,
      gradeStatus:'passed'
    },

    {
      id:2,
      name:'React',
      code:'REA201',
      credits:3,
      gradeStatus:'failed'
    },

    {
      id:3,
      name:'Java',
      code:'JAVA301',
      credits:4,
      gradeStatus:'pending'
    },

    {
      id:4,
      name:'Python',
      code:'PY401',
      credits:2,
      gradeStatus:'passed'
    },

    {
      id:5,
      name:'Machine Learning',
      code:'ML501',
      credits:5,
      gradeStatus:'pending'
    }

  ];

  ngOnInit(): void {

    setTimeout(() => {

      this.isLoading = false;

    },1500);

  }

  /*
   trackBy improves performance.
   Angular reuses DOM elements instead of recreating
   every item whenever the array changes.
  */

  trackByCourseId(index:number,course:any){

      return course.id;

  }

}