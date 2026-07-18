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

    credits:1,

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

    credits:null,

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