import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course.service';

@Component({

  selector:'app-course-summary-widget',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./course-summary-widget.html',

  styleUrl:'./course-summary-widget.css'

})

export class CourseSummaryWidget{

  constructor(public courseService:CourseService){}

  get count(){

      return this.courseService.getCourses().length;

  }

  addSampleCourse(){

      this.courseService.addCourse({

          id:6,

          name:'Cloud Computing',

          code:'CC601',

          credits:4,

          gradeStatus:'passed'

      });

  }

}